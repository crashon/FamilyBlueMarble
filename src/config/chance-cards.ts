export type ChanceEffectType = 'money' | 'move' | 'warp' | 'special';

export interface ChanceCard {
  id: string;
  title: string;
  description: string;
  type: ChanceEffectType;
  value: number; // For money or steps
  weight: number; // Higher is more common (e.g., 10 common, 1 rare)
  variant: 'good' | 'bad';
}

export const CHANCE_CARDS: ChanceCard[] = [
  { id: 'c1', title: 'Galactic Dividend', description: 'Your investments in planet X-9 have paid off! Receive ₩200,000.', type: 'money', value: 200000, weight: 10, variant: 'good' },
  { id: 'c2', title: 'Stellar Tax', description: 'The Interstellar Council demands maintenance fees. Pay ₩100,000.', type: 'money', value: -100000, weight: 8, variant: 'bad' },
  { id: 'c3', title: 'Hyperdrive Leap', description: 'Activate hyperdrive! Move forward 5 spaces.', type: 'move', value: 5, weight: 5, variant: 'good' },
  { id: 'c4', title: 'Back-hole Pull', description: 'You were pulled by a gravity well. Move back 3 spaces.', type: 'move', value: -3, weight: 5, variant: 'bad' },
  { id: 'c5', title: 'Warp to Seoul', description: 'Instant warp to the capital of the East: Seoul!', type: 'warp', value: 39, weight: 2, variant: 'good' },
  { id: 'c6', title: 'Meteor Shower', description: 'Repairs needed for your hull. Pay ₩50,000 per building you own.', type: 'special', value: 50000, weight: 4, variant: 'bad' },
  { id: 'c7', title: 'Winning the Lottery', description: 'You won the first prize in the Galaxy Lotto! Gain ₩1,000,000.', type: 'money', value: 1000000, weight: 1, variant: 'good' },
  { id: 'c8', title: 'Emergency Landing', description: 'Malfunction detected. Return to START immediately.', type: 'warp', value: 0, weight: 3, variant: 'bad' },
  { id: 'c9', title: 'Charity Donation', description: 'Be a hero for the outer rim. Donate ₩50,000 to each other player.', type: 'special', value: 50000, weight: 3, variant: 'bad' },
  { id: 'c10', title: 'Space Tour', description: 'Free travel pass! Warp to the Space Tour (Tile 20).', type: 'warp', value: 20, weight: 4, variant: 'good' },
];

export function getRandomChanceCard(luckBonus: number = 0): ChanceCard {
  const adjustedCards = CHANCE_CARDS.map(card => ({
    ...card,
    weight: card.variant === 'good' ? card.weight * (1 + luckBonus) : card.weight
  }));

  const totalWeight = adjustedCards.reduce((sum, card) => sum + card.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const card of adjustedCards) {
    if (random < card.weight) return card;
    random -= card.weight;
  }
  return adjustedCards[0];
}
