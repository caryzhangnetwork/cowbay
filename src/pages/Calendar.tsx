import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Radio, Table } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { fetchCalendarEvents } from '../api/handlers/calendarHandler';
import { CalendarEvent } from '../api/types';

const { Title } = Typography;

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'currentMonth' | 'sixMonths'>('sixMonths');

  // 加载事件数据的通用函数
  const loadEvents = () => {
    setLoading(true);
    fetchCalendarEvents(viewMode)
      .then((data: CalendarEvent[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('加载事件失败:', error);
        setLoading(false);
      });
  };

  // 初始化加载
  useEffect(() => {
    loadEvents();
  }, [viewMode]);

  // 处理事件点击（FullCalendar）
  const handleEventClick = (info: any) => {
    const event = info.event;
    const description = event.extendedProps.description || '暂无描述';
    alert(`事件: ${event.title}\n描述: ${description}`);
  };

  // 自定义事件内容（FullCalendar）
  const renderEventContent = (eventInfo: any) => {
    return <b>{eventInfo.event.title}</b>;
  };

  // 刷新事件
  const handleRefresh = () => {
    loadEvents();
  };

  // Table 列定义（未来 6 个月模式）
  const columns = [
    {
      title: '日期',
      dataIndex: 'start',
      key: 'start',
      sorter: (a: CalendarEvent, b: CalendarEvent) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    },
    {
      title: '事件',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || '暂无描述',
    },
  ];

  return (
    <div>
      <Title level={2}>事件日历</Title>
      <Card>
        {/* 视图切换和刷新按钮 */}
        <div style={{ marginBottom: '20px' }}>
          <Radio.Group
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="currentMonth">本月事件</Radio.Button>
            <Radio.Button value="sixMonths">未来 6 个月</Radio.Button>
          </Radio.Group>
          <Button
            type="primary"
            onClick={handleRefresh}
            loading={loading}
            style={{ marginLeft: '20px' }}
          >
            刷新事件
          </Button>
        </div>

        {/* 根据视图模式切换显示 */}
        {viewMode === 'currentMonth' ? (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: '',
            }}
            height="auto"
            locale="zh-cn"
            firstDay={1}
            loading={(isLoading) => setLoading(isLoading)}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={events}
            rowKey="id"
            loading={loading}
            pagination={false} // 无需分页，所有事件一览
            scroll={{ y: 400 }} // 固定高度，超出滚动
          />
        )}
      </Card>
    </div>
  );
};

export default Calendar;