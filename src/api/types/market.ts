// types/market.ts
export interface Stock {
  name: string;
  change: number;
}

export interface SectorRecord {
  name: string;
  redCount?: number;
  greenCount?: number;
  volumeStocks?: Stock[];
  limitUpStocks?: string[];
}

export interface CurrentMarketData {
  topGainers: SectorRecord[];
  topLimitUp: SectorRecord[];
  topLimitDown: SectorRecord[];
  minLimitUp: SectorRecord[];
  minLimitDown: SectorRecord[];
  topRed: SectorRecord[];
  topGreen: SectorRecord[];
}

export interface TrendSectorData {
  topGainers: { day: string; name: string }[];
  topLimitUp: { day: string; name: string }[];
  topLimitDown: { day: string; name: string }[];
  minLimitUp: { day: string; name: string }[];
  minLimitDown: { day: string; name: string }[];
  topRed: { day: string; name: string }[];
  topGreen: { day: string; name: string }[];
}

export interface TrendMarketData {
  days: string[];
  data: {
    index: number;
    indexChange: number;
    volumeIncrement: number;
    redCount: number;
    greenCount: number;
    limitUpCount: number;
    limitDownCount: number;
    limitUp20cm: number;
    limitDown20cm: number;
    limitUp10cm: number;
    limitDown10cm: number;
    beijingGain: number;
    beijingRedCount: number;
    breakCount: number;
    topBreakSectors: string[];
  }[];
}