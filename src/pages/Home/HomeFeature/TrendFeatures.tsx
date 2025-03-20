import { useState } from "react";
import { Tabs, Radio } from "antd";
import TrendSector from "./TrendSector";
import TrendOverview from "./TrendOverview";

const TrendFeatures: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"3days" | "5days" | "10days">("3days");

  return (
    <div>
      <Radio.Group value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ marginBottom: "20px" }}>
        <Radio.Button value="3days">3天</Radio.Button>
        <Radio.Button value="5days">5天</Radio.Button>
        <Radio.Button value="10days">10天</Radio.Button>
      </Radio.Group>
      <Tabs defaultActiveKey="1" type="card">
        <Tabs.TabPane tab="板块特性" key="1">
          <TrendSector timeRange={timeRange} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="盘面特性" key="2">
          <TrendOverview timeRange={timeRange} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default TrendFeatures;