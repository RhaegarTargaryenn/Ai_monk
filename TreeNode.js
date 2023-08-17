import React from 'react';
import EditableTag from './EditableTag';
import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi';

const TreeNode = ({ node, onNodeClick, onAddChild }) => {
  return (
    <div className="tree-node flex flex-col w-full mx-7">
      <div className="flex items-center ">
        <button
          className="collapse-button"
          onClick={() => onNodeClick(node.name)}
        >
          {node.collapsed ? <BiSolidRightArrow /> : <BiSolidDownArrow />}
        </button>
        <EditableTag tagName={node.name} onDataChange={onNodeClick} />
      </div>
      {!node.collapsed && (
        <div className="children">
          {node.children &&
            node.children.map((child) => (
              <TreeNode
                key={child.name}
                node={child}
                onNodeClick={onNodeClick}
                onAddChild={onAddChild}
              />
            ))}
          {node.children === undefined && (
            <div className="">
              <input
                className="border border-black px-2 py-1 rounded"
                type="text"
                value={node.data}
                onChange={(e) => {
                  node.data = e.target.value;
                  onNodeClick(node.name);
                }}
              />
            </div>
          )}
          {node.name !== 'root' && (
            <button
              className="px-5 py-2 bg-red-500 text-white mt-2"
              onClick={() => onAddChild(node.name)}
            >
              Add Child
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
