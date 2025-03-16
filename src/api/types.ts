export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  description?: string;
}

export interface MarketData {
  date: string;
  value: number;
}

export interface Stock {
  code: string;
  name: string;
  pe: number; // 市盈率
  pb: number; // 市净率
  rsi?: number; // 技术指标示例
}

export interface MarketData {
  date: string;
  value: number;
}

export interface Stock {
  code: string;
  name: string;
  pe: number; // 市盈率
  pb: number; // 市净率
  rsi?: number; // 相对强弱指数
  macdSignal?: 'buy' | 'sell' | 'neutral'; // MACD 信号
}

export interface TradeSignal {
  stockCode: string;
  stockName: string;
  signal: 'buy' | 'sell' | 'neutral';
  reason: string;
  date: string;
}

export interface StockKLineData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  signal?: 'buy' | 'sell';
}