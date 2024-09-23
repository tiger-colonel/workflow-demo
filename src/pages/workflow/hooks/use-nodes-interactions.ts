import {
  useReactFlow,
  useStoreApi,
  NodeMouseHandler,
  getConnectedEdges,
  Position,
  getOutgoers,
} from '@xyflow/react';
import { useCallback } from 'react';
import { produce } from 'immer';
import { Edge, Node, NodeTypeEnum, OnNodeAdd, StageEnum } from '../types';
import {
  CUSTOM_NODE,
  INIT_NODE_X,
  NODE_HEIGHT_Y_OFFSET,
  NODE_WIDTH,
  NODE_WIDTH_X_OFFSET,
  STAGE_LIST,
  STAGE_NODE_HEIGHT,
  Y_OFFSET,
} from '../constants';

export const useNodesInteractions = () => {
  const store = useStoreApi();
  // 添加需求节点、环节节点、环节子节点，环节子子节点待定
  // TODO: 节点之间的距离需要重新计算
  const handleNodeAdd = useCallback<OnNodeAdd>(
    ({ prevNodeId }, { nodeType, stage }) => {
      const { nodes, setNodes, edges, setEdges } = store.getState();
      const newNode: Node = {
        id: `${Date.now()}`,
        data: {
          order: 1,
          title: '',
          rootId: '',
          selected: true,
          type: nodeType,
        },
        type: CUSTOM_NODE,
        position: {
          x: 0,
          y: 0,
        },
      };

      const stageObj = STAGE_LIST.find((item) => item.key === stage);
      const prevNodeIndex = nodes.findIndex((node) => node.id === prevNodeId);
      const prevNode = nodes[prevNodeIndex] as Node;
      console.log('prevNode=========>', prevNode);

      // 新增需求节点
      if (nodeType === NodeTypeEnum.Primary) {
        // 找到最低的 positionY
        const allNodes = [...nodes].sort(
          (a, b) => a.position.y - b.position.y,
        ) as Node[];
        const primaryNodes = allNodes.filter(
          (item) => item.data.type === NodeTypeEnum.Primary,
        );
        const lastNode = allNodes[allNodes.length - 1];
        newNode.position = {
          x: INIT_NODE_X,
          y: lastNode.position.y + NODE_HEIGHT_Y_OFFSET,
        };
        newNode.data = {
          ...newNode.data,
          title: '需求名称',
          order: primaryNodes.length + 1,
          rootId: newNode.id,
        };
      }
      // 新增环节节点
      else if (nodeType === NodeTypeEnum.Stage) {
        const positionX =
          STAGE_LIST.find((item) => item.key === stage)?.order || 1;
        newNode.position = {
          x: prevNode.position.x + NODE_WIDTH_X_OFFSET * positionX,
          y: prevNode.position.y + Y_OFFSET,
        };

        newNode.data = {
          ...newNode.data,
          title: stageObj?.name || '',
          selected: true,
          stage,
          type: NodeTypeEnum.Stage,
          order: 1,
          rootId: (prevNode as Node).data.rootId || '',
        };
        newNode.parentId = prevNode.id;
      }
      // 新增环节子节点
      else if (nodeType === NodeTypeEnum.StageChild) {
        const outgoers = getOutgoers(prevNode, nodes, edges).sort(
          (a, b) => a.position.y - b.position.y,
        );
        const nodeCount = outgoers.length;
        newNode.position = {
          x: prevNode.position.x - NODE_WIDTH,
          y: prevNode.position.y + STAGE_NODE_HEIGHT * (nodeCount + 1),
        };
        newNode.data = {
          ...newNode.data,
          title: `${stageObj?.name}-需求${nodeCount}`,
          selected: true,
          stage,
          type: NodeTypeEnum.StageChild,
          order: nodeCount,
          rootId: (prevNode as Node).data.rootId || '',
        };
        newNode.parentId = prevNode.id;
      }

      const newNodes = produce(nodes, (draft: Node[]) => {
        draft.forEach((node) => {
          node.data.selected = false;
          if (
            node.data.type === NodeTypeEnum.Primary &&
            node.id === newNode.data.rootId
          ) {
            const existStages = node.data.existStages || [];
            existStages.push(stage as string);
            node.data.existStages = existStages;
          }
        });
        draft.push(newNode);
      });
      console.log('newNodes=========>', newNodes);
      setNodes(newNodes);

      const newEdge: Edge = {
        id: `${prevNodeId}-${newNode.id}`,
        type: 'custom',
        source: prevNodeId!,
        target: newNode.id,
        style: { strokeWidth: 2, stroke: '#CACEE0' },
        data: {
          targetType: nodeType,
        },
      };
      const newEdges = produce(edges, (draft) => {
        draft.forEach((item) => {
          item.data = {
            ...item.data,
          };
        });
        draft.push(newEdge);
      });
      setEdges(newEdges);
    },
    [],
  );

  const handleNodeSelect = useCallback(
    (nodeId: string, cancelSelection?: boolean) => {
      const { nodes, setNodes, edges, setEdges } = store.getState();

      const selectedNode = nodes.find((node) => node.data.selected);

      if (!cancelSelection && selectedNode?.id === nodeId) return;

      const newNodes = produce(nodes, (draft) => {
        draft.forEach((node) => {
          if (node.id === nodeId) node.data.selected = !cancelSelection;
          else node.data.selected = false;
        });
      });
      setNodes(newNodes);

      const connectedEdges = getConnectedEdges(
        [{ id: nodeId } as Node],
        edges,
      ).map((edge) => edge.id);
      const newEdges = produce(edges, (draft) => {
        draft.forEach((edge) => {
          if (connectedEdges.includes(edge.id)) {
            edge.data = {
              ...edge.data,
              _connectedNodeIsSelected: !cancelSelection,
            };
          } else {
            edge.data = {
              ...edge.data,
              _connectedNodeIsSelected: false,
            };
          }
        });
      });
      setEdges(newEdges);

      // handleSyncWorkflowDraft();
    },
    [store],
  );

  const handleNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      handleNodeSelect(node.id);
    },
    [handleNodeSelect],
  );

  return { handleNodeAdd, handleNodeClick };
};
