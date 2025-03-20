// types/market.ts
export interface Stock {
  name: string;
  change: number; // 涨幅，单位：百分比
}

export interface SectorRecord {
  name: string;
  redCount?: number;
  greenCount?: number;
  volumeStocks?: Stock[]; // 修改为 Stock 对象数组
  limitUpStocks?: string[]; // 保持不变，因为 limitUpStocks 仍是字符串数组
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
  "3days": { topGainers: SectorRecord[] };
  "5days": { topGainers: SectorRecord[] };
  "10days": { topGainers: SectorRecord[] };
}