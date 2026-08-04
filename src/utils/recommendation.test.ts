import { describe, expect, it } from 'vitest';
import { foods } from '../data/foods';
import { filterFoods, getCuisineCandidates, getFlavorCandidates } from './recommendation';

describe('food database', () => {
  it('contains at least 300 concrete dishes', () => {
    expect(foods.length).toBeGreaterThanOrEqual(300);
    expect(new Set(foods.map((food) => food.name)).size).toBe(foods.length);
  });

  it('covers nationwide and popular international cuisines', () => {
    const cuisines = new Set(foods.map((food) => food.cuisine));
    ['鲁菜', '湖北菜', '山西菜', '新疆菜', '藏餐', '印度料理', '墨西哥菜', '中东料理', '法式料理'].forEach((cuisine) => {
      expect(cuisines.has(cuisine)).toBe(true);
    });
  });

  it('has all required fields', () => {
    foods.forEach((food) => {
      expect(food.id && food.name && food.cuisine && food.description && food.image).toBeTruthy();
      expect(food.category.length).toBeGreaterThan(0);
      expect(food.flavor.length).toBeGreaterThan(0);
    });
  });

  it('uses a broad food-photo pool instead of one repeated image per cuisine', () => {
    expect(new Set(foods.map((food) => food.image)).size).toBeGreaterThanOrEqual(55);
    const cuisinePhotoCounts = new Map<string, Set<string>>();
    foods.forEach((food) => {
      const photos = cuisinePhotoCounts.get(food.cuisine) ?? new Set<string>();
      photos.add(food.image);
      cuisinePhotoCounts.set(food.cuisine, photos);
    });
    expect([...cuisinePhotoCounts.values()].every((photos) => photos.size > 1)).toBe(true);
  });
});

describe('recommendation constraints', () => {
  it('never recommends spicy food for a non-spicy hard preference', () => {
    const results = filterFoods({ spicyPreference: 'none', selectedFlavor: '鲜香' });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((food) => food.spicyLevel === 0)).toBe(true);
  });

  it('keeps both spicy and non-spicy candidates when either is selected', () => {
    const results = filterFoods({ spicyPreference: 'either' });
    expect(results.some((food) => food.spicyLevel === 0)).toBe(true);
    expect(results.some((food) => food.spicyLevel > 0)).toBe(true);
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
