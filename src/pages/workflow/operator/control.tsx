import { memo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useNodesInteractions } from '../hooks';
import { NodeTypeEnum } from '../types';
const Control = () => {
  const { handleNodeAdd } = useNodesInteractions();

  return (
    <div className="flex items-center p-0.5 rounded-lg border-[0.5px] border-gray-100 bg-white shadow-lg text-gray-500">
      <div
        className="flex items-center justify-center px-12px py-4px w-full h-full rounded-lg hover:bg-[rgba(0,0,0,.05)] hover:text-gray-700 cursor-pointer"
        onClick={() => handleNodeAdd({}, { nodeType: NodeTypeEnum.Primary })}
      >
        添加节点
        <PlusOutlined className="w-4 h-4" />
      </div>
    </div>
  );
};

export default memo(Control);
