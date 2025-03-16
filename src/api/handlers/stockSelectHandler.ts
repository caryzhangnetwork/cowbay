import { Stock } from '../types';

export const fetchStocks = (): Promise<Stock[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockStocks: Stock[] = [
        { code: '600519', name: '贵州茅台', pe: 25, pb: 8, rsi: 65, macdSignal: 'buy' },
        { code: '601318', name: '中国平安', pe: 10, pb: 1.5, rsi: 28, macdSignal: 'sell' },
        { code: '002241', name: '歌尔股份', pe: 15, pb: 3, rsi: 45, macdSignal: 'buy' },
        { code: '000001', name: '平安银行', pe: 8, pb: 1.2, rsi: 35, macdSignal: 'neutral' },
        { code: '300750', name: '宁德时代', pe: 30, pb: 10, rsi: 75, macdSignal: 'sell' },
      ];
      resolve(mockStocks);
    }, 1000); // 模拟 1 秒延迟
  });
};