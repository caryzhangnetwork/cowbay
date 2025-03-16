import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import StockSelect from './pages/StockSelect';
import TradeSignals from './pages/TradeSignals';
import './styles/App.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 获取当前路径

  const menuItems: MenuProps['items'] = [
    { key: '/', label: '市场走势' },
    { key: '/calendar', label: '事件日历' },
    { key: '/stock-select', label: '个股选择' },
    { key: '/trade-signals', label: '买卖点建议' },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]} // 动态设置选中项
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Header>
      <Content style={{ padding: '20px', minHeight: 'calc(100vh - 64px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/stock-select" element={<StockSelect />} />
          <Route path="/trade-signals" element={<TradeSignals />} />
        </Routes>
      </Content>
    </Layout>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;