import { useState } from "react";
import { Tabs } from "antd";
import CurrentMarket from "./CurrentMarket";
import TrendFeatures from "./TrendFeatures";

const TabsContainer: React.FC = () => {
  const [activeParent, setActiveParent] = useState("1");

  return (
    <Tabs activeKey={activeParent} onChange={setActiveParent} type="card">
      <Tabs.TabPane tab="当天形势特性" key="1">
        <CurrentMarket />
      </Tabs.TabPane>
      <Tabs.TabPane tab="连续性的趋势特性" key="2">
        <TrendFeatures />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default TabsContainer;