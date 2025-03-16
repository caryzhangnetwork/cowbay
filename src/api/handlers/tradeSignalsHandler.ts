// src/api/handlers/tradeSignalsHandler.ts
import { TradeSignal, StockKLineData } from '../types';

export interface TradeSignalResponse {
  stockCode: string;
  stockName: string;
  companyIntro: string;
  tags: string[];
  signals: TradeSignal[];
  kLineData: {
    daily: StockKLineData[];
    weekly: StockKLineData[];
    monthly: StockKLineData[];
  };
}

export const fetchTradeSignals = (stockCode?: string): Promise<TradeSignalResponse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: TradeSignalResponse[] = [
        {
          stockCode: '600519',
          stockName: '贵州茅台',
          companyIntro: '贵州茅台酒股份有限公司是中国著名的白酒生产企业，以生产高端茅台酒闻名。',
          tags: ['白酒', '消费品', '沪深300'],
          signals: [
            { stockCode: '600519', stockName: '贵州茅台', signal: 'buy', reason: 'RSI < 30，超卖', date: '2025-03-15' },
            { stockCode: '600519', stockName: '贵州茅台', signal: 'sell', reason: 'MACD 死叉', date: '2025-03-20' },
          ],
          kLineData: {
            daily: [
              { date: '2025-03-01', open: 1700, high: 1720, low: 1690, close: 1710 },
              { date: '2025-03-02', open: 1710, high: 1730, low: 1700, close: 1720 },
              { date: '2025-03-03', open: 1720, high: 1740, low: 1710, close: 1730 },
              { date: '2025-03-04', open: 1730, high: 1750, low: 1720, close: 1740 },
              { date: '2025-03-05', open: 1740, high: 1760, low: 1730, close: 1750 },
              { date: '2025-03-06', open: 1750, high: 1770, low: 1740, close: 1760 },
              { date: '2025-03-07', open: 1760, high: 1780, low: 1750, close: 1740 },
              { date: '2025-03-08', open: 1740, high: 1750, low: 1730, close: 1745 },
              { date: '2025-03-09', open: 1745, high: 1760, low: 1720, close: 1730 },
              { date: '2025-03-10', open: 1730, high: 1740, low: 1710, close: 1720 },
              { date: '2025-03-11', open: 1720, high: 1730, low: 1700, close: 1710 },
              { date: '2025-03-12', open: 1710, high: 1720, low: 1690, close: 1700 },
              { date: '2025-03-13', open: 1700, high: 1710, low: 1680, close: 1690 },
              { date: '2025-03-14', open: 1690, high: 1700, low: 1670, close: 1680 },
              { date: '2025-03-15', open: 1680, high: 1690, low: 1660, close: 1670, signal: 'buy' },
              { date: '2025-03-16', open: 1670, high: 1680, low: 1650, close: 1660 },
              { date: '2025-03-17', open: 1660, high: 1670, low: 1640, close: 1650 },
              { date: '2025-03-18', open: 1650, high: 1660, low: 1630, close: 1640 },
              { date: '2025-03-19', open: 1640, high: 1650, low: 1620, close: 1630 },
              { date: '2025-03-20', open: 1630, high: 1640, low: 1610, close: 1620, signal: 'sell' },
            ],
            weekly: [
              { date: '2025-03-10', open: 1700, high: 1750, low: 1690, close: 1740 },
              { date: '2025-03-17', open: 1740, high: 1800, low: 1730, close: 1775 },
            ],
            monthly: [
              { date: '2025-03-01', open: 1700, high: 1800, low: 1690, close: 1775 },
            ],
          },
        },
        {
          stockCode: '601318',
          stockName: '中国平安',
          companyIntro: '中国平安保险（集团）股份有限公司是中国领先的综合金融服务集团。',
          tags: ['保险', '金融', '沪深300'],
          signals: [
            { stockCode: '601318', stockName: '中国平安', signal: 'sell', reason: 'MACD 死叉', date: '2025-03-16' },
          ],
          kLineData: {
            daily: [
              { date: '2025-03-15', open: 50, high: 52, low: 49, close: 51 },
              { date: '2025-03-16', open: 51, high: 53, low: 50, close: 50, signal: 'sell' },
            ],
            weekly: [{ date: '2025-03-10', open: 50, high: 53, low: 49, close: 50 }],
            monthly: [{ date: '2025-03-01', open: 50, high: 53, low: 49, close: 50 }],
          },
        },
      ];

      if (stockCode) {
        const filtered = mockData.filter((item) => item.stockCode === stockCode);
        resolve(filtered.length > 0 ? [filtered[0]] : []);
      } else {
        resolve(mockData);
      }
    }, 1000);
  });
};