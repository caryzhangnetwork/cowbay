import { Tabs } from "antd";
import SectorFeatures from "./SectorFeatures";
import MarketOverview from "./MarketOverview";

const CurrentMarket: React.FC = () => {
  return (
    <Tabs defaultActiveKey="1" type="card">
      <Tabs.TabPane tab="板块特性" key="1">
        <SectorFeatures />
      </Tabs.TabPane>
      <Tabs.TabPane tab="盘面特性" key="2">
        <MarketOverview />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default CurrentMarket;