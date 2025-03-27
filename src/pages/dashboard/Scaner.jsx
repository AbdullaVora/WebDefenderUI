// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchResult, scanStart } from "../../store/slices/toolsSlice";
// import Result_Table from "../../components/Result_Table";
// import Custom_Selection from "../../components/Custom_Selection";

// const Scaner = () => {
//     const dispatch = useDispatch();
//     const { scanResults, status } = useSelector((state) => state.tools);
//     console.log("scanResults: ", scanResults);

//     const location = useLocation();
//     const cleanedPath = location.pathname.replace(/^\/tools\//, "").split("/scan")[0];

//     const [data, setData] = useState([]);
//     const [targetUrl, setTargetUrl] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [toggleBtn, setToggleBtn] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const [filterText, setFilterText] = useState("");
//     const [sortCriteria, setSortCriteria] = useState("domain"); // Default sorting criteria
//     const [enabled, setEnabled] = useState(false);



//     useEffect(() => {
//         let interval;
//         if (isLoading) {
//             setProgress(0);
//             interval = setInterval(() => {
//                 setProgress((prev) => (prev < 100 ? prev + 10 : 100));
//             }, 1000);
//         } else {
//             clearInterval(interval);
//             setProgress(100);
//         }
//         return () => clearInterval(interval);
//     }, [isLoading]);

//     useEffect(() => {
//         setData(scanResults);
//     }, [scanResults])

//     useEffect(() => {
//         setData([]);
//         setTargetUrl("");
//         setProgress(0);
//         setToggleBtn(false);
//         setIsLoading(false);
//     }, [location.pathname])

//     const handleStartScan = () => {
//         if (!targetUrl.trim()) return;

//         setIsLoading(true);
//         setToggleBtn(true);
//         setProgress(0);

//         dispatch(scanStart({ domain: targetUrl, path: cleanedPath })).then((response) => {
//             if (response.payload?.status === 200) {
//                 setIsLoading(false);
//                 setToggleBtn(false);
//                 console.log("Scan completed successfully.");
//             } else {
//                 // If status is not 200, stop loading immediately
//                 setIsLoading(false);
//                 setToggleBtn(false);
//                 console.error("Error: Invalid response status", response.payload?.status);
//             }
//         }).catch((error) => {
//             // Handle any errors during subDomainUrl dispatch
//             setIsLoading(false);
//             setToggleBtn(false);
//             console.error("Error in subDomainUrl request:", error);
//         });

//     };

//     const handleStopScan = () => {
//         setIsLoading(false);
//         setToggleBtn(false);
//         setProgress(0);
//         dispatch({ type: "tools/addLog", payload: "Scan stopped by user." });
//     };

//     const handleClearAll = () => {
//         setTargetUrl(""); // Clear input field
//         setProgress(0);   // Reset progress bar
//         setToggleBtn(false); // Reset button state
//         setIsLoading(false); // Stop loading state
//         setData([]); // Clear scan results  
//     };

//     const handleSortChange = (e) => {
//         setSortCriteria(e.target.value);
//     };


//     // const filteredResults = data.flatMap((scan) =>
//     //     scan.subdomains
//     //         .filter((subdomain) => subdomain.includes(filterText))
//     //         .map((subdomain) => {
//     //             const liveSub = scan.live_subdomains.find((live) => live.subdomain === subdomain);
//     //             return {
//     //                 domain: scan.domain,
//     //                 subdomain,
//     //                 ip: liveSub ? liveSub.ip : "--",
//     //                 status: liveSub ? "200" : "404",
//     //             };
//     //         })
//     // );

//     const filteredResults = data.flatMap((scan) => {
//         if (scan.subdomains) {
//             // Subdomain scan filtering
//             return scan.subdomains
//                 .filter((subdomain) => subdomain.includes(filterText))
//                 .map((subdomain) => {
//                     const liveSub = scan.live_subdomains?.find((live) => live.subdomain === subdomain);
//                     return {
//                         type: "subdomain",
//                         domain: scan.domain,
//                         subdomain,
//                         ip: liveSub ? liveSub.ip : "--",
//                         status: liveSub ? "200" : "404",
//                     };
//                 });
//         } else if (scan.vulnerable_parameters) {
//             // SQL injection scan filtering
//             return scan.vulnerable_parameters
//                 .filter((param) => param.includes(filterText)) // Apply filter on parameters
//                 .map((param, index) => ({
//                     type: "sql_injection",
//                     url: scan.url,
//                     parameter: param,
//                     payload: scan.payloads[index] || "N/A",
//                     databases: scan.databases || [],
//                 }));
//         }
//         return [];
//     });

//     // Sorting logic
//     const sortedResults = filteredResults.sort((a, b) => {
//         if (sortCriteria === "domain" && a.domain && b.domain) {
//             return a.domain.localeCompare(b.domain);
//         } else if (sortCriteria === "subdomain" && a.subdomain && b.subdomain) {
//             return a.subdomain.localeCompare(b.subdomain);
//         } else if (sortCriteria === "ip" && a.ip && b.ip) {
//             return a.ip.localeCompare(b.ip);
//         } else if (sortCriteria === "status" && a.status && b.status) {
//             return a.status.localeCompare(b.status);
//         } else if (sortCriteria === "parameter" && a.parameter && b.parameter) {
//             return a.parameter.localeCompare(b.parameter);
//         } else if (sortCriteria === "url" && a.url && b.url) {
//             return a.url.localeCompare(b.url);
//         }
//         return 0;
//     });

//     // Sorting logic
//     // const sortedResults = filteredResults.sort((a, b) => {
//     //     if (sortCriteria === "domain") {
//     //         return a.domain.localeCompare(b.domain);
//     //     } else if (sortCriteria === "subdomain") {
//     //         return a.subdomain.localeCompare(b.subdomain);
//     //     } else if (sortCriteria === "ip") {
//     //         return a.ip.localeCompare(b.ip);
//     //     } else if (sortCriteria === "status") {
//     //         return a.status.localeCompare(b.status);
//     //     }
//     //     return 0;
//     // });

//     const processLogs = (rawLogs) => {
//         return rawLogs.map((log) => {
//             const timestampMatch = log.match(/\[(\d{2}:\d{2}:\d{2})\]/); // Extracts [15:52:51]
//             const dateMatch = log.match(/\/(\d{4}-\d{2}-\d{2})\//); // Extracts /2025-03-08/

//             const timestamp = timestampMatch ? timestampMatch[1] : "00:00:00";
//             const date = dateMatch ? dateMatch[1] : new Date().toISOString().split("T")[0]; // Default to today

//             const event = log.includes("[INFO]") ? "INFO" : log.includes("[WARNING]") ? "WARNING" : "LOG";
//             const details = log.replace(/\[.*?\]/g, "").trim(); // Remove brackets from log message

//             return { timestamp: `${date} ${timestamp}`, event, details };
//         });
//     };


//     // Extract logs from scanResults
//     const scanLogs = data[0]?.logs ?? []
//     const logs = processLogs(scanLogs);
//     console.log("Extracted logs:", logs);

//     return (
//         <div className="main-container">
//             <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
//                 {cleanedPath} Scanning
//             </h2>

//             <div className="bg-[#040C1F] p-4 mx-2 mb-4 rounded-md border border-[#4C566A]">
//                 <label className="block mb-2 text-[#04D2D2] font-semibold">Target URL</label>
//                 <div className="flex flex-col sm:flex-row justify-between">
//                     <input
//                         type="text"
//                         placeholder="Enter target URL (e.g., https://example.com)"
//                         className="w-full sm:w-8/9 p-2 rounded-md text-white bg-[#0F172A] border border-[#4C566A]"
//                         value={targetUrl}
//                         onChange={(e) => setTargetUrl(e.target.value)}
//                         disabled={isLoading}
//                     />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                         {!toggleBtn && (
//                             <button onClick={handleStartScan} className="bg-[#04D2D2] px-4 py-2 rounded-md">
//                                 {isLoading ? `Scanning... ${progress}%` : "Start Scan"}
//                             </button>
//                         )}
//                         {toggleBtn && (
//                             <button onClick={handleStopScan} className="bg-red-500 px-4 py-2 rounded-md">
//                                 Stop Scan
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 <div className="flex items-center space-x-2 mt-3">
//                     <span className="text-[#04D2D2] font-medium">Custom Selection</span>
//                     <button
//                         onClick={() => setEnabled(!enabled)}
//                         className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${enabled ? "bg-[#04D2D2]" : "bg-gray-700"}`}
//                     >
//                         <div
//                             className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${enabled ? "translate-x-6" : "translate-x-0"}`}
//                         />
//                     </button>
//                 </div>

//                 {/* Conditionally show these inputs if enabled */}

//                 {enabled && (
//                     // <div className="flex flex-col gap-4">
//                     //     {/* File Uploads */}
//                     //     <div className="flex items-center gap-8">
//                     //         {/* Upload URL File */}
//                     //         <div className="mt-4">
//                     //             <label className="block mb-1 text-[#04D2D2] font-semibold">Upload URL file</label>
//                     //             <input
//                     //                 type="file"
//                     //                 name="url"
//                     //                 className="w-full sm:w-8/9 p-2 cursor-pointer rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
//                     //             />
//                     //         </div>

//                     //         {/* Upload Payload File */}
//                     //         <div className="mt-4">
//                     //             <label className="block mb-1 text-[#04D2D2] font-semibold">Upload payloads file</label>
//                     //             <input
//                     //                 type="file"
//                     //                 name="payloads"
//                     //                 className="w-full sm:w-8/9 p-2 cursor-pointer rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
//                     //             />
//                     //         </div>
//                     //     </div>

//                     //     {/* Conditional Rendering for Proxy and Database Options */}
//                     //     {cleanedPath === "SQLInjectionScanner" && (
//                     //         <>
//                     //             {/* Proxy Selection */}
//                     //             <div className="flex items-center gap-6">
//                     //                 <span className="text-[#04D2D2] font-semibold">Select Proxy Y/N</span>
//                     //                 <div className="flex gap-4">
//                     //                     <label className="flex items-center gap-2">
//                     //                         <input
//                     //                             type="radio"
//                     //                             name="proxyOption"
//                     //                             value="No"
//                     //                             checked={proxy === "No"}
//                     //                             onChange={(e) => setProxy(e.target.value)}
//                     //                             className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
//                     //                         />
//                     //                         <span className="text-[#04D2D2]">No</span>
//                     //                     </label>

//                     //                     <label className="flex items-center gap-2">
//                     //                         <input
//                     //                             type="radio"
//                     //                             name="proxyOption"
//                     //                             value="Yes"
//                     //                             checked={proxy === "Yes"}
//                     //                             onChange={(e) => setProxy(e.target.value)}
//                     //                             className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
//                     //                         />
//                     //                         <span className="text-[#04D2D2]">Yes</span>
//                     //                     </label>
//                     //                 </div>
//                     //             </div>

//                     //             {/* Database Selection */}
//                     //             <div className="flex items-center gap-6">
//                     //                 <span className="text-[#04D2D2] font-semibold">Select Database Y/N</span>
//                     //                 <div className="flex gap-4">
//                     //                     <label className="flex items-center gap-2">
//                     //                         <input
//                     //                             type="radio"
//                     //                             name="databaseOption"
//                     //                             value="No"
//                     //                             checked={database === "No"}
//                     //                             onChange={(e) => setDatabase(e.target.value)}
//                     //                             className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
//                     //                         />
//                     //                         <span className="text-[#04D2D2]">No</span>
//                     //                     </label>

//                     //                     <label className="flex items-center gap-2">
//                     //                         <input
//                     //                             type="radio"
//                     //                             name="databaseOption"
//                     //                             value="Yes"
//                     //                             checked={database === "Yes"}
//                     //                             onChange={(e) => setDatabase(e.target.value)}
//                     //                             className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
//                     //                         />
//                     //                         <span className="text-[#04D2D2]">Yes</span>
//                     //                     </label>
//                     //                 </div>
//                     //             </div>
//                     //         </>
//                     //     )}
//                     // </div>
//                     <Custom_Selection cleanedPath={cleanedPath} />
//                 )}


//                 {/* Progress Bar */}
//                 {isLoading && (
//                     <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
//                         <div
//                             className="bg-[#04D2D2] h-2 rounded-full"
//                             style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
//                         ></div>
//                     </div>
//                 )}
//             </div>

//             {/* Logs Section */}
//             <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
//                 <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Logs</h3>
//                 <div className="h-40 overflow-y-auto text-sm bg-[#0F172A] p-3 rounded-md border border-[#4C566A]">
//                     {logs.length === 0 ? (
//                         <p className="text-gray-500">No logs yet. Start a scan to see logs.</p>
//                     ) : (
//                         logs.map((log, index) => (
//                             <p key={index} className="text-gray-400">
//                                 [{new Date(log.timestamp).toLocaleTimeString()}] {log.event} - {log.details}
//                             </p>
//                         ))
//                     )}
//                 </div>
//             </div>

//             {/* Table Section */}
//             <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
//                 <div className="flex justify-between items-center">
//                     <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Results</h3>
//                     <div className="flex gap-2">
//                         <select
//                             className="bg-[#0F172A] text-white p-2 rounded-md border border-[#4C566A]"
//                             value={sortCriteria}
//                             onChange={handleSortChange}
//                         >
//                             <option value="domain">Domain</option>
//                             <option value="subdomain">Subdomain</option>
//                             <option value="ip">IP</option>
//                             <option value="status">Status</option>
//                         </select>
//                         <button onClick={handleClearAll} className="bg-red-500 px-4 py-2 rounded-md flex items-center">
//                             <RiDeleteBin5Line /> Clear All
//                         </button>
//                     </div>
//                 </div>

//                 <div className="overflow-x-auto">
//                     {/* <table className="min-w-full text-sm mt-4 text-left text-gray-400">
//                         <thead className="text-xs uppercase bg-[#0F172A] text-gray-200">
//                             <tr>
//                                 <th className="px-4 py-3">No.</th>
//                                 <th className="px-4 py-3">Target URL</th>
//                                 <th className="px-4 py-3">Subdomain</th>
//                                 <th className="px-4 py-3">Domain IP</th>
//                                 <th className="px-4 py-3">Status Code</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {sortedResults.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
//                                         No matching results.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 sortedResults.map((item, index) => (
//                                     <tr key={index} className="border-b border-[#4C566A] hover:bg-[#1E293B]">
//                                         <td className="px-4 py-3">{index + 1}</td>
//                                         <td className="px-4 py-3">{item.domain}</td>
//                                         <td className="px-4 py-3">{item.subdomain}</td>
//                                         <td className="px-4 py-3">{item.ip}</td>
//                                         <td className="px-4 py-3">{item.status}</td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table> */}
//                     <Result_Table sortedResults={sortedResults} scanType={cleanedPath} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Scaner;




import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchResult, scanStart } from "../../store/slices/toolsSlice";
import Result_Table from "../../components/Result_Table";
import Custom_Selection from "../../components/Custom_Selection";

const Scaner = () => {
    const dispatch = useDispatch();
    const { scanResults, status } = useSelector((state) => state.tools);

    const location = useLocation();
    const cleanedPath = location.pathname.replace(/^\/tools\//, "").split("/scan")[0];

    const [data, setData] = useState([]);
    const [targetUrl, setTargetUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toggleBtn, setToggleBtn] = useState(false);
    const [progress, setProgress] = useState(0);
    const [filterText, setFilterText] = useState("");
    const [sortCriteria, setSortCriteria] = useState("domain"); // Default sorting criteria
    const [enabled, setEnabled] = useState(false);
    const [customValues, setCustomValues] = useState({
        proxy: "No",
        proxyValue: "",
        database: "No",
        techniques: [],
        urlFileContent: null,
        payloadsFileContent: null
    });

    // Handle custom values change from the Custom_Selection component
    const handleCustomValuesChange = (values) => {
        setCustomValues(values);
    };

    useEffect(() => {
        let interval;
        if (isLoading) {
            setProgress(0);
            interval = setInterval(() => {
                setProgress((prev) => (prev < 100 ? prev + 10 : 100));
            }, 1000);
        } else {
            clearInterval(interval);
            setProgress(100);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        setData(Array.isArray(scanResults) ? scanResults : []);
    }, [scanResults]);

    useEffect(() => {
        setData([]);
        setTargetUrl("");
        setProgress(0);
        setToggleBtn(false);
        setIsLoading(false);
        setEnabled(false);
        setCustomValues({
            proxy: "No",
            proxyValue: "",
            database: "No",
            techniques: [],
            urlFileContent: null,
            payloadsFileContent: null
        });
    }, [location.pathname]);

    const handleStartScan = () => {
        // Check if targetUrl is empty and no URL file content
        if (!targetUrl.trim() && !customValues.urlFileContent) {
            alert("Please enter a target URL or upload a URL file");
            return;
        }

        setIsLoading(true);
        setToggleBtn(true);
        setProgress(0);

        // Prepare the scan payload
        const scanPayload = {
            domain: targetUrl,
            path: cleanedPath,
            custom: enabled ? {
                proxy: customValues.proxy === "Yes" ? customValues.proxyValue : null,
                database: customValues.database === "Yes",
                techniques: customValues.techniques.length > 0 ? customValues.techniques : null,
                urls: customValues.urlFileContent || null,
                payloads: customValues.payloadsFileContent || null
            } : null
        };

        console.log(scanPayload)

        dispatch(scanStart(scanPayload)).then((response) => {
            if (response.payload?.status === 200) {
                setIsLoading(false);
                setToggleBtn(false);
                console.log("Scan completed successfully.");
            } else {
                setIsLoading(false);
                setToggleBtn(false);
                console.error("Error: Invalid response status", response.payload?.status);
            }
        }).catch((error) => {
            setIsLoading(false);
            setToggleBtn(false);
            console.error("Error in scan request:", error);
        });
    };

    const handleStopScan = () => {
        setIsLoading(false);
        setToggleBtn(false);
        setProgress(0);
        dispatch({ type: "tools/addLog", payload: "Scan stopped by user." });
    };

    const handleClearAll = () => {
        setTargetUrl("");
        setProgress(0);
        setToggleBtn(false);
        setIsLoading(false);
        setData([]);
        setCustomValues({
            proxy: "No",
            proxyValue: "",
            database: "No",
            techniques: [],
            urlFileContent: null,
            payloadsFileContent: null
        });
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    // const filteredResults = data.flatMap((scan) => {
    //     if (scan.subdomains) {
    //         // Subdomain scan filtering
    //         return scan.subdomains
    //             .filter((subdomain) => subdomain.includes(filterText))
    //             .map((subdomain) => {
    //                 const liveSub = scan.live_subdomains?.find((live) => live.subdomain === subdomain);
    //                 return {
    //                     type: "subdomain",
    //                     domain: scan.domain,
    //                     subdomain,
    //                     ip: liveSub ? liveSub.ip : "--",
    //                     status: liveSub ? "200" : "404",
    //                 };
    //             });
    //     } else if (scan.vulnerable_parameters) {
    //         // SQL injection scan filtering
    //         return scan.vulnerable_parameters
    //             .filter((param) => param.includes(filterText)) // Apply filter on parameters
    //             .map((param, index) => ({
    //                 type: "sql_injection",
    //                 url: scan.url,
    //                 parameter: param,
    //                 payload: scan.payloads[index] || "N/A",
    //                 databases: scan.databases || [],
    //             }));
    //     }
    //     return [];
    // });

    // Sorting logic

    const filteredResults = (data ?? []).flatMap((scan) => {
        if (scan?.subdomains) {
            return (scan.subdomains ?? [])
                .map((subdomain) => {
                    const liveSub = (scan.live_subdomains ?? []).find(
                        (live) => live.subdomain === subdomain
                    );
                    return {
                        type: "subdomain",
                        domain: scan.domain,
                        subdomain,
                        ip: liveSub ? liveSub.ip : "--",
                        status: liveSub ? "200" : "404",
                    };
                })
                .filter((entry) =>
                    Object.values(entry).some(
                        (value) =>
                            typeof value === "string" && value.includes(filterText)
                    )
                );
        } else if (scan?.vulnerable_parameters) {
            return (scan.vulnerable_parameters ?? [])
                .map((param, index) => ({
                    type: "sql_injection",
                    url: scan.url,
                    parameter: param,
                    payload: (scan.payloads ?? [])[index] || "N/A",
                    databases: scan.databases || [],
                }))
                .filter((entry) =>
                    Object.values(entry).some(
                        (value) =>
                            (typeof value === "string" || Array.isArray(value)) &&
                            JSON.stringify(value).includes(filterText)
                    )
                );
        }
        return [];
    });


    // const filteredResults = (data ?? []).flatMap((scan) => {
    //     if (scan?.subdomains) {
    //         return (scan.subdomains ?? [])
    //             .filter((subdomain) => subdomain.includes(filterText))
    //             .map((subdomain) => {
    //                 const liveSub = (scan.live_subdomains ?? []).find(
    //                     (live) => live.subdomain === subdomain
    //                 );
    //                 return {
    //                     type: "subdomain",
    //                     domain: scan.domain,
    //                     subdomain,
    //                     ip: liveSub ? liveSub.ip : "--",
    //                     status: liveSub ? "200" : "404",
    //                 };
    //             });
    //     } else if (scan?.vulnerable_parameters) {
    //         return (scan.vulnerable_parameters ?? [])
    //             .filter((param) => param.includes(filterText))
    //             .map((param, index) => ({
    //                 type: "sql_injection",
    //                 url: scan.url,
    //                 parameter: param,
    //                 payload: (scan.payloads ?? [])[index] || "N/A",
    //                 databases: scan.databases || [],
    //             }));
    //     }
    //     return [];
    // });


    // const sortedResults = filteredResults.sort((a, b) => {
    //     if (sortCriteria === "domain" && a.domain && b.domain) {
    //         return a.domain.localeCompare(b.domain);
    //     } else if (sortCriteria === "subdomain" && a.subdomain && b.subdomain) {
    //         return a.subdomain.localeCompare(b.subdomain);
    //     } else if (sortCriteria === "ip" && a.ip && b.ip) {
    //         return a.ip.localeCompare(b.ip);
    //     } else if (sortCriteria === "status" && a.status && b.status) {
    //         return a.status.localeCompare(b.status);
    //     } else if (sortCriteria === "parameter" && a.parameter && b.parameter) {
    //         return a.parameter.localeCompare(b.parameter);
    //     } else if (sortCriteria === "url" && a.url && b.url) {
    //         return a.url.localeCompare(b.url);
    //     }
    //     return 0;
    // });

    const sortedResults = filteredResults.sort((a, b) => {
        if (!sortCriteria || !a[sortCriteria] || !b[sortCriteria]) return 0;
    
        const valueA = a[sortCriteria];
        const valueB = b[sortCriteria];
    
        // If values are strings, use localeCompare
        if (typeof valueA === "string" && typeof valueB === "string") {
            return valueA.localeCompare(valueB);
        }
    
        // If values are numbers, compare numerically
        if (typeof valueA === "number" && typeof valueB === "number") {
            return valueA - valueB;
        }
    
        return 0; // Default case, return no sorting
    });
    

    // const processLogs = (rawLogs) => {
    //     if (!Array.isArray(rawLogs)) return [];

    //     return rawLogs.map((log) => {
    //         const timestampMatch = log.match(/\[(\d{2}:\d{2}:\d{2})\]/);
    //         const dateMatch = log.match(/\/(\d{4}-\d{2}-\d{2})\//);

    //         const timestamp = timestampMatch ? timestampMatch[1] : "00:00:00";
    //         const date = dateMatch ? dateMatch[1] : new Date().toISOString().split("T")[0];

    //         const event = log.includes("[INFO]") ? "INFO" : log.includes("[WARNING]") ? "WARNING" : "LOG";
    //         const details = log.replace(/\[.*?\]/g, "").trim();

    //         return { timestamp: `${date} ${timestamp}`, event, details };
    //     });
    // };
    const processLogs = (rawLogs) => {
        if (!Array.isArray(rawLogs)) return [];

        return rawLogs.map((log) => {
            if (typeof log === "string") {
                // Handle string-based logs (if SQL scan logs are in string format)
                const timestampMatch = log.match(/\[(\d{2}:\d{2}:\d{2})\]/);
                const dateMatch = log.match(/\/(\d{4}-\d{2}-\d{2})\//);

                const timestamp = timestampMatch ? timestampMatch[1] : "00:00:00";
                const date = dateMatch ? dateMatch[1] : new Date().toISOString().split("T")[0];

                const event = log.includes("[INFO]") ? "INFO" : log.includes("[WARNING]") ? "WARNING" : "LOG";
                const details = log.replace(/\[.*?\]/g, "").trim();

                return { timestamp: `${date} ${timestamp}`, event, details };
            }

            if (typeof log === "object" && log.timestamp && log.event) {
                // Handle object-based logs (like in subdomain scan)
                const timestamp = new Date(log.timestamp).toISOString().replace("T", " ").split(".")[0];
                return {
                    timestamp,
                    event: log.event.toUpperCase(),
                    details: log.details || "No details provided"
                };
            }

            return { timestamp: "Unknown", event: "LOG", details: JSON.stringify(log) };
        });
    };

    // Extract logs from scanResults
    const scanLogs = data[0]?.logs ?? [];
    const logs = processLogs(scanLogs);

    return (
        <div className="main-container">
            <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                {cleanedPath} Scanning
            </h2>

            <div className="bg-[#040C1F] p-4 mx-2 mb-4 rounded-md border border-[#4C566A]">
                <label className="block mb-2 text-[#04D2D2] font-semibold">Target URL</label>
                <div className="flex flex-col sm:flex-row justify-between">
                    <input
                        type="text"
                        placeholder="Enter target URL (e.g., https://example.com)"
                        className="w-full sm:w-8/9 p-2 rounded-md text-white bg-[#0F172A] border border-[#4C566A]"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="flex gap-2 mt-2 sm:mt-0">
                        {!toggleBtn && (
                            <button onClick={handleStartScan} className="bg-[#04D2D2] px-4 py-2 rounded-md">
                                {isLoading ? `Scanning... ${progress}%` : "Start Scan"}
                            </button>
                        )}
                        {toggleBtn && (
                            <button onClick={handleStopScan} className="bg-red-500 px-4 py-2 rounded-md">
                                Stop Scan
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2 mt-3">
                    <span className="text-[#04D2D2] font-medium">Custom Selection</span>
                    <button
                        onClick={() => setEnabled(!enabled)}
                        className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${enabled ? "bg-[#04D2D2]" : "bg-gray-700"}`}
                    >
                        <div
                            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${enabled ? "translate-x-6" : "translate-x-0"}`}
                        />
                    </button>
                </div>

                {/* Conditionally show these inputs if enabled */}
                {enabled && (
                    <Custom_Selection
                        cleanedPath={cleanedPath}
                        onCustomValuesChange={handleCustomValuesChange}
                    />
                )}

                {/* Progress Bar */}
                {isLoading && (
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                        <div
                            className="bg-[#04D2D2] h-2 rounded-full"
                            style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
                        ></div>
                    </div>
                )}

                {/* Custom Values Summary (for debugging) */}
                {/* {enabled && (
                    <div className="mt-4 p-3 bg-[#0F172A] rounded-md border border-[#4C566A]">
                        <h4 className="text-[#04D2D2] font-semibold mb-2">Custom Configuration Summary:</h4>
                        <div className="text-gray-400 text-sm">
                            <p>Proxy: {customValues.proxy} {customValues.proxy === "Yes" ? `(${customValues.proxyValue})` : ""}</p>
                            <p>Extract Database: {customValues.database}</p>
                            <p>Selected Techniques: {customValues.techniques.join(", ") || "None"}</p>
                            <p>URLs File: {customValues.urlFileContent ? `${customValues.urlFileContent.length} URLs loaded` : "Not uploaded"}</p>
                            <p>Payloads File: {customValues.payloadsFileContent ? `${customValues.payloadsFileContent.length} payloads loaded` : "Not uploaded"}</p>
                        </div>
                    </div>
                )} */}
            </div>

            {/* Logs Section */}
            <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Logs</h3>
                <div className="h-40 overflow-y-auto text-sm bg-[#0F172A] p-3 rounded-md border border-[#4C566A]">
                    {logs.length === 0 ? (
                        <p className="text-gray-500">No logs yet. Start a scan to see logs.</p>
                    ) : (
                        logs.map((log, index) => (
                            <p key={index} className={`${log.event === "WARNING" ? "text-yellow-400" : "text-gray-400"}`}>
                                [{log.timestamp}] {log.event} - {log.details}
                            </p>
                        ))
                    )}
                </div>
            </div>

            {/* Table Section */}
            {/* <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Results</h3>
                    <div className="flex gap-2 mb-3 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search results..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="bg-[#0F172A] text-white p-2 rounded-md border border-[#4C566A]"
                        />
                        <select
                            className="bg-[#0F172A] text-white p-2 rounded-md border border-[#4C566A]"
                            value={sortCriteria}
                            onChange={handleSortChange}
                        >
                            <option value="domain">Domain</option>
                            <option value="subdomain">Subdomain</option>
                            <option value="ip">IP</option>
                            <option value="status">Status</option>
                            {cleanedPath === "SQLInjectionScanner" && (
                                <>
                                    <option value="parameter">Parameter</option>
                                    <option value="url">URL</option>
                                </>
                            )}
                        </select>
                        <button onClick={handleClearAll} className="bg-red-500 px-4 py-2 rounded-md flex items-center">
                            <RiDeleteBin5Line className="mr-1" /> Clear All
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Result_Table
                        sortedResults={sortedResults}
                        scanType={cleanedPath}
                    />
                </div>
            </div> */}
            <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Results</h3>
                    <div className="flex gap-2 mb-3 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search results..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="bg-[#0F172A] text-white p-2 rounded-md border border-[#4C566A]"
                        />

                        {/* Hide dropdown if no results */}
                        {sortedResults.length > 0 && (
                            <select
                                className="bg-[#0F172A] text-white p-2 rounded-md border border-[#4C566A]"
                                value={sortCriteria}
                                onChange={handleSortChange}
                            >
                                {Object.keys(sortedResults[0])
                                    .filter((key) => key !== "type") // Remove 'type' from dropdown
                                    .map((key) => (
                                        <option key={key} value={key}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </option>
                                    ))}
                            </select>
                        )}

                        <button onClick={handleClearAll} className="bg-red-500 px-4 py-2 rounded-md flex items-center">
                            <RiDeleteBin5Line className="mr-1" /> Clear All
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Result_Table sortedResults={sortedResults} scanType={cleanedPath} />
                </div>
            </div>


        </div>
    );
};

export default Scaner;