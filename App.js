import React from 'react';
import TagView from './Components/TagView';

const App = () => {
  const tree = {
    name: 'root',
    children: [
      {
        name: 'child1',
        children: [
          { name: 'child1-child1', data: 'c1-c1 Hello' },
          { name: 'child1-child2', data: 'c1-c2 JS' },
        ],
      },
      { name: 'child2', data: 'c2 World' },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mb-4">Nested Tags Tree</h1>
      <TagView tree={tree} />
    </div>
  );
};

export default App;
