import { useState, useEffect } from "react";
import { Tabs, Table } from "antd";
import ReactECharts from "echarts-for-react";
import { getTrendMarket } from "../../../api/handlers/marketHandler";
import { getNumberColor } from "../../../utils/colorUtils";
import { TrendMarketData } from "../../../api/types/market";

const { TabPane } = Tabs;

const tabList = [
  { key: "index", title: "今日指数" },
  { key: "indexChange", title: "今日指数变化" },
  { key: "volumeIncrement", title: "今日增量" },
  { key: "redCount", title: "红标数" },
  { key: "greenCount", title: "绿标数" },
  { key: "limitUpCount", title: "涨停数" },
  { key: "limitDownCount", title: "跌停数" },
  { key: "limitUp20cm", title: "20cm票涨停数" },
  { key: "limitDown20cm", title: "20cm票跌停数" },
  { key: "limitUp10cm", title: "10cm票涨停数" },
  { key: "limitDown10cm", title: "10cm票跌停数" },
  { key: "beijingGain", title: "北交所涨幅" },
  { key: "beijingRedCount", title: "北交所红标数" },
  { key: "breakCount", title: "炸板数" },
  { key: "topBreakSectors", title: "前五炸板板块" },
] as const;

type TabKey = typeof tabList[number]["key"];

const TrendMarket: React.FC<{ timeRange: "3days" | "5days" | "10days" }> = ({
  timeRange,
}) => {
  const [activeTabs, setActiveTabs] = useState<TabKey[]>(["index"]);
  const [dataSource, setDataSource] = useState<TrendMarketData | null>(null);

  useEffect(() => {
    getTrendMarket(timeRange).then((data) => setDataSource(data));
  }, [timeRange]);

  const handleTabClick = (key: string) => {
    const tabKey = key as TabKey;
    setActiveTabs((prev) => {
      const newTabs = prev.includes(tabKey)
        ? prev.filter((tab) => tab !== tabKey)
        : [...prev, tabKey];
      return newTabs;
    });
  };

  const getChartOption = () => {
    if (!dataSource) return {};

    const series = activeTabs
      .filter((tabKey) => tabKey !== "topBreakSectors")
      .map((tabKey) => ({
        name: tabList.find((tab) => tab.key === tabKey)?.title,
        type: "line",
        data: dataSource.data.map((item) => item[tabKey]),
      }));

    return {
      tooltip: { trigger: "axis" },
      legend: { data: series.map((s) => s.name) },
      xAxis: {
        type: "category",
        data: dataSource.days,
      },
      yAxis: { type: "value" },
      series,
    };
  };

  const renderTopBreakSectors = () => {
    if (!dataSource || !activeTabs.includes("topBreakSectors")) return null;

    const columns = [
      { title: "日期", dataIndex: "day", key: "day" },
      { title: "前五炸板板块", dataIndex: "sectors", key: "sectors" },
    ];

    const tableData = dataSource.data.map((item, index) => ({
      key: index,
      day: dataSource.days[index],
      sectors: item.topBreakSectors.join(", "),
    }));

    return <Table columns={columns} dataSource={tableData} pagination={false} />;
  };

  if (!dataSource) return <div>加载中...</div>;

  return (
    <div>
      <h2>
        盘面特性 -{" "}
        {timeRange === "3days" ? "3 天" : timeRange === "5days" ? "5 天" : "10 天"}
      </h2>
      <Tabs
        onTabClick={handleTabClick}
        type="card"
        tabBarStyle={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {tabList.map((tab) => {
          const isActive = activeTabs.includes(tab.key);
          return (
            <TabPane
              tab={
                <span
                  style={
                    isActive
                      ? {
                          backgroundColor: "#fff", // 选中时白色背景
                          color: "#1890ff", // 选中时蓝色字体
                          padding: "4px 8px", // 增强视觉效果
                          borderRadius: "4px",
                        }
                      : {
                          color: "#000", // 未选中时黑色字体
                        } // 未选中时不设置背景，恢复默认灰色
                  }
                >
                  {tab.title}
                </span>
              }
              key={tab.key}
            />
          );
        })}
      </Tabs>
      {activeTabs.length > 0 ? (
        <ReactECharts
          option={getChartOption()}
          style={{ height: 400 }}
          key={activeTabs.join("-")}
        />
      ) : (
        <div>请选择至少一个指标</div>
      )}
      {renderTopBreakSectors()}
    </div>
  );
};

export default TrendMarket;