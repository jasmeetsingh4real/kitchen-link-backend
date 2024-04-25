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
