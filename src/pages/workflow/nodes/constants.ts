import { ComponentType } from 'react';
import { NodeTypeEnum } from '../types';
import PrimaryNode from './primary';
import StageNode from './stage';
import StageChildNode from './stage-children';

export const NodeComponentMap: Record<string, ComponentType<any>> = {
  [NodeTypeEnum.Primary]: PrimaryNode,
  [NodeTypeEnum.Stage]: StageNode,
  [NodeTypeEnum.StageChild]: StageChildNode,
};
