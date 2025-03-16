import { MarketData } from '../types';

// 生成随机市场数据的辅助函数
const generateMarketData = (startDate: Date, days: number, baseValue: number): MarketData[] => {
  const data: MarketData[] = [];
  let currentValue = baseValue;

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateString = date.toISOString().split('T')[0]; // 格式化为 "YYYY-MM-DD"

    // 模拟市场波动：随机涨跌 ±0.5% ~ 2%
    const changePercent = (Math.random() * 1.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1);
    currentValue += currentValue * (changePercent / 100);

    data.push({
      date: dateString,
      value: Math.round(currentValue * 100) / 100, // 保留两位小数
    });
  }

  return data;
};

export const fetchMarketData = (): Promise<MarketData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 设置起始日期为 2025-03-01，生成 6 个月（约 183 天）的数据
      const startDate = new Date('2025-03-01');
      const days = 183; // 6 个月大约 183 天
      const baseValue = 3000; // 初始指数值（模拟上证指数）

      const mockData: MarketData[] = generateMarketData(startDate, days, baseValue);
      resolve(mockData);
    }, 1000); // 模拟 1 秒延迟
  });
};