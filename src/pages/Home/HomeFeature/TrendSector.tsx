import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Table } from "antd";
import { getTrendSector } from "../../../api/handlers/marketHandler";
import { TrendSectorData } from "../../../api/types/market";

// Tab 数据
const tabList = [
  { key: "topGainers", title: "涨幅前五板块" },
  { key: "topLimitUp", title: "涨停最多五个板块" },
  { key: "topLimitDown", title: "跌停最多五个板块" },
  { key: "minLimitUp", title: "涨停最少五个板块" },
  { key: "minLimitDown", title: "跌停最少五个板块" },
  { key: "topRed", title: "红标最多五个板块" },
  { key: "topGreen", title: "绿标最多五个板块" },
];

// 可拖拽的 Tab 组件
const DraggableTab = ({
  tab,
  isHighlighted,
}: {
  tab: { key: string; title: string };
  isHighlighted: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tab.key,
  });
  const style = {
    padding: "8px 16px",
    background: isHighlighted ? "#1890ff" : "#f0f0f0",
    color: isHighlighted ? "#fff" : "#000",
    borderRadius: "4px",
    cursor: "grab",
    transform: CSS.Transform.toString(transform),
    transition: "background 0.3s, color 0.3s",
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {tab.title}
    </div>
  );
};

// 可放置的面板组件
const DroppablePanel = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  const style = {
    width: "50%",
    minHeight: "200px",
    border: isOver ? "2px solid #1890ff" : "1px dashed #ccc",
    padding: "10px",
  };
  return <div ref={setNodeRef} style={style}>{children}</div>;
};

const TrendSector: React.FC<{ timeRange: "3days" | "5days" | "10days" }> = ({
  timeRange,
}) => {
  const [leftPanel, setLeftPanel] = useState<string | null>(null);
  const [rightPanel, setRightPanel] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<TrendSectorData | null>(null);

  useEffect(() => {
    getTrendSector(timeRange).then((data) => setDataSource(data));
  }, [timeRange]);

  const daysCount = {
    "3days": 3,
    "5days": 5,
    "10days": 10,
  }[timeRange];

  const renderTable = (tabKey: string | null) => {
    if (!tabKey || !dataSource || !dataSource[tabKey as keyof TrendSectorData]) {
      return <div>请拖动 Tab 到此处</div>;
    }

    const tabData = dataSource[tabKey as keyof TrendSectorData];
    const rankedData = Array.from({ length: 5 }, (_, rank) => {
      const row: any = { rank: rank + 1 };
      for (let i = 0; i < daysCount; i++) {
        const dayData = tabData[rank + i * 5];
        row[`day${i + 1}`] = dayData ? dayData.name : "-";
      }
      return row;
    });

    const columns = [
      { title: "排名", dataIndex: "rank", key: "rank" },
      ...Array.from({ length: daysCount }, (_, i) => ({
        title: `第 ${i + 1} 天`,
        dataIndex: `day${i + 1}`,
        key: `day${i + 1}`,
      })),
    ];

    return (
      <Table
        dataSource={rankedData}
        columns={columns}
        pagination={false}
        rowKey="rank"
      />
    );
  };

  if (!dataSource) return <div>加载中...</div>;

  return (
    <div>
      <DndContext onDragEnd={(event) => {
        const { active, over } = event;
        if (!over) return;
        const tabKey = active.id;
        if (over.id === "leftPanel") {
          setLeftPanel(tabKey as string);
        } else if (over.id === "rightPanel") {
          setRightPanel(tabKey as string);
        }
      }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {tabList.map((tab) => (
            <DraggableTab
              key={tab.key}
              tab={tab}
              isHighlighted={tab.key === leftPanel || tab.key === rightPanel}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <DroppablePanel id="leftPanel">{renderTable(leftPanel)}</DroppablePanel>
          <DroppablePanel id="rightPanel">{renderTable(rightPanel)}</DroppablePanel>
        </div>
      </DndContext>
    </div>
  );
};

export default TrendSector;