import { useState, useEffect } from "react";
import { Descriptions } from "antd";
import { getNumberColor } from "../../../utils/colorUtils";
import { getCurrentOverview } from "../../../api/handlers/marketHandler";

const MarketOverview: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getCurrentOverview().then((data) => setData(data));
  }, []);

  if (!data) return <div>加载中...</div>;

  return (
    <Descriptions title="盘面特性" bordered column={4} style={{ marginTop: "20px" }}>
      <Descriptions.Item label="今日指数">{data.index}</Descriptions.Item>
      <Descriptions.Item label="今日指数变化"><span style={{ color: getNumberColor(data.indexChange) }}>{data.indexChange}</span></Descriptions.Item>
      <Descriptions.Item label="今日增量"><span style={{ color: getNumberColor(data.volumeIncrement) }}>{data.volumeIncrement}</span></Descriptions.Item>
      <Descriptions.Item label="红标数">{data.redCount}</Descriptions.Item>
      <Descriptions.Item label="绿标数">{data.greenCount}</Descriptions.Item>
      <Descriptions.Item label="涨停数">{data.limitUpCount}</Descriptions.Item>
      <Descriptions.Item label="跌停数">{data.limitDownCount}</Descriptions.Item>
      <Descriptions.Item label="20cm票涨停数">{data.limitUp20cm}</Descriptions.Item>
      <Descriptions.Item label="20cm票跌停数">{data.limitDown20cm}</Descriptions.Item>
      <Descriptions.Item label="10cm票涨停数">{data.limitUp10cm}</Descriptions.Item>
      <Descriptions.Item label="10cm票跌停数">{data.limitDown10cm}</Descriptions.Item>
      <Descriptions.Item label="北交所涨幅"><span style={{ color: getNumberColor(data.beijingGain) }}>{data.beijingGain}</span></Descriptions.Item>
      <Descriptions.Item label="北交所红标数">{data.beijingRedCount}</Descriptions.Item>
      <Descriptions.Item label="炸板数">{data.breakCount}</Descriptions.Item>
      <Descriptions.Item label="前五炸板板块">{data.topBreakSectors.join(", ")}</Descriptions.Item>
    </Descriptions>
  );
};

export default MarketOverview;