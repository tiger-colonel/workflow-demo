import { memo } from 'react';
import BaseNode from './base';
import { NodeComponentMap } from './constants';
import { NodeProps } from '../types';

const CustomNode = (props: NodeProps) => {
  const nodeData = props.data;
  const NodeComponent = NodeComponentMap[nodeData.type];

  return (
    <>
      <BaseNode {...props}>
        <NodeComponent />
      </BaseNode>
    </>
  );
};

export default memo(CustomNode);
