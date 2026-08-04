import { describe, expect, it } from 'vitest';
import { flavorList, foods } from '../data/foods';
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

  it('classifies hotpot as an actual hotpot-style final dish', () => {
    const hotpots = foods.filter((food) => food.category.includes('hotpot'));
    expect(hotpots.length).toBeGreaterThan(10);
    expect(hotpots.every((food) => /火锅|涮|冰煮|部队锅|酸菜白肉锅/.test(food.name))).toBe(true);
  });

  it('keeps every dish reachable through a visible form and flavor layer', () => {
    const visibleForms = ['rice', 'noodle', 'rice-noodle', 'hotpot', 'bbq', 'snack', 'fast', 'meal'];
    foods.forEach((food) => {
      expect(food.category.some((category) => visibleForms.includes(category)), food.name).toBe(true);
      expect(food.flavor.some((flavor) => flavorList.includes(flavor)), food.name).toBe(true);
    });
  });

  it('keeps Sichuan hotpot at the final dish layer', () => {
    const sichuanHotpot = foods.find((food) => food.name === '四川火锅');
    expect(sichuanHotpot).toMatchObject({ cuisine: '川菜', spicyLevel: 4 });
    expect(sichuanHotpot?.category).toContain('hotpot');
    expect(sichuanHotpot?.flavor).toContain('麻辣');

    const results = filterFoods({
      spicyPreference: 'very',
      foodForm: 'hotpot',
      selectedFlavor: '麻辣',
      selectedCuisine: '川菜'
    });
    expect(results.map((food) => food.name)).toContain('四川火锅');
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

  it('never silently drops an explicit form or flavor when a path is impossible', () => {
    expect(filterFoods({ spicyPreference: 'none', foodForm: 'hotpot', selectedFlavor: '麻辣' })).toEqual([]);
  });

  it('keeps the full non-spicy hotpot and light-flavor path linked', () => {
    const state = { spicyPreference: 'none', foodForm: 'hotpot', selectedFlavor: '清淡' };
    const cuisines = getCuisineCandidates(state);
    expect(cuisines.length).toBeGreaterThan(0);

    const results = cuisines.flatMap((selectedCuisine) => filterFoods({ ...state, selectedCuisine }));
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((food) => (
      food.spicyLevel === 0
      && food.category.includes('hotpot')
      && food.flavor.includes('清淡')
      && cuisines.includes(food.cuisine)
    ))).toBe(true);
  });

  it('preserves every form, flavor and cuisine constraint through the whole hierarchy', () => {
    const forms = ['rice', 'noodle', 'rice-noodle', 'hotpot', 'bbq', 'snack', 'fast', 'meal'];
    const spicyPreferences = ['none', 'either', 'mild', 'medium', 'very'];

    forms.forEach((foodForm) => spicyPreferences.forEach((spicyPreference) => {
      const base = { foodForm, spicyPreference };
      getFlavorCandidates(base).forEach((selectedFlavor) => {
        const flavored = { ...base, selectedFlavor };
        getCuisineCandidates(flavored).forEach((selectedCuisine) => {
          const results = filterFoods({ ...flavored, selectedCuisine });
          expect(results.length).toBeGreaterThan(0);
          expect(results.every((food) => (
            food.category.includes(foodForm)
            && food.flavor.includes(selectedFlavor)
            && food.cuisine === selectedCuisine
          ))).toBe(true);
        });
      });
    }));
  });

  it('exhaustively preserves all five base answers through flavor, cuisine and dish layers', () => {
    const hungerLevels = ['light', 'normal', 'good', 'stuffed'];
    const temperatures = ['hot', 'cold', 'either'];
    const intensities = ['light', 'normal', 'heavy'];
    const spicyPreferences = ['none', 'either', 'mild', 'medium', 'very'];
    const forms = ['rice', 'noodle', 'rice-noodle', 'hotpot', 'bbq', 'snack', 'fast', 'meal'];
    let reachablePaths = 0;

    hungerLevels.forEach((hungerLevel) => temperatures.forEach((temperature) => intensities.forEach((flavorIntensity) => {
      spicyPreferences.forEach((spicyPreference) => forms.forEach((foodForm) => {
        const base = { hungerLevel, temperature, flavorIntensity, spicyPreference, foodForm };
        const baseFoods = filterFoods(base, { ignoreFlavor: true, ignoreCuisine: true, ignoreDish: true });
        if (!baseFoods.length) return;

        getFlavorCandidates(base).forEach((selectedFlavor) => {
          const flavored = { ...base, selectedFlavor };
          const cuisines = getCuisineCandidates(flavored);
          expect(cuisines.length).toBeGreaterThan(0);

          cuisines.forEach((selectedCuisine) => {
            const results = filterFoods({ ...flavored, selectedCuisine });
            expect(results.length).toBeGreaterThan(0);
            results.forEach((food) => {
              expect(food.category).toContain(foodForm);
              expect(food.flavor).toContain(selectedFlavor);
              expect(food.cuisine).toBe(selectedCuisine);
              if (temperature !== 'either') expect([temperature, 'either']).toContain(food.temperature);
              if (spicyPreference === 'none') expect(food.spicyLevel).toBe(0);
              if (spicyPreference === 'mild') expect(food.spicyLevel).toBeLessThanOrEqual(1);
              if (spicyPreference === 'medium') expect(food.spicyLevel).toBeGreaterThanOrEqual(1);
              if (spicyPreference === 'medium') expect(food.spicyLevel).toBeLessThanOrEqual(3);
              if (spicyPreference === 'very') expect(food.spicyLevel).toBeGreaterThanOrEqual(3);
              if (hungerLevel === 'light') expect(food.fullnessLevel).toBeLessThanOrEqual(3);
              if (hungerLevel === 'normal') expect(food.fullnessLevel).toBeGreaterThanOrEqual(2);
              if (hungerLevel === 'good') expect(food.fullnessLevel).toBeGreaterThanOrEqual(3);
              if (hungerLevel === 'stuffed') expect(food.fullnessLevel).toBeGreaterThanOrEqual(4);
              if (flavorIntensity === 'light') {
                expect(food.flavor).toContain('清淡');
                expect(food.spicyLevel).toBeLessThanOrEqual(1);
              }
              if (flavorIntensity === 'heavy') {
                expect(food.spicyLevel >= 2 || food.flavor.some((flavor) => ['麻辣', '香辣', '酸辣', '浓郁', '烟火味'].includes(flavor))).toBe(true);
              }
            });
            reachablePaths += 1;
          });
        });
      }));
    })));

    expect(reachablePaths).toBeGreaterThan(1000);
  }, 30_000);
});
