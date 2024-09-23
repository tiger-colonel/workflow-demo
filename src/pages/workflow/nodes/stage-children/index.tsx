import { FC, memo } from 'react';
import { NodeProps } from '../../types';

const Node: FC<NodeProps> = ({ data }) => {
  return (
    <>
      <div className="bg-#EAEEF3 px-12px h-28px leading-28px rounded-8px mb-12px">
        跟进策划： <span>待定</span>
      </div>
      {/* <div className="bg-#EAEEF3 px-12px h-28px leading-28px rounded-8px mb-12px">
        是否复用： <span>待定</span>
      </div>
      <div className="bg-#EAEEF3 px-12px h-28px leading-28px rounded-8px">
        需求概述： <span>待定</span>
      </div> */}
    </>
  );
};
export default memo(Node);
