export type TileType = 'property' | 'event' | 'corner';

export interface TileData {
  id: number;
  name: string;
  type: TileType;
  group?: string;
  price?: number;
  buildingCost?: number;
  baseRent?: number;
  rentMultipliers?: [number, number, number, number]; // [Base, 1House, 2House, Hotel]
  color?: string;
  icon?: string;
}

export const BOARD_DATA: TileData[] = [
  { id: 0, name: 'START', type: 'corner', icon: 'rocket_launch' },
  { id: 1, name: 'Taipei', type: 'property', group: 'pink', price: 50000, buildingCost: 30000, baseRent: 5000, rentMultipliers: [1, 3, 8, 20], color: '#ff69b4' },
  { id: 2, name: 'Chance', type: 'event', icon: 'question_mark' },
  { id: 3, name: 'Beijing', type: 'property', group: 'pink', price: 80000, buildingCost: 50000, baseRent: 8000, rentMultipliers: [1, 3, 8, 20], color: '#ff69b4' },
  { id: 4, name: 'Manila', type: 'property', group: 'pink', price: 100000, buildingCost: 50000, baseRent: 10000, rentMultipliers: [1, 3, 8, 20], color: '#ff69b4' },
  { id: 5, name: 'Singapore', type: 'property', group: 'cyan', price: 120000, buildingCost: 100000, baseRent: 12000, rentMultipliers: [1, 3, 8, 20], color: '#00ced1' },
  { id: 6, name: 'Chance', type: 'event', icon: 'question_mark' },
  { id: 7, name: 'Jakarta', type: 'property', group: 'cyan', price: 140000, buildingCost: 100000, baseRent: 14000, rentMultipliers: [1, 3, 8, 20], color: '#00ced1' },
  { id: 8, name: 'Ho Chi Minh', type: 'property', group: 'cyan', price: 160000, buildingCost: 100000, baseRent: 16000, rentMultipliers: [1, 3, 8, 20], color: '#00ced1' },
  { id: 9, name: 'Social Tax', type: 'event', icon: 'payments' },
  { id: 10, name: 'DESERT', type: 'corner', icon: 'cactus' },
  { id: 11, name: 'Bangkok', type: 'property', group: 'orange', price: 200000, buildingCost: 150000, baseRent: 20000, rentMultipliers: [1, 3, 8, 20], color: '#ffa500' },
  { id: 12, name: 'Electric Co', type: 'property', group: 'utility', price: 150000, baseRent: 15000, color: '#ffd700' },
  { id: 13, name: 'New Delhi', type: 'property', group: 'orange', price: 220000, buildingCost: 150000, baseRent: 22000, rentMultipliers: [1, 3, 8, 20], color: '#ffa500' },
  { id: 14, name: 'Tehran', type: 'property', group: 'orange', price: 240000, buildingCost: 150000, baseRent: 24000, rentMultipliers: [1, 3, 8, 20], color: '#ffa500' },
  { id: 15, name: 'Dubai', type: 'property', group: 'purple', price: 280000, buildingCost: 200000, baseRent: 28000, rentMultipliers: [1, 3, 8, 20], color: '#800080' },
  { id: 16, name: 'Chance', type: 'event', icon: 'question_mark' },
  { id: 17, name: 'Cairo', type: 'property', group: 'purple', price: 300000, buildingCost: 200000, baseRent: 30000, rentMultipliers: [1, 3, 8, 20], color: '#800080' },
  { id: 18, name: 'Istanbul', type: 'property', group: 'purple', price: 320000, buildingCost: 200000, baseRent: 32000, rentMultipliers: [1, 3, 8, 20], color: '#800080' },
  { id: 19, name: 'Kyoto', type: 'property', group: 'purple', price: 350000, buildingCost: 250000, baseRent: 35000, rentMultipliers: [1, 3, 8, 20], color: '#800080' },
  { id: 20, name: 'TOUR', type: 'corner', icon: 'flight_takeoff' },
  { id: 21, name: 'Moscow', type: 'property', group: 'red', price: 400000, buildingCost: 300000, baseRent: 40000, rentMultipliers: [1, 3, 8, 20], color: '#ff0000' },
  { id: 22, name: 'Chance', type: 'event', icon: 'question_mark' },
  { id: 23, name: 'Rome', type: 'property', group: 'red', price: 420000, buildingCost: 300000, baseRent: 42000, rentMultipliers: [1, 3, 8, 20], color: '#ff0000' },
  { id: 24, name: 'Berlin', type: 'property', group: 'red', price: 450000, buildingCost: 300000, baseRent: 45000, rentMultipliers: [1, 3, 8, 20], color: '#ff0000' },
  { id: 25, name: 'London', type: 'property', group: 'yellow', price: 500000, buildingCost: 350000, baseRent: 50000, rentMultipliers: [1, 3, 8, 20], color: '#ffff00' },
  { id: 26, name: 'Water Works', type: 'property', group: 'utility', price: 150000, baseRent: 15000, color: '#ffd700' },
  { id: 27, name: 'Paris', type: 'property', group: 'yellow', price: 550000, buildingCost: 350000, baseRent: 55000, rentMultipliers: [1, 3, 8, 20], color: '#ffff00' },
  { id: 28, name: 'San Francisco', type: 'property', group: 'yellow', price: 600000, buildingCost: 350000, baseRent: 60000, rentMultipliers: [1, 3, 8, 20], color: '#ffff00' },
  { id: 29, name: 'Tokyo', type: 'property', group: 'yellow', price: 700000, buildingCost: 400000, baseRent: 70000, rentMultipliers: [1, 3, 8, 20], color: '#ffff00' },
  { id: 30, name: 'POLICE', type: 'corner', icon: 'local_police' },
  { id: 31, name: 'Sydney', type: 'property', group: 'green', price: 800000, buildingCost: 500000, baseRent: 80000, rentMultipliers: [1, 3, 8, 20], color: '#00ff00' },
  { id: 32, name: 'Chance', type: 'event', icon: 'question_mark' },
  { id: 33, name: 'Rio de Janeiro', type: 'property', group: 'green', price: 850000, buildingCost: 500000, baseRent: 85000, rentMultipliers: [1, 3, 8, 20], color: '#00ff00' },
  { id: 34, name: 'Buenos Aires', type: 'property', group: 'green', price: 900000, buildingCost: 500000, baseRent: 90000, rentMultipliers: [1, 3, 8, 20], color: '#00ff00' },
  { id: 35, name: 'New York', type: 'property', group: 'blue', price: 1100000, buildingCost: 600000, baseRent: 110000, rentMultipliers: [1, 3, 8, 20], color: '#0000ff' },
  { id: 36, name: 'Super Tax', type: 'event', icon: 'priority_high' },
  { id: 37, name: 'Los Angeles', type: 'property', group: 'blue', price: 1300000, buildingCost: 600000, baseRent: 130000, rentMultipliers: [1, 3, 8, 20], color: '#0000ff' },
  { id: 38, name: 'Chance', type: 'event', icon: 'question_mark' },
  { id: 39, name: 'Seoul', type: 'property', group: 'blue', price: 1500000, buildingCost: 700000, baseRent: 150000, rentMultipliers: [1, 3, 8, 20], color: '#0000ff' },
];
