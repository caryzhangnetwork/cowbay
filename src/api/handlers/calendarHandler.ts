import { CalendarEvent } from '../types';

export const fetchCalendarEvents = (mode: 'currentMonth' | 'sixMonths' = 'sixMonths'): Promise<CalendarEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentDate = new Date('2025-03-15');
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const allEvents: CalendarEvent[] = [
        { id: '1', title: '央行利率决议', start: '2025-03-20', description: '可能影响市场利率和货币政策' },
        { id: '2', title: '茅台财报发布', start: '2025-04-15', end: '2025-04-15', description: '贵州茅台发布年度财报' },
        { id: '3', title: '全国两会', start: '2025-03-05', end: '2025-03-15', description: '讨论经济政策，可能影响多板块' },
        { id: '4', title: '新能源政策发布会', start: '2025-05-10', description: '政府发布新能源支持政策' },
        { id: '5', title: '科技峰会', start: '2025-06-22', description: '讨论 AI 和新能源技术' },
        { id: '6', title: '中报季开始', start: '2025-07-01', description: '多家公司发布中期财报' },
        { id: '7', title: '经济数据发布', start: '2025-08-15', description: 'CPI 和 PPI 数据公布' },
      ];

      if (mode === 'currentMonth') {
        const currentMonthEvents = allEvents.filter((event) => {
          const eventDate = new Date(event.start);
          return eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth;
        });
        resolve(currentMonthEvents);
      } else {
        resolve(allEvents);
      }
    }, 1000);
  });
};