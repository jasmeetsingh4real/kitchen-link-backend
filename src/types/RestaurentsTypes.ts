export enum EnumRestaurantStatus {
  ACTIVE = "active",
  CLOSED = "closed",
}

export interface TCountry {
  id: number;
  name: string;
  iso3: string;
  numeric_code?: string;
  iso2: string;
  phonecode: string;
  capital: string;
  currency: string;
  currency_name?: string;
  currency_symbol?: string;
  tld?: string;
  native: string;
  region?: string;
  region_id?: number;
  subregion?: string;
  subregion_id?: number;
  nationality?: string;
  timezones?: string;
  translations?: string;
  latitude?: string;
  longitude: string;
  emoji: string;
  emojiU?: string;
}

export interface TState {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  iso2: string;
  type: string;
  latitude: string;
  longitude: string;
}

export interface TCity {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}
//if you want to change these values, consider changing them at the frontend too
export enum EnumFoodItemCategory {
  APPETIZER = "Appetizer",
  MAIN_COURSE = "Main Course",
  SIDE_DISH = "Side Dish",
  DESSERT = "Dessert",
  BEVERAGE = "Beverage",
  SALAD = "Salad",
  SOUP = "Soup",
  SNACK = "Snack",
  BREAKFAST = "Breakfast",
  BRUNCH = "Brunch",
}

export enum EnumDietryInfo {
  VEG = "veg",
  NON_VEG = "non_veg",
}

export enum EnumImageType {
  RESTAURANT_IMAGE = "restaurant_image",
  FOOD_ITEM_IMAGE = "food_item_image",
  FOOD_ITEM_OPTION_IMAGE = "food_item_option_image",
}

export enum EnumOrderItemType {
  FOOD_ITEM = "food_item",
  FOOD_ITEM_OPTION = "food_item_option",
}
