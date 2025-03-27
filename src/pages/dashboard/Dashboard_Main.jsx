// import React from "react";
// import Header from "../../components/Header";
// import Aside from "../../components/Aside";
// import { GrPieChart } from "react-icons/gr";
// import LanguageIcon from "@mui/icons-material/Language";
// import DnsIcon from "@mui/icons-material/Dns";
// import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";

// // const Main = () => {
// //     const scanners = [{ icon: <LanguageIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'IpAddress' }, { icon: <DnsIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'Hostname' }, { icon: <WifiTetheringErrorIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'Ports' }]
// //     return (
// //         <>
// //             <Header />
// //             <Aside />
// //             <div className='main-container'>
// //                 <h2 className='text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]'>Dashboard</h2>
// //                 <div className="scannerBox mx-2 my-5 p-2">
// //                     <span className='flex items-center gap-2 text-[#04D2D2] font-semibold'><GrPieChart color='#04D2D2' size={22} /> Scanning Surface Summary </span>
// //                     <div className="flex justify-between flex-wrap items-cente my-3">
// //                         {scanners.map((scanner, index) => (
// //                             <div key={index} className="boxes flex justify-center gap-18 rounded-2xl items-center mb-4 bg-[#040C1F] p-5 w-[415px] h-[100px]">
// //                                 {scanner.icon}
// //                                 <span className='text-[#04D2D2] text-[55px]'>1</span>
// //                                 <span className='text-[#04D2D2] font-bold text-[25px]'>{scanner.name}</span>
// //                             </div>
// //                         ))}

// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     )
// // }

// const Dashboard_Main = () => {
//   const scanners = [
//     {
//       icon: (
//         <LanguageIcon
//           fontSize="inherit"
//           className="text-[#04D2D2]"
//           style={{ fontSize: "55px" }}
//         />
//       ),
//       name: "IpAddress",
//     },
//     {
//       icon: (
//         <DnsIcon
//           fontSize="inherit"
//           className="text-[#04D2D2]"
//           style={{ fontSize: "55px" }}
//         />
//       ),
//       name: "Hostname",
//     },
//     {
//       icon: (
//         <WifiTetheringErrorIcon
//           fontSize="inherit"
//           className="text-[#04D2D2]"
//           style={{ fontSize: "55px" }}
//         />
//       ),
//       name: "Ports",
//     },
//   ];

//   return (
//     <div className="main-container">
//       <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
//         Dashboard
//       </h2>
//       <div className="scannerBox mx-2 my-5 p-2">
//         <span className="flex items-center gap-2 text-[#04D2D2] font-semibold">
//           <GrPieChart color="#04D2D2" size={22} /> Scanning Surface Summary
//         </span>
//         <div className="flex justify-between flex-wrap items-center my-3">
//           {scanners.map((scanner, index) => (
//             <div
//               key={index}
//               className="boxes flex justify-center gap-18 rounded-2xl items-center mb-4 bg-[#040C1F] p-5 w-[415px] h-[100px]"
//             >
//               {scanner.icon}
//               <span className="text-[#04D2D2] text-[55px]">1</span>
//               <span className="text-[#04D2D2] font-bold text-[25px]">
//                 {scanner.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard_Main;


import React, { useState } from 'react';

const Dashboard_Main = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fixed data values
  const scanData = {
    scannedAssets: {
      completed: 0,
      total: 5
    },
    runningScans: {
      active: 0,
      total: 2
    }
  };

  // Calculate percentage for the circle graphs
  const scannedPercentage = (scanData.scannedAssets.completed / scanData.scannedAssets.total) * 100 || 0;
  const runningPercentage = (scanData.runningScans.active / scanData.runningScans.total) * 100 || 0;
  
  // Calculate stroke-dasharray values for SVG circles (circumference is 283 for r=45)
  const scannedDashArray = `${scannedPercentage * 2.83} 283`;
  const runningDashArray = `${runningPercentage * 2.83} 283`;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex">
            <button 
              className={`px-4 py-2 font-medium transition-colors duration-200 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 font-medium relative transition-colors duration-200 ${activeTab === 'whatsNew' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setActiveTab('whatsNew')}
            >
              What's new
              <span className="absolute top-2 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              className={`px-4 py-2 font-medium transition-colors duration-200 ${activeTab === 'help' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setActiveTab('help')}
            >
              Help
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Attack Surface Summary */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <h2 className="text-lg font-semibold text-gray-700">Attack surface summary</h2>
                </div>
                <span className="text-sm text-gray-400">Workspace overview</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '1', label: 'IP ADDRESS' },
                  { value: '1', label: 'HOSTNAME' },
                  { value: '1', label: 'PORT' },
                  { value: '1', label: 'PROTOCOL' },
                  { value: '0', label: 'SERVICES' },
                  { value: '5', label: 'TECHNOLOGIES' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center transform transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-blue-50 cursor-pointer"
                  >
                    <span className="text-4xl font-light text-blue-500 mb-2">{item.value}</span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scan Activity */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-700">Scan activity</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-6 transform transition-all duration-300 hover:shadow-md hover:scale-102 hover:bg-blue-100 cursor-pointer">
                  <div className="flex items-center mb-4">
                    <svg className="h-4 w-4 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Scanned assets</span>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#e6e6e6" 
                          strokeWidth="10" 
                        />
                        
                        {/* Progress circle - fixed at 0/5 ratio */}
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#60a5fa" 
                          strokeWidth="10" 
                          strokeLinecap="round"
                          strokeDasharray={scannedDashArray}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-light text-blue-500">{scanData.scannedAssets.completed}</span>
                        <span className="text-sm text-gray-500">/ {scanData.scannedAssets.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:scale-102 hover:bg-blue-50 cursor-pointer">
                  <div className="flex items-center mb-4">
                    <svg className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4l3 3" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Running scans</span>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#e6e6e6" 
                          strokeWidth="10" 
                        />
                        
                        {/* Progress circle - fixed at 0/2 ratio */}
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#60a5fa" 
                          strokeWidth="10" 
                          strokeLinecap="round"
                          strokeDasharray={runningDashArray}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-light text-blue-500">{scanData.runningScans.active}</span>
                        <span className="text-sm text-gray-500">/ {scanData.runningScans.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Latest Scans */}
            <div>
              <div className="flex items-center mb-4">
                <svg className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-700">Latest scans</h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 transition-colors duration-200 hover:bg-blue-50 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Network Scan</p>
                        <p className="text-sm text-gray-500">Completed 5 hours ago</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Successful
                    </div>
                  </div>
                </div>
                
                <div className="p-4 transition-colors duration-200 hover:bg-blue-50 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mr-3">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Vulnerability Scan</p>
                        <p className="text-sm text-gray-500">Completed 1 day ago</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      3 Issues Found
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'whatsNew' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">What's New</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-1 flex-shrink-0">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-700">New Feature: Enhanced Scanning Engine</p>
                  <p className="text-sm text-gray-500 mt-1">Our scanning engine has been upgraded to provide 30% faster results and improved detection rates.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 mt-1 flex-shrink-0">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-700">New Integration: SIEM Connectors</p>
                  <p className="text-sm text-gray-500 mt-1">Connect your Security Information and Event Management systems for consolidated reporting.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'help' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Help Center</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                <h4 className="font-medium text-blue-700">Getting Started Guide</h4>
                <p className="text-sm text-gray-600 mt-1">Learn the basics of setting up scans and interpreting results.</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                <h4 className="font-medium text-blue-700">Advanced Configuration</h4>
                <p className="text-sm text-gray-600 mt-1">Detailed options for customizing your scanning parameters.</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                <h4 className="font-medium text-blue-700">Troubleshooting</h4>
                <p className="text-sm text-gray-600 mt-1">Solutions for common issues and error messages.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard_Main;
