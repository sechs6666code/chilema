import { foods } from '../data/foods';
import type { DecisionState, Food } from '../types';

type FilterOptions = {
  ignoreFlavor?: boolean;
  ignoreCuisine?: boolean;
  ignoreDish?: boolean;
  relaxSoft?: boolean;
};

function matchesSpicy(food: Food, preference?: string) {
  if (!preference || preference === 'any') return true;
  if (preference === 'none') return food.spicyLevel === 0;
  if (preference === 'mild') return food.spicyLevel <= 1;
  if (preference === 'medium') return food.spicyLevel >= 1 && food.spicyLevel <= 3;
  if (preference === 'very') return food.spicyLevel >= 3;
  return true;
}

function matchesTemperature(food: Food, preference?: string) {
  if (!preference || preference === 'any' || preference === 'either') return true;
  return food.temperature === preference || food.temperature === 'either';
}

function matchesHunger(food: Food, preference?: string) {
  if (!preference || preference === 'any') return true;
  if (preference === 'light') return food.fullnessLevel <= 3;
  if (preference === 'normal') return food.fullnessLevel >= 2 && food.fullnessLevel <= 4;
  if (preference === 'good') return food.fullnessLevel >= 3;
  if (preference === 'stuffed') return food.fullnessLevel >= 4;
  return true;
}

function matchesIntensity(food: Food, preference?: string) {
  if (!preference || preference === 'any' || preference === 'normal') return true;
  if (preference === 'light') return food.flavor.includes('清淡') && food.spicyLevel <= 1;
  if (preference === 'heavy') return food.spicyLevel >= 2 || food.flavor.some((flavor) => ['麻辣', '香辣', '酸辣', '浓郁', '烟火味'].includes(flavor));
  return true;
}

export function filterFoods(state: DecisionState, options: FilterOptions = {}): Food[] {
  const strict = foods.filter((food) => {
    if (!matchesSpicy(food, state.spicyPreference)) return false;
    if (!matchesTemperature(food, state.temperature)) return false;
    if (!options.ignoreFlavor && state.selectedFlavor && !food.flavor.includes(state.selectedFlavor)) return false;
    if (!options.ignoreCuisine && state.selectedCuisine && food.cuisine !== state.selectedCuisine) return false;
    if (!options.ignoreDish && state.selectedDish && food.id !== state.selectedDish) return false;
    if (!options.relaxSoft && state.foodForm && state.foodForm !== 'any' && !food.category.includes(state.foodForm)) return false;
    if (!options.relaxSoft && !matchesHunger(food, state.hungerLevel)) return false;
    if (!options.relaxSoft && !matchesIntensity(food, state.flavorIntensity)) return false;
    return true;
  });

  if (strict.length || options.relaxSoft) return strict;
  return filterFoods(state, { ...options, relaxSoft: true });
}

export function getFlavorCandidates(state: DecisionState) {
  const candidates = filterFoods(state, { ignoreFlavor: true, ignoreCuisine: true, ignoreDish: true });
  const counts = new Map<string, number>();
  candidates.forEach((food) => food.flavor.forEach((flavor) => counts.set(flavor, (counts.get(flavor) ?? 0) + 1)));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([flavor]) => flavor).slice(0, 10);
}

export function getCuisineCandidates(state: DecisionState) {
  const candidates = filterFoods(state, { ignoreCuisine: true, ignoreDish: true });
  const counts = new Map<string, number>();
  candidates.forEach((food) => counts.set(food.cuisine, (counts.get(food.cuisine) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([cuisine]) => cuisine);
}

function secureIndex(length: number) {
  if (length <= 1) return 0;
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0] % length;
  }
  return Math.floor(Math.random() * length);
}

export function chooseFood(candidates: Food[], recentFoodIds: string[] = []) {
  if (!candidates.length) return undefined;
  const fresh = candidates.filter((food) => !recentFoodIds.slice(0, 5).includes(food.id));
  const pool = fresh.length ? fresh : candidates;
  return pool[secureIndex(pool.length)];
}

export function getFoodById(id?: string) {
  return foods.find((food) => food.id === id);
}

export const displayMaps = {
  spicy: ['不辣', '微辣', '中辣', '很辣', '爆辣'],
  fullness: ['轻盈', '垫肚子', '刚刚好', '很满足', '吃到扶墙'],
  price: ['¥ 20以内', '¥ 20–50', '¥ 50–100', '¥ 100+']
};
