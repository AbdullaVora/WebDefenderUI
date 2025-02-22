import React from 'react';
import { useParams } from 'react-router-dom';
import { tools } from '../../../data/ToolsContainer.json';

const SubTools = () => {
  const { toolTitle } = useParams();

  // Find the tool data based on the title parameter
  const toolData = tools.find(tool => tool.title === toolTitle);

  return (
    <div className='main-cintainers'>
      <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
        {toolTitle} Subtools
        <p className='block text-[12px] font-normal opacity-85 mt-1'>
          {toolData 
            ? toolData.description 
            : 'No additional subtools information available for this tool.'}
        </p>
      </h2>
      <div className="flex flex-wrap mx-3">
        {/* Render subtools content here. If your toolData has a subtools array, you can map over it */}
        {toolData && toolData.subtools ? (
          toolData.subtools.map((subtool, index) => (
            <div key={index} className="box w-[32%] mx-2 mb-4 rounded-xl border-2 border-[#4C566A] p-4 bg-[#040C1F] text-white">
              <h3 className="text-lg font-semibold text-[#04D2D2]">{subtool.title}</h3>
              <p className="text-[12px] text-[#04D2D2]">{subtool.description}</p>
            </div>
          ))
        ) : (
          <p>No subtools available.</p>
        )}
      </div>
    </div>
  );
};

export default SubTools;
