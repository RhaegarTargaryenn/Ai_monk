import React, { useState } from 'react';
import TreeNode from './TreeNode';

const TagView = ({ tree }) => {
  const [treeData, setTreeData] = useState(tree);
  const [exportClicked, setExportClicked] = useState(false);
  const [exportData, setExportData] = useState(JSON.stringify(tree, null, 2));

  const handleNodeClick = (nodeName) => {
    const updatedData = toggleNodeCollapse(treeData, nodeName);
    setTreeData(updatedData);
  };

  const toggleNodeCollapse = (node, nodeName) => {
    if (node.name === nodeName) {
      node.collapsed = !node.collapsed;
      return { ...node };
    }

    if (node.children) {
      return {
        ...node,
        children: node.children.map((child) =>
          toggleNodeCollapse(child, nodeName)
        ),
      };
    }

    return node;
  };

  const handleAddChild = (nodeName) => {
    const updatedData = addChildNode(treeData, nodeName);
    setTreeData(updatedData);
  };

  const addChildNode = (node, nodeName) => {
    if (node.name === nodeName) {
      if (!node.children) {
        node.children = [];
      }
      const newChild = { name: 'New Child', data: 'Data' };
      if (node.data !== undefined) {
        delete node.data;
        delete node.children;
      }
      node.children.push(newChild);
      return { ...node };
    }

    if (node.children) {
      return {
        ...node,
        children: node.children.map((child) => addChildNode(child, nodeName)),
      };
    }

    return node;
  };

  const handleExportClick = () => {
    setExportData(JSON.stringify(treeData, null, 2));
    setExportClicked(!exportClicked);
  };

  const handleNameChange = (nodeName, newName) => {
    const updatedData = changeTagName(treeData, nodeName, newName);
    setTreeData(updatedData);
  };

  const changeTagName = (node, nodeName, newName) => {
    if (node.name === nodeName) {
      node.name = newName;
      return { ...node };
    }

    if (node.children) {
      return {
        ...node,
        children: node.children.map((child) =>
          changeTagName(child, nodeName, newName)
        ),
      };
    }

    return node;
  };

  return (
    <div className="tag-view border flex flex-col justify-center border-black w-full items-center">
      <TreeNode
        node={treeData}
        onNodeClick={handleNodeClick}
        onAddChild={handleAddChild}
        onTagNameChange={handleNameChange}
      />
      <button className="bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold" onClick={handleExportClick}>
        Export
      </button>
      {exportClicked && (
        <div>
          <textarea
            className="json-textarea border w-[100vw] h-[100vh] border-gray-300 px-2 py-1 mt-4"
            value={exportData}
            readOnly
          />
          <button className="export-button mt-2" onClick={handleExportClick}>
            Export Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TagView;
