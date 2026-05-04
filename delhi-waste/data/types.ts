export interface StatItem {
  id: string;
  number: string;
  label: string;
  source?: string;
  sourceLabel?: string;
  highlight?: 'accent' | 'danger';
}

export interface FlowStep {
  id: string;
  step: number;
  title: string;
  intended: string;
  reality: string;
  gap: string;
}

export type LocationCategory =
  | 'ewaste'
  | 'composting'
  | 'recycler'
  | 'hazardous'
  | 'landfill';

export interface Location {
  id: string;
  name: string;
  category: LocationCategory;
  lat: number;
  lng: number;
  address: string;
  accepts: string;
  hours?: string;
  sourceUrl?: string;
  placeholder: boolean;
}

export interface GhazipurDataPoint {
  year: number;
  height: number;
}

export interface SegregationDataPoint {
  body: string;
  percentage: number;
}

export interface WasteCompositionItem {
  name: string;
  value: number;
  color: string;
}

export interface ProcessingGapDataPoint {
  year: string;
  generated: number;
  processed: number;
}

export interface Source {
  id: string;
  title: string;
  publisher: string;
  year: number;
  url: string;
}
