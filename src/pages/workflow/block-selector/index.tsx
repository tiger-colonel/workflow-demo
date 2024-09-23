import type { FC, MouseEventHandler } from 'react';
import { memo, useCallback, useState } from 'react';
import type { OffsetOptions, Placement } from '@floating-ui/react';
import { PlusOutlined } from '@ant-design/icons';

import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '../components/portal-to-follow-elem';
import { StageEnum } from '../types';
import { Flex } from 'antd';
import { STAGE_LIST } from '../constants';

type NodeSelectorProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect: (type: StageEnum) => void;
  existStages?: string[];
  placement?: Placement;
  offset?: OffsetOptions;
  triggerStyle?: React.CSSProperties;
  triggerClassName?: (open: boolean) => string;
  popupClassName?: string;
  asChild?: boolean;
  disabled?: boolean;
  noBlocks?: boolean;
};

const NodeSelector: FC<NodeSelectorProps> = ({
  open: openFromProps,
  onOpenChange,
  onSelect,
  existStages,
  placement = 'right',
  offset = 6,
  triggerClassName,
  triggerStyle,
  popupClassName,
  asChild,
  disabled,
}) => {
  const [localOpen, setLocalOpen] = useState(false);
  const open = openFromProps === undefined ? localOpen : openFromProps;
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setLocalOpen(newOpen);

      if (onOpenChange) onOpenChange(newOpen);
    },
    [onOpenChange],
  );
  const handleTrigger = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (disabled) return;
      e.stopPropagation();
      handleOpenChange(!open);
    },
    [handleOpenChange, open, disabled],
  );

  const handleSelect = useCallback(
    (type) => {
      handleOpenChange(false);
      onSelect(type);
    },
    [handleOpenChange, onSelect],
  );

  return (
    <PortalToFollowElem
      placement={placement}
      offset={offset}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <PortalToFollowElemTrigger asChild={asChild} onClick={handleTrigger}>
        <div
          className={`
            flex items-center justify-center 
            w-4 h-4 rounded-full bg-primary cursor-pointer z-10
            ${triggerClassName?.(open)}
          `}
          style={triggerStyle}
        >
          <PlusOutlined
            style={{ fontWeight: 'bold' }}
            className="font-bold w-2.5 h-2.5 text-white"
          />
        </div>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent className="z-[1000]">
        <div className={`rounded-12px border bg-white ${popupClassName}`}>
          <div className="px-8px py-8px">
            <Flex
              wrap
              className="w-226px"
              gap="6px 6px"
              onClick={(e) => e.stopPropagation()}
            >
              {STAGE_LIST.map((item) => {
                return (
                  <Flex
                    key={item.key}
                    align="center"
                    className={`basis-[calc(50%-3px)] h-36px rounded-12px bg-#F5F7F9 px-10px text-14px cursor-pointer  hover:bg-#E3E8ED ${existStages?.includes(item.key) && 'text-gray-500 cursor-not-allowed'}`}
                    onClick={() => {
                      if (existStages?.includes(item.key)) return;
                      handleSelect(item.key);
                    }}
                  >
                    {item.icon}
                    {item.name}
                  </Flex>
                );
              })}
            </Flex>
          </div>
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  );
};

export default memo(NodeSelector);
