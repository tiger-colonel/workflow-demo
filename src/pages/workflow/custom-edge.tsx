import { memo } from 'react';
import type { EdgeProps } from '@xyflow/react';
import { BaseEdge, Position, getSmoothStepPath } from '@xyflow/react';
import { NodeTypeEnum } from './types';

const CustomEdge = ({
  id,
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX: sourceX - (data?.targetType === NodeTypeEnum.Stage ? 0 : 8),
    sourceY,
    sourcePosition:
      data?.targetType === NodeTypeEnum.Stage
        ? Position.Right
        : Position.Bottom,
    targetX: targetX + (data?.targetType === NodeTypeEnum.Stage ? 0 : 2),
    targetY: targetY + (data?.targetType === NodeTypeEnum.Stage ? 4 : 0),
    targetPosition:
      data?.targetType === NodeTypeEnum.Stage ? Position.Top : Position.Left,
    borderRadius: 24,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: '#D0D5DD',
          strokeWidth: 2,
        }}
      />
    </>
  );
};

export default memo(CustomEdge);
