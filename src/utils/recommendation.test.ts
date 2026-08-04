import { describe, expect, it } from 'vitest';
import { foods } from '../data/foods';
import { filterFoods, getCuisineCandidates, getFlavorCandidates } from './recommendation';

describe('food database', () => {
  it('contains at least 100 concrete dishes', () => {
    expect(foods.length).toBeGreaterThanOrEqual(100);
    expect(new Set(foods.map((food) => food.name)).size).toBe(foods.length);
  });

  it('has all required fields', () => {
    foods.forEach((food) => {
      expect(food.id && food.name && food.cuisine && food.description && food.image).toBeTruthy();
      expect(food.category.length).toBeGreaterThan(0);
      expect(food.flavor.length).toBeGreaterThan(0);
    });
  });
});

describe('recommendation constraints', () => {
  it('never recommends spicy food for a non-spicy hard preference', () => {
    const results = filterFoods({ spicyPreference: 'none', selectedFlavor: '鲜香' });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((food) => food.spicyLevel === 0)).toBe(true);
  });

  it('keeps the selected flavor and cuisine through later stages', () => {
    const state = { spicyPreference: 'medium', selectedFlavor: '酸辣', selectedCuisine: '广西菜' };
    const results = filterFoods(state);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((food) => food.cuisine === '广西菜' && food.flavor.includes('酸辣'))).toBe(true);
  });

  it('derives next-stage candidates from current conditions', () => {
    const state = { spicyPreference: 'none', temperature: 'cold' };
    expect(getFlavorCandidates(state).length).toBeGreaterThan(0);
    expect(getCuisineCandidates({ ...state, selectedFlavor: '清淡' }).length).toBeGreaterThan(0);
  });
});
