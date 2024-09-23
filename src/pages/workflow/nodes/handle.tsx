import { memo, useCallback, useState } from "react";
import type { MouseEvent } from "react";
import { Node, NodeTypeEnum, StageEnum } from "../types";
import { useNodesInteractions } from "../hooks";
import { Handle, Position } from "@xyflow/react";
import BlockSelector from "../block-selector";

type NodeHandleProps = {
  handleId: string;
  afterSizeClass?: string;
  handleClassName?: string;
  nodeSelectorClassName?: string;
} & Pick<Node, "id" | "data">;

export const NodeTargetHandle = memo(
  ({
    id,
    data,
    handleId,
    handleClassName,
    afterSizeClass,
  }: NodeHandleProps) => {
    return (
      <>
        <Handle
          id={handleId}
          type="target"
          position={
            data.type === NodeTypeEnum.Stage ? Position.Top : Position.Left
          }
          className={`
            !w-4 !h-4 !bg-transparent !rounded-none !outline-none !border-none z-1
            after:absolute after:top-2px after:bg-#1677FF after:rounded-3px
            ${afterSizeClass}
            after:inline-block after:content-empty
            hover:scale-125 transition-all
            ${handleClassName}
          `}
          isConnectable={true}
        ></Handle>
      </>
    );
  }
);

export const NodeSourceHandle = memo(
  ({
    id,
    data,
    handleId,
    handleClassName,
    nodeSelectorClassName,
  }: NodeHandleProps) => {
    const [open, setOpen] = useState(false);

    const { handleNodeAdd } = useNodesInteractions();
    const handleOpenChange = useCallback((v: boolean) => {
      setOpen(v);
    }, []);
    // primary 节点 可以添加 stage 节点, stage 添加 stageChild 节点
    const handleHandleClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (data.type === NodeTypeEnum.Primary) {
        setOpen((v) => !v);
      } else {
        handleNodeAdd(
          { prevNodeId: id },
          { nodeType: NodeTypeEnum.StageChild, stage: data.stage }
        );
      }
    };

    const handleSelect = useCallback(
      (type: StageEnum) => {
        handleNodeAdd(
          { prevNodeId: id, prevNodeSourceHandle: handleId },
          {
            nodeType: NodeTypeEnum.Stage,
            stage: type,
          }
        );
      },
      [handleNodeAdd, id, handleId]
    );

    return (
      <>
        <Handle
          id={handleId}
          type="source"
          position={Position.Right}
          className={`
          !w-4 !h-4 !bg-transparent !rounded-none !outline-none !border-none z-[1]
          after:absolute after:w-2 after:h-0.5 after:right-1.5 after:top-1 after:bg-#1677FF
          after:content-empty after:inline-block
          hover:scale-125 transition-all
          ${handleClassName}
        `}
          isConnectable={true}
          onClick={handleHandleClick}
        >
          <BlockSelector
            open={open}
            onOpenChange={handleOpenChange}
            onSelect={handleSelect}
            existStages={data.existStages}
            asChild
            triggerClassName={(open) => `
                hidden absolute top-0 left-0 pointer-events-none 
                ${nodeSelectorClassName}
                group-hover:!flex
                ${data.selected && "!flex"}
                ${open && "!flex"}
              `}
          />
        </Handle>
      </>
    );
  }
);
