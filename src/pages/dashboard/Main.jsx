import React from "react";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
import { GrPieChart } from "react-icons/gr";
import LanguageIcon from "@mui/icons-material/Language";
import DnsIcon from "@mui/icons-material/Dns";
import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";

// const Main = () => {
//     const scanners = [{ icon: <LanguageIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'IpAddress' }, { icon: <DnsIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'Hostname' }, { icon: <WifiTetheringErrorIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'Ports' }]
//     return (
//         <>
//             <Header />
//             <Aside />
//             <div className='main-container'>
//                 <h2 className='text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]'>Dashboard</h2>
//                 <div className="scannerBox mx-2 my-5 p-2">
//                     <span className='flex items-center gap-2 text-[#04D2D2] font-semibold'><GrPieChart color='#04D2D2' size={22} /> Scanning Surface Summary </span>
//                     <div className="flex justify-between flex-wrap items-cente my-3">
//                         {scanners.map((scanner, index) => (
//                             <div key={index} className="boxes flex justify-center gap-18 rounded-2xl items-center mb-4 bg-[#040C1F] p-5 w-[415px] h-[100px]">
//                                 {scanner.icon}
//                                 <span className='text-[#04D2D2] text-[55px]'>1</span>
//                                 <span className='text-[#04D2D2] font-bold text-[25px]'>{scanner.name}</span>
//                             </div>
//                         ))}

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

const Main = () => {
  const scanners = [
    {
      icon: (
        <LanguageIcon
          fontSize="inherit"
          className="text-[#04D2D2]"
          style={{ fontSize: "55px" }}
        />
      ),
      name: "IpAddress",
    },
    {
      icon: (
        <DnsIcon
          fontSize="inherit"
          className="text-[#04D2D2]"
          style={{ fontSize: "55px" }}
        />
      ),
      name: "Hostname",
    },
    {
      icon: (
        <WifiTetheringErrorIcon
          fontSize="inherit"
          className="text-[#04D2D2]"
          style={{ fontSize: "55px" }}
        />
      ),
      name: "Ports",
    },
  ];

  return (
    <div className="main-container">
      <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
        Dashboard
      </h2>
      <div className="scannerBox mx-2 my-5 p-2">
        <span className="flex items-center gap-2 text-[#04D2D2] font-semibold">
          <GrPieChart color="#04D2D2" size={22} /> Scanning Surface Summary
        </span>
        <div className="flex justify-between flex-wrap items-center my-3">
          {scanners.map((scanner, index) => (
            <div
              key={index}
              className="boxes flex justify-center gap-18 rounded-2xl items-center mb-4 bg-[#040C1F] p-5 w-[415px] h-[100px]"
            >
              {scanner.icon}
              <span className="text-[#04D2D2] text-[55px]">1</span>
              <span className="text-[#04D2D2] font-bold text-[25px]">
                {scanner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
