import cn from 'classnames';
import styles from './style.module.css';
import { Flex } from 'antd';
import { NodeSourceHandle, NodeTargetHandle } from '../handle';
import { cloneElement, ReactElement } from 'react';
import { NodeProps, NodeTypeEnum } from '../../types';
import { STAGE_LIST } from '../../constants';

type BaseNodeProps = {
  children: ReactElement;
} & NodeProps;

export default function BaseNode({ id, data, children }: BaseNodeProps) {
  const showSelectedBorder = data.selected;
  return (
    <Flex
      className={cn(styles.node, showSelectedBorder && styles['node-selected'])}
      style={{
        width: data?.width || 'auto',
        height: data?.height || 'auto',
      }}
    >
      <div
        className={cn(
          styles['content-wrapper'],
          'group relative',
          'rounded-15px',
          'bg-#FCFCFD',
          'w-240px',
          'hover:shadow-lg',
        )}
      >
        <Flex align="center" className="w-full p-12px font-600">
          {data.type === NodeTypeEnum.Primary ? (
            <div className="text-12px basis-20px h-20px bg-#282840 text-white rounded-5px mr-6px text-center">
              {`A${data.order}`}
            </div>
          ) : (
            STAGE_LIST.find((item) => item.key === data.stage)?.icon
          )}

          <div className="text-16px flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
            {data.title}
          </div>
        </Flex>

        <div className="px-12px text-12px pb-12px">
          {cloneElement(children, { id, data })}
        </div>

        {/* Right */}

        {data.type === NodeTypeEnum.Primary ? (
          <NodeSourceHandle
            id={id}
            data={data}
            handleClassName="!top-4 !-right-[9px] !translate-y-0"
            handleId="source"
          />
        ) : null}

        {data.type === NodeTypeEnum.Stage ? (
          <>
            {/* top */}
            <NodeTargetHandle
              id={id}
              data={data}
              handleClassName="!left-4 !-top-[9px] !translate-y-0"
              afterSizeClass="after:w-14px after:h-6px after:left-1px"
              handleId="target"
            />
            {/* bottom */}
            <NodeSourceHandle
              id={id}
              data={data}
              handleClassName="!left-4 !top-auto !-bottom-9px  !translate-y-0"
              handleId="source"
            />
          </>
        ) : null}

        {data.type === NodeTypeEnum.StageChild ? (
          <>
            {/* top */}
            <NodeTargetHandle
              id={id}
              data={data}
              handleClassName=" !translate-y-0"
              afterSizeClass="after:w-6px after:h-14px after:left-0px"
              handleId="target"
            />
            {/* bottom */}
            {/* <NodeSourceHandle
              id={id}
              data={data}
              handleClassName="!left-4 !top-auto !-bottom-9px  !translate-y-0"
              handleId="source"
            /> */}
          </>
        ) : null}
      </div>
    </Flex>
  );
}
