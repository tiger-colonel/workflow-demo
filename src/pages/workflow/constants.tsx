import { StageEnum } from "./types";
import {
  ScenePaintIcon,
  SceneModelIcon,
  SceneEditIcon,
  RolePaintIcon,
  RoleModelIcon,
  SkinBindingIcon,
  PhysicsIcon,
  ActionIcon,
  EffectIcon,
  IconIcon,
  UIIcon,
  AnimationIcon,
} from "../../components/StageIcons";

export const CUSTOM_NODE = "custom";

const iconClass = "text-18px mr-6px";

export const STAGE_LIST = [
  {
    key: StageEnum.ScenePaint,
    name: "场景原画",
    order: 1,
    icon: <ScenePaintIcon className={iconClass} />,
  },
  {
    key: StageEnum.SceneModel,
    name: "场景模型",
    order: 2,
    icon: <SceneModelIcon className={iconClass} />,
  },
  {
    key: StageEnum.SceneEdit,
    name: "场景编辑",
    order: 3,
    icon: <SceneEditIcon className={iconClass} />,
  },
  {
    key: StageEnum.RolePaint,
    name: "角色原画",
    order: 4,
    icon: <RolePaintIcon className={iconClass} />,
  },
  {
    key: StageEnum.RoleModel,
    name: "角色模型",
    order: 5,
    icon: <RoleModelIcon className={iconClass} />,
  },
  {
    key: StageEnum.SkinBinding,
    name: "蒙皮绑定",
    order: 6,
    icon: <SkinBindingIcon className={iconClass} />,
  },
  {
    key: StageEnum.Physics,
    name: "物理",
    order: 7,
    icon: <PhysicsIcon className={iconClass} />,
  },
  {
    key: StageEnum.Action,
    name: "动作",
    order: 8,
    icon: <ActionIcon className={iconClass} />,
  },
  {
    key: StageEnum.Effect,
    name: "特效",
    order: 9,
    icon: <EffectIcon className={iconClass} />,
  },
  {
    key: StageEnum.Icon,
    name: "图标",
    order: 10,
    icon: <IconIcon className={iconClass} />,
  },
  {
    key: StageEnum.UI,
    name: "界面",
    order: 11,
    icon: <UIIcon className={iconClass} />,
  },
  {
    key: StageEnum.Animation,
    name: "动效",
    order: 12,
    icon: <AnimationIcon className={iconClass} />,
  },
];

export const INIT_NODE_X = 100;
export const INIT_NODE_Y = 100;

export const NODE_WIDTH = 244;
export const PRIMARY_NODE_HEIGHT = 180;
export const STAGE_NODE_HEIGHT = 120;
export const X_OFFSET = 60;
export const NODE_WIDTH_X_OFFSET = NODE_WIDTH + X_OFFSET;

export const Y_OFFSET = 48;
export const NODE_HEIGHT_Y_OFFSET = PRIMARY_NODE_HEIGHT + Y_OFFSET;
export const MAX_TREE_DEPTH = 50;
