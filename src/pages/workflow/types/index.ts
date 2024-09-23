import type {
  Node as ReactflowNode,
  Edge as ReactflowEdge,
  Viewport,
} from '@xyflow/react';

export enum NodeTypeEnum {
  // 需求总单
  Primary = 'primary',
  // 环节单
  Stage = 'stage',
  // 环节子单
  StageChild = 'stageChild',
  // 环节子单的子单
  // Task ='task',
}
// 美术制作环节
export enum StageEnum {
  // 需求总单
  Primary = 'primary',
  // 场景原画
  ScenePaint = 'scenePaint',
  // 场景模型
  SceneModel = 'sceneModel',
  // 场景编辑
  SceneEdit = 'sceneEdit',
  // 角色原画
  RolePaint = 'rolePaint',
  // 角色模型
  RoleModel = 'roleModel',
  // 蒙皮绑定
  SkinBinding = 'skinBinding',
  // 物理
  Physics = 'physics',
  // 动作
  Action = 'action',
  // 特效
  Effect = 'effect',
  // 图标
  Icon = 'icon',
  // 界面
  UI = 'ui',
  // 动效
  Animation = 'animation',
}

export type CommonNodeType<T = {}> = {
  // 根据 rootId 筛选每个需求
  rootId: string;
  // 序号，每种类型单独计数
  order: number;
  // primay 节点，已经添加的环节
  existStages?: string[];
  selected?: boolean;
  title: string;
  stage?: StageEnum;
  type: NodeTypeEnum;
  desc?: string;
  width?: number;
  height?: number;
  _children?: string[];
  _isEntering?: boolean;
} & T;

export type Node<T = {}> = ReactflowNode<CommonNodeType<T>>;
export type SelectedNode = Pick<Node, 'id' | 'data'>;
export type NodeProps<T = unknown> = { id: string; data: CommonNodeType<T> };
export type NodePanelProps<T> = {
  id: string;
  data: CommonNodeType<T>;
};

export type CommonEdgeType = {
  _hovering?: boolean;
  _connectedNodeIsHovering?: boolean;
  _connectedNodeIsSelected?: boolean;
  // sourceType: NodeTypeEnum;
  targetType: NodeTypeEnum;
};
export type Edge = ReactflowEdge<CommonEdgeType>;

export type OnNodeAdd = (
  oldNodesPayload: {
    prevNodeId?: string;
    prevNodeSourceHandle?: string;
    nextNodeId?: string;
    nextNodeTargetHandle?: string;
  },
  newNodePayload: {
    nodeType: NodeTypeEnum;
    stage?: StageEnum;
    sourceHandle?: string;
    targetHandle?: string;
  },
) => void;

export type OnSelectBlock = (type: StageEnum) => void;
