import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToolBox = ({ title, description, subtool }) => {
  const navigate = useNavigate();

  const onNavigate = () => {
    if (subtool === 'true') {
      // Navigate to the dynamic subtools route with the tool title as a parameter
      navigate(`/tools/${decodeURI(title).replace(/\s+/g, '')}`);
    } else {
      navigate(`/tools/${decodeURI(title).replace(/\s+/g, '')}/scan`);
    }
  }

  return (
    <div className='box w-[32%] mx-2 mb-4 rounded-xl border-[#4C566A] h-[260px] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white'>
      <div className="flex flex-col h-full p-4">
        <div className="logo mb-4">
          <img width="78" height="78" src="https://img.icons8.com/external-others-papa-vector/78/external-XSS-hacker-attack-others-papa-vector.png" alt="Tool icon" />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-[#04D2D2]">{title}</h3>
          <p className='block text-[12px] text-[#04D2D2] font-normal opacity-65 mt-1'>{description}</p>
        </div>
        <div className="flex justify-end">
          <button onClick={onNavigate} className="bg-[#04D2D2] text-[#2E3440] px-5 font-bold cursor-pointer py-2 rounded-md hover:bg-[#03B9B9] transition-all">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolBox;
