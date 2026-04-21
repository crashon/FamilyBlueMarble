import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { asset_1, asset_2, asset_3, asset_4 } from '@/assets';
import { BOARD_DATA } from '@/config/board-data';
import { ChanceCard, getRandomChanceCard } from '@/config/chance-cards';
import { useAudioStore } from './useAudioStore';

interface Player {
  id: number;
  name: string;
  position: number;
  balance: number;
  avatar: any;
  color: string;
  isBankrupt: boolean;
  level: number;
  isSkillUsed: boolean;
  trappedTurns: number;
}

interface ActiveModal {
  type: 'purchase' | 'upgrade' | 'rent' | 'event' | 'gameover' | 'chance' | 'desert';
  tileId?: number;
  payload?: any;
}

interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  diceResult: [number, number];
  isRolling: boolean;
  isMoving: boolean;
  canRollAgain: boolean;
  propertyOwners: Record<number, number>;
  propertyLevels: Record<number, number>;
  activeModal: ActiveModal | null;
  isGameOver: boolean;
  winner: Player | null;
  gameLogs: string[];
  isSpaceTourActive: boolean;

  // Actions
  rollDice: () => void;
  setDiceResult: (r1: number, r2: number) => void;
  setIsMoving: (moving: boolean) => void;
  updatePlayerPosition: (id: number, newPos: number) => void;
  nextTurn: () => void;
  addLog: (message: string) => void;

  // Economy & Special Actions
  purchaseProperty: (playerId: number, tileId: number) => void;
  buildBuilding: (playerId: number, tileId: number) => void;
  payRent: (fromId: number, toId: number, amount: number) => void;
  handleTileAction: (playerId: number, tileId: number) => void;
  applyChanceCard: (card: ChanceCard, playerId: number) => void;
  triggerActiveSkill: (playerId: number) => void;
  handleDesertEscape: (playerId: number, method: 'pay' | 'roll') => void;
  performSpaceTourWarp: (tileId: number) => void;
  closeModal: () => void;
  checkGameOver: () => void;
  resetGame: () => void;
}

const INITIAL_PLAYERS: Player[] = [
  { id: 0, name: 'Jungki', position: 0, balance: 2500000, avatar: asset_1, color: '#005bc1', isBankrupt: false, level: 1, isSkillUsed: false, trappedTurns: 0 },
  { id: 1, name: 'Jang', position: 0, balance: 1840000, avatar: asset_2, color: '#705d00', isBankrupt: false, level: 1, isSkillUsed: false, trappedTurns: 0 },
  { id: 2, name: 'Pream', position: 0, balance: 3120000, avatar: asset_3, color: '#006e1c', isBankrupt: false, level: 1, isSkillUsed: false, trappedTurns: 0 },
  { id: 3, name: 'Tee', position: 0, balance: 950000, avatar: asset_4, color: '#ba1a1a', isBankrupt: false, level: 1, isSkillUsed: false, trappedTurns: 0 },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      players: INITIAL_PLAYERS,
      currentPlayerIndex: 0,
      diceResult: [1, 1],
      isRolling: false,
      isMoving: false,
      canRollAgain: false,
      propertyOwners: {},
      propertyLevels: {},
      activeModal: null,
      isGameOver: false,
      winner: null,
      gameLogs: ["Game Started. Welcome to Cosmic Carnival!"],
      isSpaceTourActive: false,

      resetGame: () => set({
        players: INITIAL_PLAYERS,
        currentPlayerIndex: 0,
        diceResult: [1, 1],
        isRolling: false,
        isMoving: false,
        canRollAgain: false,
        propertyOwners: {},
        propertyLevels: {},
        activeModal: null,
        isGameOver: false,
        winner: null,
        gameLogs: ["Game Reset. Good luck!"],
        isSpaceTourActive: false,
      }),

      addLog: (message) => set((state) => ({ gameLogs: [message, ...state.gameLogs].slice(0, 50) })),

      rollDice: () => {
        const { isRolling, isMoving, isGameOver, players, currentPlayerIndex } = get();
        if (isRolling || isMoving || isGameOver) return;
        const player = players[currentPlayerIndex];
        if (player.trappedTurns > 0) {
          set({ activeModal: { type: 'desert' } });
          return;
        }
        set({ isRolling: true, activeModal: null });
      },

      setDiceResult: (r1, r2) => {
        const isDouble = r1 === r2;
        set({ diceResult: [r1, r2], isRolling: false, canRollAgain: isDouble });
        const player = get().players[get().currentPlayerIndex];
        if (isDouble) get().addLog(`${player.name} rolled doubles! [${r1}, ${r2}]`);
      },

      setIsMoving: (moving) => set({ isMoving: moving }),

      updatePlayerPosition: (id, newPos) => {
        const players = get().players;
        const player = players.find(p => p.id === id);
        if (!player) return;
        const oldPos = player.position;
        const normalizedNewPos = (newPos + 40) % 40;

        if ((oldPos > normalizedNewPos && normalizedNewPos < 15) || (oldPos < 39 && normalizedNewPos === 0)) {
          const bonus = player.id === 2 ? (200000 + (player.level * 100000)) : 200000;
          get().addLog(`${player.name} passed START and collected ₩${bonus.toLocaleString()}.`);
          useAudioStore.getState().playSfx('sfx_level_up');
          set((state) => ({
            players: state.players.map(p => {
              if (p.id === id) {
                const nextLevel = Math.min(3, p.level + 1);
                if (nextLevel > p.level) get().addLog(`${p.name} leveled up to Lv.${nextLevel}!`);
                return { ...p, balance: p.balance + bonus, level: nextLevel, position: normalizedNewPos };
              }
              return p;
            })
          }));
        } else {
          set((state) => ({
            players: state.players.map(p => p.id === id ? { ...p, position: normalizedNewPos } : p),
          }));
        }
      },

      handleTileAction: (playerId, tileId) => {
        const tile = BOARD_DATA[tileId];
        const player = get().players[playerId];
        if (!tile || !player) return;

        if (tileId === 10) {
          get().addLog(`${player.name} is stranded in the Desert! Wait for 3 turns.`);
          set(state => ({ players: state.players.map(p => p.id === playerId ? { ...p, trappedTurns: 3 } : p) }));
          get().nextTurn();
        } else if (tileId === 20) {
          get().addLog(`${player.name} arrived at the Space Tour station. Next destination?`);
          set({ isSpaceTourActive: true });
          get().nextTurn();
        } else if (tileId === 30) {
          get().addLog(`${player.name} was arrested and sent to the Desert!`);
          get().updatePlayerPosition(playerId, 10);
          useAudioStore.getState().playSfx('sfx_warp');
          set(state => ({ players: state.players.map(p => p.id === playerId ? { ...p, trappedTurns: 3 } : p) }));
          get().nextTurn();
        } else if (tile.type === 'property') {
          const ownerId = get().propertyOwners[tileId];
          if (ownerId === undefined) {
            set({ activeModal: { type: 'purchase', tileId } });
          } else if (ownerId === playerId) {
            const level = get().propertyLevels[tileId] || 0;
            if (level < 3) set({ activeModal: { type: 'upgrade', tileId } });
            else get().nextTurn();
          } else {
            const level = get().propertyLevels[tileId] || 0;
            const multiplier = tile.rentMultipliers?.[level] || 1;
            const amount = (tile.baseRent || 0) * multiplier;
            get().payRent(playerId, ownerId, amount);
          }
        } else if (tile.type === 'event') {
          if (tile.name === 'Chance') {
            const luckBonus = player.id === 1 ? (0.2 * player.level) : 0;
            const card = getRandomChanceCard(luckBonus);
            useAudioStore.getState().playSfx('sfx_chance_flip');
            set({ activeModal: { type: 'chance', payload: { card } } });
          } else {
            get().payRent(playerId, -1, tileId === 9 ? 100000 : 200000);
          }
        } else {
          get().nextTurn();
        }
      },

      handleDesertEscape: (playerId, method) => {
        const player = get().players.find(p => p.id === playerId);
        if (!player) return;
        if (method === 'pay') {
          if (player.balance < 200000) return;
          set(state => ({
            players: state.players.map(p => p.id === playerId ? { ...p, balance: p.balance - 200000, trappedTurns: 0 } : p),
            activeModal: null
          }));
          get().addLog(`${player.name} paid ₩200,000 to escape the Desert.`);
        } else {
          const r1 = Math.floor(Math.random() * 6) + 1;
          const r2 = Math.floor(Math.random() * 6) + 1;
          set({ diceResult: [r1, r2], isRolling: false });
          if (r1 === r2) {
            set(state => ({
              players: state.players.map(p => p.id === playerId ? { ...p, trappedTurns: 0 } : p),
              activeModal: null
            }));
            get().addLog(`${player.name} rolled doubles [${r1}, ${r2}] and escaped!`);
          } else {
            set(state => ({
              players: state.players.map(p => p.id === playerId ? { ...p, trappedTurns: Math.max(0, p.trappedTurns - 1) } : p),
              activeModal: null
            }));
            get().addLog(`${player.name} failed to roll doubles and remains stranded.`);
            get().nextTurn();
          }
        }
      },

      performSpaceTourWarp: async (tileId) => {
        const playerId = get().currentPlayerIndex;
        const player = get().players[playerId];
        if (!player || !get().isSpaceTourActive) return;
        set({ isSpaceTourActive: false });
        get().addLog(`${player.name} warped through hyperspace to ${BOARD_DATA[tileId].name}.`);
        useAudioStore.getState().playSfx('sfx_warp');
        const isPassingStart = tileId < player.position;
        if (isPassingStart) {
          const bonus = player.id === 2 ? (200000 + (player.level * 100000)) : 200000;
          get().addLog(`${player.name} passed START during warp and collected ₩${bonus.toLocaleString()}.`);
          set(state => ({
            players: state.players.map(p => p.id === playerId ? { ...p, balance: p.balance + bonus, level: Math.min(3, p.level + 1) } : p)
          }));
        }
        get().updatePlayerPosition(playerId, tileId);
        setTimeout(() => { get().handleTileAction(playerId, tileId); }, 800);
      },

      purchaseProperty: (playerId, tileId) => {
        const tile = BOARD_DATA[tileId];
        const player = get().players.find(p => p.id === playerId);
        if (!tile || !player) return;
        let cost = tile.price || 0;
        if (player.id === 3) cost = Math.floor(cost * (1 - (0.05 + (player.level * 0.05))));
        if (player.balance < cost) return;
        set((state) => ({
          players: state.players.map(p => p.id === playerId ? { ...p, balance: p.balance - cost } : p),
          propertyOwners: { ...state.propertyOwners, [tileId]: playerId },
          propertyLevels: { ...state.propertyLevels, [tileId]: 0 },
          activeModal: null
        }));
        useAudioStore.getState().playSfx('sfx_purchase');
        get().nextTurn();
      },

      buildBuilding: (playerId, tileId) => {
        const tile = BOARD_DATA[tileId];
        const player = get().players.find(p => p.id === playerId);
        const currentLevel = get().propertyLevels[tileId] || 0;
        if (!tile || !player || currentLevel === 3) return;
        let cost = tile.buildingCost || 0;
        if (player.id === 0) cost = Math.floor(cost * (1 - (0.1 + (player.level * 0.05))));
        if (player.balance < cost) return;
        set((state) => ({
          players: state.players.map(p => p.id === playerId ? { ...p, balance: p.balance - cost } : p),
          propertyLevels: { ...state.propertyLevels, [tileId]: currentLevel + 1 },
          activeModal: null
        }));
        useAudioStore.getState().playSfx('sfx_purchase');
        get().nextTurn();
      },

      payRent: (fromId, toId, amount) => {
        const fromPlayer = get().players.find(p => p.id === fromId);
        if (!fromPlayer) return;
        set((state) => {
          const newBalance = fromPlayer.balance - amount;
          const updatedPlayers = state.players.map(p => {
            if (p.id === fromId) return { ...p, balance: Math.max(0, newBalance) };
            if (p.id === toId && toId !== -1) return { ...p, balance: p.balance + amount };
            return p;
          });
          return {
            players: updatedPlayers,
            activeModal: newBalance < 0 ? { type: 'rent', tileId: -1, payload: { fromId, toId, amount } } : state.activeModal
          };
        });
        if (get().activeModal?.type !== 'rent') {
          useAudioStore.getState().playSfx('sfx_rent_pay');
          get().nextTurn();
        }
      },

      applyChanceCard: async (card, playerId) => {
        const player = get().players[playerId];
        if (!player) return;
        get().addLog(`${player.name} drew: ${card.title}.`);
        set({ activeModal: null });
        if (card.type === 'money') {
          set(state => ({ players: state.players.map(p => p.id === playerId ? { ...p, balance: Math.max(0, p.balance + card.value) } : p) }));
          get().nextTurn();
        } else if (card.type === 'move') {
          get().setIsMoving(true);
          const steps = Math.abs(card.value);
          const direction = card.value > 0 ? 1 : -1;
          let currentPos = player.position;
          for (let i = 0; i < steps; i++) {
            await new Promise(r => setTimeout(r, 200));
            currentPos = (currentPos + direction + 40) % 40;
            get().updatePlayerPosition(playerId, currentPos);
          }
          get().setIsMoving(false);
          get().handleTileAction(playerId, currentPos);
        } else if (card.type === 'warp') {
          const bonus = (card.value < player.position) ? 200000 : 0;
          if (bonus) set(state => ({ players: state.players.map(p => p.id === playerId ? { ...p, balance: p.balance + bonus } : p) }));
          get().updatePlayerPosition(playerId, card.value);
          get().handleTileAction(playerId, card.value);
        } else if (card.type === 'special') {
          if (card.id === 'c6') {
            const buildings = Object.entries(get().propertyOwners)
              .filter(([tid, oid]) => oid === playerId)
              .reduce((sum, [tid]) => sum + (get().propertyLevels[parseInt(tid)] || 0), 0);
            get().payRent(playerId, -1, buildings * card.value);
          } else if (card.id === 'c9') {
            const others = get().players.filter(p => !p.isBankrupt && p.id !== playerId);
            set(state => ({
              players: state.players.map(p => {
                if (p.id === playerId) return { ...p, balance: Math.max(0, p.balance - (others.length * card.value)) };
                if (!p.isBankrupt) return { ...p, balance: p.balance + card.value };
                return p;
              })
            }));
            get().nextTurn();
          }
        }
      },

      nextTurn: () => {
        const { canRollAgain, currentPlayerIndex, players, isGameOver } = get();
        if (isGameOver) return;
        let nextIndex = (currentPlayerIndex + (canRollAgain ? 0 : 1)) % players.length;
        let attempts = 0;
        while (players[nextIndex].isBankrupt && attempts < players.length) {
          nextIndex = (nextIndex + 1) % players.length;
          attempts++;
        }
        set({ currentPlayerIndex: nextIndex, canRollAgain: false, activeModal: null, isSpaceTourActive: false });
        get().checkGameOver();
      },

      checkGameOver: () => {
        const alive = get().players.filter(p => !p.isBankrupt);
        if (alive.length === 1) set({ isGameOver: true, winner: alive[0], activeModal: { type: 'gameover' } });
      },

      triggerActiveSkill: async (playerId) => {
        const player = get().players[playerId];
        if (!player || player.isSkillUsed || get().isMoving || get().isRolling) return;
        set(state => ({ players: state.players.map(p => p.id === playerId ? { ...p, isSkillUsed: true } : p) }));
        switch (playerId) {
          case 0:
            const cur = player.position;
            if (BOARD_DATA[cur].type === 'property' && get().propertyOwners[cur] === playerId) {
              const lv = get().propertyLevels[cur] || 0;
              if (lv < 3) set(state => ({ propertyLevels: { ...state.propertyLevels, [cur]: lv + 1 } }));
            }
            break;
          case 1: get().rollDice(); return;
          case 2:
            let total = 0;
            set(state => ({
              players: state.players.map(p => {
                if (p.id === playerId || p.isBankrupt) return p;
                const tax = Math.floor(p.balance * 0.1);
                total += tax;
                return { ...p, balance: p.balance - tax };
              })
            }));
            set(state => ({ players: state.players.map(p => p.id === playerId ? { ...p, balance: p.balance + total } : p) }));
            break;
          case 3:
            for (let i = 1; i < 40; i++) {
              const idx = (player.position + i) % 40;
              if (BOARD_DATA[idx].type === 'property' && get().propertyOwners[idx] === undefined) {
                get().updatePlayerPosition(playerId, idx);
                get().handleTileAction(playerId, idx);
                return;
              }
            }
            break;
        }
      },

      closeModal: () => set({ activeModal: null }),
    }),
    {
      name: 'family-blue-marble-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
