import { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Table, Modal } from "antd";
import { getNumberColor } from "../../../utils/colorUtils";
import { getCurrentSector } from "../../../api/handlers/marketHandler";

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
    background: isHighlighted ? "#fff" : "#f0f0f0", // 高亮时蓝色，否则灰色
    color: isHighlighted ? "#1999ff" : "#000", // 高亮时文字白色
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

const SectorFeatures: React.FC = () => {
  const [leftPanel, setLeftPanel] = useState<string | null>(null);
  const [rightPanel, setRightPanel] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalContent, setModalContent] = useState<
    { name: string; change?: number }[] | string[]
  >([]);

  useEffect(() => {
    getCurrentSector().then((data) => setDataSource(data));
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const tabKey = active.id;
    if (over.id === "leftPanel") {
      setLeftPanel(tabKey);
    } else if (over.id === "rightPanel") {
      setRightPanel(tabKey);
    }
  };

  const showModal = (
    content: { name: string; change?: number }[] | string[],
    title: string
  ) => {
    setModalContent(content);
    setModalTitle(title);
    setModalVisible(true);
  };

  const renderTable = (tabKey: string | null) => {
    if (!tabKey || !dataSource) return <div>请拖动 Tab 到此处</div>;
    const columns =
      tabKey === "topGainers"
        ? [
            {
              title: "板块",
              dataIndex: "name",
              render: (name: string, record: any) => (
                <a
                  onClick={() =>
                    showModal(record.volumeStocks || [], `${name} - 股票列表`)
                  }
                >
                  {name}
                </a>
              ),
            },
            { title: "红标数", dataIndex: "redCount" },
            { title: "绿标数", dataIndex: "greenCount" },
            {
              title: "容量票数",
              render: (record: any) => (
                <a
                  onClick={() =>
                    showModal(record.volumeStocks, "容量票数股票列表")
                  }
                >
                  {record.volumeStocks.length}
                </a>
              ),
            },
            {
              title: "连板股",
              render: (record: any) => (
                <a
                  onClick={() =>
                    showModal(record.limitUpStocks, "连板股股票列表")
                  }
                >
                  {record.limitUpStocks.length}
                </a>
              ),
            },
            {
              title: "涨停股",
              render: (record: any) => (
                <a
                  onClick={() =>
                    showModal(record.limitUpStocks, "涨停股股票列表")
                  }
                >
                  {record.limitUpStocks.length}
                </a>
              ),
            },
          ]
        : [
            {
              title: "板块",
              dataIndex: "name",
              render: (name: string, record: any) => (
                <a
                  onClick={() =>
                    showModal(record.volumeStocks || [], `${name} - 股票列表`)
                  }
                >
                  {name}
                </a>
              ),
            },
          ];
    return <Table columns={columns} dataSource={dataSource[tabKey]} pagination={false} />;
  };

  if (!dataSource) return <div>加载中...</div>;

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
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
      <Modal
        title={modalTitle}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <ul style={{ padding: 0, listStyle: "none" }}>
          {modalContent.length > 0 ? (
            modalContent.map((item, index) =>
              typeof item === "string" ? (
                <li key={index} style={{ padding: "5px 0" }}>
                  {item}
                </li>
              ) : (
                <li key={index} style={{ padding: "5px 0" }}>
                  {item.name}{" "}
                  {item.change !== undefined && (
                    <span
                      style={{
                        color: item.change >= 0 ? "red" : "green",
                      }}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change.toFixed(2)}%
                    </span>
                  )}
                </li>
              )
            )
          ) : (
            <li>暂无股票数据</li>
          )}
        </ul>
      </Modal>
    </div>
  );
};

export default SectorFeatures;