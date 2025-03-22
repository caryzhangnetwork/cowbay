import { CurrentMarketData, TrendSectorData, TrendMarketData } from "../types/market";

// Mock 数据
const currentSectorData = {
  topGainers: [
    { name: "板块A", redCount: 25, greenCount: 10, volumeStocks: ["股票1", "股票2"], limitUpStocks: ["股票3"], limitUpTimes: ["09:35"] },
    { name: "板块B", redCount: 22, greenCount: 12, volumeStocks: ["股票4"], limitUpStocks: [], limitUpTimes: [] },
    // ... 其他 3 个板块
  ],
  topLimitUp: [{ name: "板块C" }, { name: "板块D" }, { name: "板块E" }, { name: "板块F" }, { name: "板块G" }],
  topLimitDown: [{ name: "板块H" }, { name: "板块I" }, { name: "板块J" }, { name: "板块K" }, { name: "板块L" }],
  minLimitUp: [{ name: "板块M" }, { name: "板块N" }, { name: "板块O" }, { name: "板块P" }, { name: "板块Q" }],
  minLimitDown: [{ name: "板块R" }, { name: "板块S" }, { name: "板块T" }, { name: "板块U" }, { name: "板块V" }],
  topRed: [{ name: "板块W" }, { name: "板块X" }, { name: "板块Y" }, { name: "板块Z" }, { name: "板块AA" }],
  topGreen: [{ name: "板块BB" }, { name: "板块CC" }, { name: "板块DD" }, { name: "板块EE" }, { name: "板块FF" }],
};

const currentOverviewData = {
  index: 3200.5,
  indexChange: -10.2,
  volumeIncrement: 500,
  redCount: 1500,
  greenCount: 1200,
  limitUpCount: 50,
  limitDownCount: 30,
  limitUp20cm: 10,
  limitDown20cm: 5,
  limitUp10cm: 40,
  limitDown10cm: 25,
  beijingGain: 2.5,
  beijingRedCount: 300,
  breakCount: 15,
  topBreakSectors: ["板块A", "板块B", "板块C", "板块D", "板块E"],
};



const trendOverviewData = {
  "3days": [{ date: "2025-03-17", index: 3200, indexChange: -5, /* 其他字段 */ }],
  "5days": [{ date: "2025-03-15", index: 3180, indexChange: 10, /* 其他字段 */ }],
  "10days": [{ date: "2025-03-10", index: 3170, indexChange: 15, /* 其他字段 */ }],
};

// API 函数
export const getCurrentOverview = async () => {
  return new Promise<typeof currentOverviewData>((resolve) => setTimeout(() => resolve(currentOverviewData), 500));
};

export const getTrendSector = async (
  timeRange: "3days" | "5days" | "10days"
): Promise<TrendSectorData> => {
  // Mock 数据，模拟连续多天的趋势数据
  const days = {
    "3days": 3,
    "5days": 5,
    "10days": 10,
  }[timeRange];

  const allData = [
    ["科技板块", "医药板块", "能源板块", "金融板块", "消费板块", "地产板块", "新能源板块", "基建板块", "汽车板块", "教育板块"],
    ["医药板块", "消费板块", "科技板块", "金融板块", "地产板块", "能源板块", "新能源板块", "基建板块", "汽车板块", "教育板块"],
    ["能源板块", "科技板块", "医药板块", "消费板块", "金融板块", "地产板块", "新能源板块", "基建板块", "汽车板块", "教育板块"],
    ["金融板块", "医药板块", "消费板块", "科技板块", "能源板块", "地产板块", "新能源板块", "基建板块", "汽车板块", "教育板块"],
    ["消费板块", "金融板块", "科技板块", "医药板块", "能源板块", "地产板块", "新能源板块", "基建板块", "汽车板块", "教育板块"],
    ["地产板块", "消费板块", "金融板块", "科技板块", "医药板块", "能源板块", "新能源板块", "基建板块", "汽车板块", "教育板块"],
    ["新能源板块", "地产板块", "消费板块", "金融板块", "科技板块", "医药板块", "能源板块", "基建板块", "汽车板块", "教育板块"],
    ["基建板块", "新能源板块", "地产板块", "消费板块", "金融板块", "科技板块", "医药板块", "能源板块", "汽车板块", "教育板块"],
    ["汽车板块", "基建板块", "新能源板块", "地产板块", "消费板块", "金融板块", "科技板块", "医药板块", "能源板块", "教育板块"],
    ["教育板块", "汽车板块", "基建板块", "新能源板块", "地产板块", "消费板块", "金融板块", "科技板块", "医药板块", "能源板块"],
  ];

  const generateData = (offset: number) => {
    const result: { day: string; name: string }[] = [];
    for (let i = 0; i < days; i++) {
      const dayIndex = (i + offset) % 10;
      result.push(
        { day: `Day ${i + 1}`, name: allData[dayIndex][0] },
        { day: `Day ${i + 1}`, name: allData[dayIndex][1] },
        { day: `Day ${i + 1}`, name: allData[dayIndex][2] },
        { day: `Day ${i + 1}`, name: allData[dayIndex][3] },
        { day: `Day ${i + 1}`, name: allData[dayIndex][4] }
      );
    }
    return result;
  };

  const trendSectorData: TrendSectorData = {
    topGainers: generateData(0),
    topLimitUp: generateData(1),
    topLimitDown: generateData(2),
    minLimitUp: generateData(3),
    minLimitDown: generateData(4),
    topRed: generateData(5),
    topGreen: generateData(6),
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(trendSectorData), 500);
  });
};

export const getTrendOverview = async (range: "3days" | "5days" | "10days") => {
  return new Promise<any>((resolve) => setTimeout(() => resolve(trendOverviewData[range]), 500));
};


export const getCurrentSector = async (): Promise<CurrentMarketData> => {
  // Mock 数据，模拟当天板块数据
  const currentSectorData: CurrentMarketData = {
    topGainers: [
      {
        name: "科技板块",
        redCount: 25,
        greenCount: 10,
        volumeStocks: [
          { name: "腾讯控股", change: 5.2 },
          { name: "阿里巴巴", change: 3.8 },
          { name: "京东", change: 2.5 },
          { name: "美团", change: 4.1 },
        ],
        limitUpStocks: ["腾讯控股", "美团"],
      },
      {
        name: "金融板块",
        redCount: 20,
        greenCount: 15,
        volumeStocks: [
          { name: "工商银行", change: 1.5 },
          { name: "建设银行", change: 2.0 },
          { name: "招商银行", change: 3.2 },
          { name: "平安保险", change: 1.8 },
        ],
        limitUpStocks: ["招商银行"],
      },
      {
        name: "消费板块",
        redCount: 18,
        greenCount: 12,
        volumeStocks: [
          { name: "茅台", change: 6.8 },
          { name: "五粮液", change: 5.5 },
          { name: "海天味业", change: 4.0 },
          { name: "伊利股份", change: 3.7 },
        ],
        limitUpStocks: ["茅台"],
      },
      {
        name: "医药板块",
        redCount: 22,
        greenCount: 8,
        volumeStocks: [
          { name: "恒瑞医药", change: 4.5 },
          { name: "复星医药", change: 3.9 },
          { name: "药明康德", change: 2.8 },
          { name: "爱尔眼科", change: 3.5 },
        ],
        limitUpStocks: ["恒瑞医药"],
      },
      {
        name: "能源板块",
        redCount: 15,
        greenCount: 20,
        volumeStocks: [
          { name: "中国石油", change: -1.2 },
          { name: "中国石化", change: -0.8 },
          { name: "中海油", change: -0.5 },
          { name: "神华集团", change: -1.0 },
        ],
        limitUpStocks: [],
      },
    ],
    topLimitUp: [
      {
        name: "科技板块",
        volumeStocks: [
          { name: "腾讯控股", change: 10.0 },
          { name: "阿里巴巴", change: 9.8 },
          { name: "京东", change: 9.5 },
        ],
      },
      {
        name: "医药板块",
        volumeStocks: [
          { name: "恒瑞医药", change: 10.0 },
          { name: "复星医药", change: 9.7 },
          { name: "药明康德", change: 9.6 },
        ],
      },
      {
        name: "消费板块",
        volumeStocks: [
          { name: "茅台", change: 10.0 },
          { name: "五粮液", change: 9.9 },
          { name: "海天味业", change: 9.8 },
        ],
      },
      {
        name: "新能源板块",
        volumeStocks: [
          { name: "宁德时代", change: 10.0 },
          { name: "比亚迪", change: 9.9 },
          { name: "隆基股份", change: 9.7 },
        ],
      },
      {
        name: "基建板块",
        volumeStocks: [
          { name: "中国建筑", change: 10.0 },
          { name: "中国中铁", change: 9.8 },
          { name: "中国铁建", change: 9.6 },
        ],
      },
    ],
    topLimitDown: [
      {
        name: "地产板块",
        volumeStocks: [
          { name: "万科A", change: -10.0 },
          { name: "保利地产", change: -9.8 },
          { name: "绿地控股", change: -9.5 },
        ],
      },
      {
        name: "钢铁板块",
        volumeStocks: [
          { name: "宝钢股份", change: -10.0 },
          { name: "鞍钢股份", change: -9.7 },
          { name: "马钢股份", change: -9.6 },
        ],
      },
      {
        name: "煤炭板块",
        volumeStocks: [
          { name: "神华集团", change: -10.0 },
          { name: "中煤能源", change: -9.9 },
          { name: "兖州煤业", change: -9.8 },
        ],
      },
      {
        name: "化工板块",
        volumeStocks: [
          { name: "万华化学", change: -10.0 },
          { name: "山东海化", change: -9.7 },
          { name: "三友化工", change: -9.6 },
        ],
      },
      {
        name: "纺织板块",
        volumeStocks: [
          { name: "华纺股份", change: -10.0 },
          { name: "鲁泰A", change: -9.8 },
          { name: "魏桥纺织", change: -9.5 },
        ],
      },
    ],
    minLimitUp: [
      {
        name: "农业板块",
        volumeStocks: [
          { name: "北大荒", change: 1.2 },
          { name: "隆平高科", change: 1.0 },
          { name: "大北农", change: 0.8 },
        ],
      },
      {
        name: "环保板块",
        volumeStocks: [
          { name: "碧水源", change: 1.5 },
          { name: "首创环保", change: 1.3 },
          { name: "瀚蓝环境", change: 1.1 },
        ],
      },
      {
        name: "教育板块",
        volumeStocks: [
          { name: "新东方", change: 1.8 },
          { name: "好未来", change: 1.6 },
          { name: "中公教育", change: 1.4 },
        ],
      },
      {
        name: "旅游板块",
        volumeStocks: [
          { name: "携程", change: 1.7 },
          { name: "中国国旅", change: 1.5 },
          { name: "宋城演艺", change: 1.3 },
        ],
      },
      {
        name: "传媒板块",
        volumeStocks: [
          { name: "分众传媒", change: 1.9 },
          { name: "芒果超媒", change: 1.7 },
          { name: "光线传媒", change: 1.5 },
        ],
      },
    ],
    minLimitDown: [
      {
        name: "零售板块",
        volumeStocks: [
          { name: "永辉超市", change: -1.5 },
          { name: "苏宁易购", change: -1.3 },
          { name: "国美零售", change: -1.1 },
        ],
      },
      {
        name: "汽车板块",
        volumeStocks: [
          { name: "长城汽车", change: -1.8 },
          { name: "吉利汽车", change: -1.6 },
          { name: "上汽集团", change: -1.4 },
        ],
      },
      {
        name: "航空板块",
        volumeStocks: [
          { name: "中国国航", change: -1.7 },
          { name: "南方航空", change: -1.5 },
          { name: "东方航空", change: -1.3 },
        ],
      },
      {
        name: "物流板块",
        volumeStocks: [
          { name: "顺丰控股", change: -1.9 },
          { name: "圆通速递", change: -1.7 },
          { name: "申通快递", change: -1.5 },
        ],
      },
      {
        name: "家电板块",
        volumeStocks: [
          { name: "格力电器", change: -1.6 },
          { name: "美的集团", change: -1.4 },
          { name: "海尔智家", change: -1.2 },
        ],
      },
    ],
    topRed: [
      {
        name: "科技板块",
        volumeStocks: [
          { name: "腾讯控股", change: 5.2 },
          { name: "阿里巴巴", change: 3.8 },
          { name: "京东", change: 2.5 },
        ],
      },
      {
        name: "金融板块",
        volumeStocks: [
          { name: "工商银行", change: 1.5 },
          { name: "建设银行", change: 2.0 },
          { name: "招商银行", change: 3.2 },
        ],
      },
      {
        name: "医药板块",
        volumeStocks: [
          { name: "恒瑞医药", change: 4.5 },
          { name: "复星医药", change: 3.9 },
          { name: "药明康德", change: 2.8 },
        ],
      },
      {
        name: "消费板块",
        volumeStocks: [
          { name: "茅台", change: 6.8 },
          { name: "五粮液", change: 5.5 },
          { name: "海天味业", change: 4.0 },
        ],
      },
      {
        name: "能源板块",
        volumeStocks: [
          { name: "中国石油", change: 1.2 },
          { name: "中国石化", change: 0.8 },
          { name: "中海油", change: 0.5 },
        ],
      },
    ],
    topGreen: [
      {
        name: "地产板块",
        volumeStocks: [
          { name: "万科A", change: -5.0 },
          { name: "保利地产", change: -4.8 },
          { name: "绿地控股", change: -4.5 },
        ],
      },
      {
        name: "钢铁板块",
        volumeStocks: [
          { name: "宝钢股份", change: -3.0 },
          { name: "鞍钢股份", change: -2.7 },
          { name: "马钢股份", change: -2.6 },
        ],
      },
      {
        name: "煤炭板块",
        volumeStocks: [
          { name: "神华集团", change: -4.0 },
          { name: "中煤能源", change: -3.9 },
          { name: "兖州煤业", change: -3.8 },
        ],
      },
      {
        name: "化工板块",
        volumeStocks: [
          { name: "万华化学", change: -3.5 },
          { name: "山东海化", change: -3.2 },
          { name: "三友化工", change: -3.0 },
        ],
      },
      {
        name: "汽车板块",
        volumeStocks: [
          { name: "长城汽车", change: -2.8 },
          { name: "吉利汽车", change: -2.6 },
          { name: "上汽集团", change: -2.4 },
        ],
      },
    ],
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(currentSectorData), 500); // 模拟异步请求
  });
};


export const getTrendMarket = async (
  timeRange: "3days" | "5days" | "10days"
): Promise<TrendMarketData> => {
  const days = { "3days": 3, "5days": 5, "10days": 10 }[timeRange];
  const trendMarketData: TrendMarketData = {
    days: Array.from({ length: days }, (_, i) => `Day ${i + 1}`),
    data: Array.from({ length: days }, (_, i) => ({
      index: 3000 + i * 10 + Math.random() * 50, // 模拟指数
      indexChange: (Math.random() - 0.5) * 2, // -1% 到 1%
      volumeIncrement: 1000 + i * 100 + Math.random() * 200, // 模拟增量
      redCount: 50 + Math.floor(Math.random() * 20),
      greenCount: 40 + Math.floor(Math.random() * 20),
      limitUpCount: 10 + Math.floor(Math.random() * 5),
      limitDownCount: 5 + Math.floor(Math.random() * 5),
      limitUp20cm: 2 + Math.floor(Math.random() * 3),
      limitDown20cm: 1 + Math.floor(Math.random() * 2),
      limitUp10cm: 8 + Math.floor(Math.random() * 4),
      limitDown10cm: 4 + Math.floor(Math.random() * 3),
      beijingGain: (Math.random() - 0.5) * 3, // -1.5% 到 1.5%
      beijingRedCount: 15 + Math.floor(Math.random() * 10),
      breakCount: 3 + Math.floor(Math.random() * 5),
      topBreakSectors: ["科技板块", "医药板块", "能源板块"].slice(0, 3),
    })),
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(trendMarketData), 500);
  });
};