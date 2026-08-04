export type Temperature = 'hot' | 'cold' | 'either';
export type SpicyLevel = 0 | 1 | 2 | 3 | 4;
export type Level = 1 | 2 | 3 | 4 | 5;
export type PriceLevel = 1 | 2 | 3 | 4;

export type Food = {
  id: string;
  name: string;
  cuisine: string;
  category: string[];
  flavor: string[];
  spicyLevel: SpicyLevel;
  fullnessLevel: Level;
  temperature: Temperature;
  priceLevel: PriceLevel;
  suitableForSolo: boolean;
  suitableForGroup: boolean;
  deliveryFriendly: boolean;
  description: string;
  image: string;
};

export type DecisionState = {
  hungerLevel?: string;
  temperature?: string;
  flavorIntensity?: string;
  spicyPreference?: string;
  foodForm?: string;
  selectedFlavor?: string;
  selectedCuisine?: string;
  selectedDish?: string;
};

export type HistoryEntry = {
  id: string;
  foodId: string;
  chosenAt: string;
};

export type AppView = 'welcome' | 'question' | 'flavor' | 'cuisine' | 'dish' | 'result' | 'favorites' | 'history';
