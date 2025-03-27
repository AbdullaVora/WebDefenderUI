// import React, { useState, useEffect } from 'react';
// import { Plus, PlayCircle, Filter, MoreVertical, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// // Mock data for the table
// const generateMockData = (count) => {
//   return Array(count).fill(0).map((_, index) => ({
//     id: index + 1,
//     name: `Scan ${index + 1}`,
//     status: ['Complete', 'Pending', 'In Progress'][Math.floor(Math.random() * 3)],
//     target: `target-${index + 1}.com`,
//     summary: `Summary for scan ${index + 1}`,
//     date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()
//   }));
// };

// const Scan = () => {
//   const [activeTab, setActiveTab] = useState('Scans');
//   const [scans, setScans] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(25);
//   const [sortColumn, setSortColumn] = useState('id');
//   const [sortDirection, setSortDirection] = useState('asc');
//   const [selectedScans, setSelectedScans] = useState([]);

//   useEffect(() => {
//     // Initialize with empty data
//     setScans([]);
//   }, []);

//   const addNewScan = () => {
//     const newScan = {
//       id: scans.length + 1,
//       name: `Scan ${scans.length + 1}`,
//       status: 'Pending',
//       target: 'example.com',
//       summary: 'Initial scan',
//       date: new Date().toLocaleDateString()
//     };
//     setScans([...scans, newScan]);
//   };

//   const handleSort = (column) => {
//     const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
//     setSortColumn(column);
//     setSortDirection(direction);

//     const sortedData = [...scans].sort((a, b) => {
//       if (direction === 'asc') {
//         return a[column] > b[column] ? 1 : -1;
//       } else {
//         return a[column] < b[column] ? 1 : -1;
//       }
//     });

//     setScans(sortedData);
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedScans(scans.map(scan => scan.id));
//     } else {
//       setSelectedScans([]);
//     }
//   };

//   const handleSelectScan = (e, scanId) => {
//     if (e.target.checked) {
//       setSelectedScans([...selectedScans, scanId]);
//     } else {
//       setSelectedScans(selectedScans.filter(id => id !== scanId));
//     }
//   };

//   return (
//     <div className="main-container">
//       {/* Main container with dark blue background */}
//       <div className=" text-white p-6">
//         <div className=" mx-auto">
//           <div className="mb-2">
//             <h1 className="text-2xl font-semibold">Scans</h1>
//             <p className="text-sm text-gray-300">Showing all scans from the current workspace.</p>
//           </div>

//           <div className="flex justify-between items-center mb-6">
//             <button
//               onClick={addNewScan}
//               className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
//             >
//               <Plus size={18} className="text-white" />
//               <span className="text-white font-medium">New scan</span>
//             </button>

//             <button className="flex items-center gap-2 text-gray-300 hover:text-white">
//               <PlayCircle size={18} />
//               <span>How to generate a scan report</span>
//             </button>
//           </div>

//           <div className="bg-[#00334d] rounded-lg shadow">
//             {/* Tabs */}
//             <div className="flex border-b border-gray-700">
//               <button
//                 className={`px-6 py-3 font-medium ${activeTab === 'Scans' ? 'text-[#00cccc] border-b-2 border-[#00cccc]' : 'text-gray-300'}`}
//                 onClick={() => setActiveTab('Scans')}
//               >
//                 Scans
//               </button>
//               <button
//                 className={`px-6 py-3 font-medium ${activeTab === 'Scheduled' ? 'text-[#00cccc] border-b-2 border-[#00cccc]' : 'text-gray-300'}`}
//                 onClick={() => setActiveTab('Scheduled')}
//               >
//                 Scheduled
//               </button>
//             </div>

//             {/* Table header */}
//             <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
//               <div></div>
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-gray-300">Filters off</span>
//                 <button className="p-1 hover:bg-gray-700 rounded">
//                   <Filter size={18} className="text-gray-300" />
//                 </button>
//                 <button className="p-1 hover:bg-gray-700 rounded">
//                   <MoreVertical size={18} className="text-gray-300" />
//                 </button>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-left text-gray-300 border-b border-gray-700">
//                     <th className="px-4 py-3 w-10">
//                       <input
//                         type="checkbox"
//                         className="rounded bg-gray-700"
//                         onChange={handleSelectAll}
//                         checked={selectedScans.length === scans.length && scans.length > 0}
//                       />
//                     </th>
//                     <th
//                       className="px-4 py-3 font-medium cursor-pointer"
//                       onClick={() => handleSort('name')}
//                     >
//                       Scans ({scans.length})
//                       {sortColumn === 'name' && (
//                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                     <th
//                       className="px-4 py-3 font-medium cursor-pointer"
//                       onClick={() => handleSort('status')}
//                     >
//                       Status
//                       {sortColumn === 'status' && (
//                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                     <th
//                       className="px-4 py-3 font-medium cursor-pointer"
//                       onClick={() => handleSort('target')}
//                     >
//                       Target
//                       {sortColumn === 'target' && (
//                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                     <th
//                       className="px-4 py-3 font-medium cursor-pointer"
//                       onClick={() => handleSort('summary')}
//                     >
//                       Summary
//                       {sortColumn === 'summary' && (
//                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                     <th
//                       className="px-4 py-3 font-medium cursor-pointer"
//                       onClick={() => handleSort('date')}
//                     >
//                       Date
//                       {sortColumn === 'date' && (
//                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {scans.length > 0 ? (
//                     scans.map(scan => (
//                       <tr key={scan.id} className="border-b border-gray-700 hover:bg-gray-800">
//                         <td className="px-4 py-3">
//                           <input
//                             type="checkbox"
//                             className="rounded bg-gray-700"
//                             checked={selectedScans.includes(scan.id)}
//                             onChange={(e) => handleSelectScan(e, scan.id)}
//                           />
//                         </td>
//                         <td className="px-4 py-3 font-medium text-white">{scan.name}</td>
//                         <td className="px-4 py-3">
//                           <span className={`px-2 py-1 rounded-full text-xs
//                             ${scan.status === 'Complete' ? 'bg-green-900 text-green-300' :
//                               scan.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
//                                 'bg-blue-900 text-blue-300'}`}>
//                             {scan.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-gray-300">{scan.target}</td>
//                         <td className="px-4 py-3 text-gray-300">{scan.summary}</td>
//                         <td className="px-4 py-3 text-gray-300">{scan.date}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="text-center py-16 text-gray-300">
//                         You don't have any scans yet.
//                         <div className="mt-4 flex justify-center">
//                           <button
//                             onClick={addNewScan}
//                             className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md mx-auto"
//                           >
//                             <Plus size={18} className="text-white" />
//                             <span className="text-white font-medium">New scan</span>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700">
//               <div className="flex items-center gap-2 text-sm text-gray-300">
//                 <span>Displaying</span>
//                 <div className="relative">
//                   <select
//                     value={itemsPerPage}
//                     onChange={(e) => setItemsPerPage(Number(e.target.value))}
//                     className="appearance-none bg-gray-700 border border-gray-600 rounded px-3 py-1 pr-8 text-white"
//                   >
//                     <option value="10">10</option>
//                     <option value="25">25</option>
//                     <option value="50">50</option>
//                     <option value="100">100</option>
//                   </select>
//                   <ChevronDown size={14} className="absolute right-2 top-2 text-gray-400" />
//                 </div>
//                 <span>in page</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button className="px-3 py-1 border border-gray-600 rounded text-gray-300 hover:bg-gray-700">
//                   <ChevronLeft size={16} />
//                 </button>
//                 <button className="px-3 py-1 bg-[#00cccc] text-white rounded">1</button>
//                 <button className="px-3 py-1 border border-gray-600 rounded text-gray-300 hover:bg-gray-700">
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scan;

import React, { useState, useEffect } from "react";
import {
  Plus,
  PlayCircle,
  Filter,
  MoreVertical,
  ChevronDown,
  X,
} from "lucide-react";
import DataTable from "react-data-table-component";
import {Link} from "react-router-dom"

const Scan = () => {
  const [activeTab, setActiveTab] = useState("Scans");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    target: "",
    date: "",
  });

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

  const fetchData = () => {
    setLoading(true);

    // Mock API call
    const mockData = Array.from({ length: perPage }, (_, i) => ({
      id: (currentPage - 1) * perPage + i + 1,
      name: `Scan ${(currentPage - 1) * perPage + i + 1}`,
      status: ["Complete", "Pending", "In Progress"][
        Math.floor(Math.random() * 3)
      ],
      target: `target-${(currentPage - 1) * perPage + i + 1}.com`,
      summary: `Summary for scan ${(currentPage - 1) * perPage + i + 1}`,
      date: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toLocaleDateString(),
    }));

    setData(mockData);
    setTotalRows(100); // Mock total count
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const addNewScan = () => {
    const newScan = {
      id: data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1,
      name: `Scan ${data.length + 1}`,
      status: "Pending",
      target: "example.com",
      summary: "Initial scan",
      date: new Date().toLocaleDateString(),
    };
    setData([newScan, ...data]);
    setTotalRows(totalRows + 1);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchData();
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      target: "",
      date: "",
    });
  };

  const columns = [
    {
      name: "Scans",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs 
          ${
            row.status === "Complete"
              ? "bg-green-900 text-green-300"
              : row.status === "Pending"
              ? "bg-yellow-900 text-yellow-300"
              : "bg-blue-900 text-blue-300"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Target",
      selector: (row) => row.target,
      sortable: true,
    },
    {
      name: "Summary",
      selector: (row) => row.summary,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: "#00334d",
      },
    },
    header: {
      style: {
        backgroundColor: "#00334d",
        color: "white",
      },
    },
    subHeader: {
      style: {
        backgroundColor: "#00334d",
        color: "white",
        borderBottomColor: "#1e2a3a",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#00334d",
        borderBottomColor: "#1e2a3a",
        color: "white",
      },
    },
    headCells: {
      style: {
        color: "#e0e0e0",
        fontSize: "14px",
        fontWeight: 500,
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        color: "#e0e0e0",
        paddingLeft: "16px",
        paddingRight: "16px",
        backgroundColor: "#00334d",
      },
    },
    rows: {
      style: {
        backgroundColor: "#00334d",
        color: "white",
        borderBottomColor: "#1e2a3a",
        "&:hover": {
          backgroundColor: "#004466",
          cursor: "pointer",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#00334d",
        color: "white",
        borderTopColor: "#1e2a3a",
      },
      pageButtonsStyle: {
        color: "white",
        fill: "white",
      },
    },
    noData: {
      style: {
        backgroundColor: "#00334d",
        color: "white",
      },
    },
  };

  return (
    <div className="min-h-screen main-container bg-[#002233] text-white p-6">
      <div className="">
        <div className="mb-2">
          <h1 className="text-2xl font-semibold">Scans</h1>
          <p className="text-sm text-gray-300">
            Showing all scans from the current workspace.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Link to={`/new-scan`}>
            <button
              // onClick={addNewScan}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
            >
              <Plus size={18} className="text-white" />
              <span className="text-white font-medium">New scan</span>
            </button>
          </Link>
          <button className="flex items-center gap-2 text-gray-300 hover:text-white">
            <PlayCircle size={18} />
            <span>How to generate a scan report</span>
          </button>
        </div>

        <div className="bg-[#00334d] rounded-lg shadow">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "Scans"
                  ? "text-[#00cccc] border-b-2 border-[#00cccc]"
                  : "text-gray-300"
              }`}
              onClick={() => setActiveTab("Scans")}
            >
              Scans
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "Scheduled"
                  ? "text-[#00cccc] border-b-2 border-[#00cccc]"
                  : "text-gray-300"
              }`}
              onClick={() => setActiveTab("Scheduled")}
            >
              Scheduled
            </button>
          </div>

          {/* Filter/Action Bar */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
            <div></div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300">
                Filters{" "}
                {Object.values(filters).some((f) => f !== "") ? "on" : "off"}
              </span>
              <button
                className="p-1 hover:bg-gray-700 rounded"
                onClick={() => setShowFilters(true)}
              >
                <Filter size={18} className="text-gray-300" />
              </button>
              <button className="p-1 hover:bg-gray-700 rounded">
                <MoreVertical size={18} className="text-gray-300" />
              </button>
            </div>
          </div>

          {/* DataTable */}
          <div>
            <DataTable
              columns={columns}
              data={data}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              customStyles={customStyles}
              noDataComponent={
                <div className="py-16 text-center">
                  <p className="text-gray-300 mb-4">
                    You don't have any scans yet.
                  </p>
                  <button
                    onClick={addNewScan}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md mx-auto"
                  >
                    <Plus size={18} className="text-white" />
                    <span className="text-white font-medium">New scan</span>
                  </button>
                </div>
              }
              selectableRows
            />
          </div>
        </div>
      </div>

      {/* Filter Offcanvas */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-[#00334d] shadow-lg transform ${
          showFilters ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
            <h3 className="text-lg font-medium">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Target
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                placeholder="Filter by target"
                value={filters.target}
                onChange={(e) =>
                  setFilters({ ...filters, target: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
            </div>

            <div className="pt-4 flex space-x-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-600 rounded text-white hover:bg-gray-700"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-[#00cccc] text-white rounded hover:bg-[#00aaaa]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when filter is open */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setShowFilters(false)}
        ></div>
      )}
    </div>
  );
};

export default Scan;
