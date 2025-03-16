import React, { useState, useEffect, useRef } from 'react';
import { Typography, Card, Button } from 'antd';
import * as d3 from 'd3';
import { fetchMarketData } from '../api/handlers/marketHandler';
import { MarketData } from '../api/types';

const { Title } = Typography;

const Home: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchMarketData()
      .then((data: MarketData[]) => {
        setMarketData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('加载市场数据失败:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!marketData.length || !chartRef.current) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', 600)
      .attr('height', 400);

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleTime()
      .domain(d3.extent(marketData, (d: MarketData) => new Date(d.date)) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(marketData, (d: MarketData) => d.value)! - 50, d3.max(marketData, (d: MarketData) => d.value)! + 50])
      .range([height, 0]);

    const line = d3.line<MarketData>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.value));

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('path')
      .datum(marketData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));
  }, [marketData]);

  const handleRefresh = () => {
    setLoading(true);
    fetchMarketData()
      .then((data: MarketData[]) => {
        setMarketData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('刷新市场数据失败:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Title level={2}>市场走势分析</Title>
      <Card loading={loading}>
        <div ref={chartRef}></div>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={handleRefresh} loading={loading}>
            刷新数据
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;