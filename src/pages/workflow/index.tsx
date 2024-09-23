import { ReactFlow, Background, ReactFlowProvider } from "@xyflow/react";
import Operator from "./operator";

import "@xyflow/react/dist/style.css";
import { Button, Flex } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { CUSTOM_NODE, INIT_NODE_X, INIT_NODE_Y } from "./constants";
import CustomNode from "./nodes/";
import CustomEdge from "./custom-edge";
import { useNodesInteractions } from "./hooks";
import { NodeTypeEnum } from "./types";

const nodeTypes = {
  [CUSTOM_NODE]: CustomNode,
};
const edgeTypes = {
  [CUSTOM_NODE]: CustomEdge,
};

const Workflow = () => {
  const initialNodes = [
    {
      id: `${Date.now()}`,
      position: {
        x: INIT_NODE_X,
        y: INIT_NODE_Y,
      },

      type: "custom",
      data: {
        title: "需求名称",
        order: 1,
        rootId: `${Date.now()}`,
        selected: false,
        type: NodeTypeEnum.Primary,
      },
    },
  ];

  const { handleNodeClick } = useNodesInteractions();
  return (
    <div className="workflow-page h-full">
      <div className="w-screen h-screen relative">
        <Flex
          align="center"
          justify="space-between"
          gap={24}
          className="h-54px w-full px-24px absolute top-0 z-9"
          style={{
            background:
              "linear-gradient(rgb(249, 250, 251) 0%, rgba(249, 250, 251, 0) 100%)",
          }}
        >
          <Flex gap={24}>
            <div>
              <UnorderedListOutlined />
              <span className="pl-8px">新文件</span>
            </div>
            <Button size="small" type="primary" className="rounded-full">
              创建文件
            </Button>
          </Flex>
          <div>
            <Button size="small" type="primary" className="rounded-full">
              创建工单
            </Button>
          </div>
        </Flex>
        <ReactFlow
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={initialNodes}
          // edges={initialEdges}
          onNodeClick={handleNodeClick}
          minZoom={0.25}
          style={{
            backgroundColor: "#F0F2F7",
          }}
        >
          <Background gap={[14, 14]} size={2} color="#E4E5E7" />
          <Operator />
        </ReactFlow>
      </div>
    </div>
  );
};

const WorkflowWrapper = () => {
  return (
    <ReactFlowProvider>
      <Workflow />
    </ReactFlowProvider>
  );
};

export default WorkflowWrapper;
