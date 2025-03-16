import React, { useState, useEffect } from 'react';
import { Typography, Card, Tabs, Form, InputNumber, Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchStocks } from '../api/handlers/stockSelectHandler';
import { Stock } from '../api/types';

const { Title } = Typography;
const { TabPane } = Tabs;

const StockSelect: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formFundamental] = Form.useForm();
  const [formTechnical] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchStocks()
      .then((data: Stock[]) => {
        setStocks(data);
        setFilteredStocks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('加载股票数据失败:', error);
        setLoading(false);
      });
  }, []);

  const handleFundamentalFilter = (values: any) => {
    const { peMin, peMax, pbMin, pbMax } = values;
    const filtered = stocks.filter((stock) => {
      return (
        (peMin === undefined || stock.pe >= peMin) &&
        (peMax === undefined || stock.pe <= peMax) &&
        (pbMin === undefined || stock.pb >= pbMin) &&
        (pbMax === undefined || stock.pb <= pbMax)
      );
    });
    setFilteredStocks(filtered);
  };

  const handleTechnicalFilter = (values: any) => {
    const { rsiMin, rsiMax, macdSignal } = values;
    const filtered = stocks.filter((stock) => {
      return (
        (rsiMin === undefined || (stock.rsi && stock.rsi >= rsiMin)) &&
        (rsiMax === undefined || (stock.rsi && stock.rsi <= rsiMax)) &&
        (macdSignal === undefined || stock.macdSignal === macdSignal)
      );
    });
    setFilteredStocks(filtered);
  };

  const handleReset = () => {
    formFundamental.resetFields();
    formTechnical.resetFields();
    setFilteredStocks(stocks);
  };

  const columns = [
    { title: '股票代码', dataIndex: 'code', key: 'code' },
    { title: '股票名称', dataIndex: 'name', key: 'name' },
    { title: '市盈率 (PE)', dataIndex: 'pe', key: 'pe', sorter: (a: Stock, b: Stock) => a.pe - b.pe },
    { title: '市净率 (PB)', dataIndex: 'pb', key: 'pb', sorter: (a: Stock, b: Stock) => a.pb - b.pb },
    { title: 'RSI', dataIndex: 'rsi', key: 'rsi', sorter: (a: Stock, b: Stock) => (a.rsi || 0) - (b.rsi || 0) },
    { title: 'MACD 信号', dataIndex: 'macdSignal', key: 'macdSignal' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Stock) => (
        <Button type="link" onClick={() => navigate(`/trade-signals?code=${record.code}`)}>
          查看买卖点
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>个股选择</Title>
      <Card>
        <Tabs defaultActiveKey="fundamental">
          <TabPane tab="基本面选股" key="fundamental">
            <Form form={formFundamental} layout="inline" onFinish={handleFundamentalFilter} style={{ marginBottom: '20px' }}>
              <Form.Item label="市盈率 (PE) 最小值" name="peMin">
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item label="市盈率 (PE) 最大值" name="peMax">
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item label="市净率 (PB) 最小值" name="pbMin">
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item label="市净率 (PB) 最大值" name="pbMax">
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  筛选
                </Button>
                <Button onClick={handleReset} style={{ marginLeft: '10px' }}>
                  重置
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="技术面选股" key="technical">
            <Form form={formTechnical} layout="inline" onFinish={handleTechnicalFilter} style={{ marginBottom: '20px' }}>
              <Form.Item label="RSI 最小值" name="rsiMin">
                <InputNumber min={0} max={100} />
              </Form.Item>
              <Form.Item label="RSI 最大值" name="rsiMax">
                <InputNumber min={0} max={100} />
              </Form.Item>
              <Form.Item label="MACD 信号" name="macdSignal">
                <select style={{ width: 120 }}>
                  <option value="">全部</option>
                  <option value="buy">买入</option>
                  <option value="sell">卖出</option>
                  <option value="neutral">中性</option>
                </select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  筛选
                </Button>
                <Button onClick={handleReset} style={{ marginLeft: '10px' }}>
                  重置
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
        <Table
          columns={columns}
          dataSource={filteredStocks}
          rowKey="code"
          loading={loading}
          pagination={false}
          scroll={{ y: 400 }}
        />
      </Card>
    </div>
  );
};

export default StockSelect;