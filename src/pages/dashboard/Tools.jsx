import React from 'react'
import ToolBox from '../../components/ToolBox'
import { tools } from '../../data/ToolsContainer.json'
const Tools = () => {

    return (
        <div className='main-cintainers'>
            <h2 className="text-[#04D2D2]  mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                Tools for Attacks and Scanning
                <p className='block text-[12px] font-normal opacity-85 mt-1'>Identify and fix security vulnerabilities before they become threats. Stay protected with advanced vulnerability scanning solutions!</p>
            </h2>
            <div className="flex flex-wrap mx-3">
                {
                    tools.map((tool, index) => (
                        <ToolBox key={index} title={tool.title} description={tool.description} />
                    ))
                }
            </div>
        </div>
    )
}

export default Tools
