import React, { useState, useEffect, useRef } from 'react';
import { Typography, Card, Input, Descriptions, Tag, Radio } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { fetchTradeSignals, TradeSignalResponse } from '../api/handlers/tradeSignalsHandler';

const { Title } = Typography;
const { Search } = Input;

const TradeSignals: React.FC = () => {
  const [data, setData] = useState<TradeSignalResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const chartRef = useRef<SVGSVGElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 加载数据
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    fetchTradeSignals(code || undefined)
      .then((response) => {
        if (response.length > 0) {
          setData(response[0]);
        } else {
          setData(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('加载数据失败:', error);
        setLoading(false);
      });
  }, [location.search]);

  // 绘制 K 线图
  useEffect(() => {
    if (!data || !chartRef.current) return;

    const kLineData = data.kLineData[viewMode];
    if (!kLineData.length) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xScaleBase = d3.scaleTime()
      .domain(d3.extent(kLineData, (d) => new Date(d.date)) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([
        d3.min(kLineData, (d) => d.low)! - 10,
        d3.max(kLineData, (d) => d.high)! + 10,
      ])
      .range([innerHeight, 0]);

    // 绘制函数
    const drawChart = (xScale: d3.ScaleTime<number, number>) => {
      g.selectAll('.candle-group').remove();

      const visibleData = kLineData.filter((d) => {
        const x = xScale(new Date(d.date));
        return x >= -20 && x <= innerWidth + 20;
      });

      const candleWidth = Math.min(innerWidth / visibleData.length * 0.8, 20);

      const candleGroup = g.append('g').attr('class', 'candle-group');

      // 绘制蜡烛线（涨红跌绿）
      candleGroup
        .selectAll('.candle')
        .data(visibleData)
        .enter()
        .append('rect')
        .attr('class', 'candle')
        .attr('x', (d) => xScale(new Date(d.date))! - candleWidth / 2)
        .attr('y', (d) => yScale(Math.max(d.open, d.close)))
        .attr('width', candleWidth)
        .attr('height', (d) => Math.abs(yScale(d.open) - yScale(d.close)) || 1)
        .attr('fill', (d) => (d.open <= d.close ? 'red' : 'green')); // 涨红跌绿

      // 绘制高低线
      candleGroup
        .selectAll('.wick')
        .data(visibleData)
        .enter()
        .append('line')
        .attr('class', 'wick')
        .attr('x1', (d) => xScale(new Date(d.date))!)
        .attr('x2', (d) => xScale(new Date(d.date))!)
        .attr('y1', (d) => yScale(d.high))
        .attr('y2', (d) => yScale(d.low))
        .attr('stroke', 'black');

      // 绘制买卖点（保持买卖点颜色不变）
      candleGroup
        .selectAll('.signal')
        .data(visibleData.filter((d) => d.signal))
        .enter()
        .append('circle')
        .attr('class', 'signal')
        .attr('cx', (d) => xScale(new Date(d.date))!)
        .attr('cy', (d) => yScale(d.signal === 'buy' ? d.low - 5 : d.high + 5))
        .attr('r', 5)
        .attr('fill', (d) => (d.signal === 'buy' ? 'green' : 'red')); // 买卖点颜色不变
    };

    // 初始绘制
    drawChart(xScaleBase);

    // 坐标轴
    const xAxis = g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScaleBase));

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    // 缩放功能
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [innerWidth, innerHeight]])
      .on('zoom', (event) => {
        const newXScale = event.transform.rescaleX(xScaleBase);
        xAxis.call(d3.axisBottom(newXScale));
        drawChart(newXScale);
      });

    svg.call(zoom);
  }, [data, viewMode]);

  // 搜索股票
  const handleSearch = (value: string) => {
    if (!value) {
      setData(null);
      navigate('/trade-signals');
      return;
    }
    setLoading(true);
    fetchTradeSignals(value)
      .then((response) => {
        if (response.length > 0) {
          setData(response[0]);
          navigate(`/trade-signals?code=${response[0].stockCode}`);
        } else {
          setData(null);
        }
        setLoading(false);
      });
  };

  return (
    <div>
      <Title level={2}>买卖点建议</Title>
      <Card loading={loading}>
        <Search
          placeholder="输入股票代码或名称"
          onSearch={handleSearch}
          enterButton
          style={{ width: 300, marginBottom: '20px' }}
          allowClear
        />

        {data && (
          <>
            {/* 公司信息 */}
            <Descriptions title="公司信息" bordered style={{ marginBottom: '20px' }}>
              <Descriptions.Item label="股票代码">{data.stockCode}</Descriptions.Item>
              <Descriptions.Item label="股票名称">{data.stockName}</Descriptions.Item>
              <Descriptions.Item label="公司介绍" span={3}>{data.companyIntro}</Descriptions.Item>
              <Descriptions.Item label="板块标签" span={3}>
                {data.tags.map((tag) => (
                  <Tag key={tag} color="blue">{tag}</Tag>
                ))}
              </Descriptions.Item>
            </Descriptions>

            {/* K 线图视图切换 */}
            <Radio.Group
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              style={{ marginBottom: '20px' }}
            >
              <Radio.Button value="daily">日线</Radio.Button>
              <Radio.Button value="weekly">周线</Radio.Button>
              <Radio.Button value="monthly">月线</Radio.Button>
            </Radio.Group>

            {/* K 线图 */}
            <svg ref={chartRef} width="800" height="400"></svg>
          </>
        )}
      </Card>
    </div>
  );
};

export default TradeSignals;