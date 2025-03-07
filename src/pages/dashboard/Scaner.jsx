// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSubDomainData, subDomainUrl } from "../../store/slices/toolsSlice";

// const Scaner = () => {
//     const dispatch = useDispatch();
//     const { loading, error, scanResults, logs, status } = useSelector((state) => state.tools);

//     const location = useLocation();
//     const cleanedPath = location.pathname.replace(/^\/tools\//, "").split("/scan")[0];

//     const [targetUrl, setTargetUrl] = useState("");
//     const [enabled, setEnabled] = useState(false);
//     const [payloadOption, setPayloadOption] = useState("none");
//     const [scans, setScans] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const [toggleBtn, setToggleBtn] = useState(false);

//     const handleStartScan = () => {
//         setToggleBtn(true);
//         if (!targetUrl.trim()) return;

//         setIsLoading(true);
//         setProgress(0);

//         // Dispatch API request to start scan
//         dispatch(subDomainUrl({ domain: targetUrl })).then((response) => {
//             if (response.payload && response.payload.status === 200) {
//                 console.log("Scan started successfully.");
//                 // Fetch scan results after starting the scan
//                 dispatch(fetchSubDomainData(targetUrl));
//             } else {
//                 setIsLoading(false);
//                 setToggleBtn(false);
//                 console.error("Failed to start scan.");
//             }
//         });

//         setTargetUrl("");
//     };

//     const handleStopScan = () => {
//         setToggleBtn(false);
//         setIsLoading(false);
//         setProgress(0);
//         dispatch({ type: "tools/addLog", payload: "Scan stopped by user." });
//     };

//     const handleClearAll = () => {
//         setScans([]);
//         dispatch({ type: "tools/clearLogs" });
//     };

//     // Fetch scan results when status changes
//     useEffect(() => {
//         if (status === "running" && targetUrl) {
//             dispatch(fetchSubDomainData(targetUrl));
//         }
//     }, [status, dispatch, targetUrl]);

//     console.log("data: ", scanResults)

//     return (
//         <div className="main-container">
//             {/* Section Title */}
//             <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
//                 {cleanedPath} Scanning
//                 <p className="block text-[12px] font-normal opacity-85 mt-1">
//                     Identify and fix security vulnerabilities before they become threats.
//                     Stay protected with advanced vulnerability scanning solutions!
//                 </p>
//             </h2>

//             {/* Input + Button */}
//             <div className="bg-[#040C1F] p-4 mx-2 mb-4 rounded-md border border-[#4C566A]">
//                 <label className="block mb-2 text-[#04D2D2] font-semibold">Target URL</label>
//                 <div className="flex flex-col sm:flex-row justify-between">
//                     <input
//                         type="text"
//                         placeholder="Enter target URL (e.g., https://example.com)"
//                         className="w-full sm:w-8/9 p-2 rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
//                         value={targetUrl}
//                         onChange={(e) => setTargetUrl(e.target.value)}
//                         disabled={isLoading}
//                         name="domain"
//                     />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                         {!toggleBtn &&
//                             <button
//                                 onClick={handleStartScan}
//                                 className="bg-[#04D2D2] cursor-pointer hover:bg-[#03b8b8] text-black font-semibold py-2 px-4 rounded-md transition flex items-center"
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? "Scanning..." : "Start Scan"}
//                             </button>
//                         }
//                         {toggleBtn && (
//                             <button
//                                 onClick={handleStopScan}
//                                 className="bg-red-500 hover:bg-red-400 text-black font-semibold py-2 px-4 rounded-md transition flex items-center"
//                             >
//                                 Stop Scan
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Logs Section */}
//             <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
//                 <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Logs</h3>
//                 <div className="h-40 overflow-y-auto text-sm bg-[#0F172A] p-3 rounded-md border border-[#4C566A]">
//                     {scanResults.length === 0 ? (
//                         <p className="text-gray-500">No logs yet. Start a scan to see logs.</p>
//                     ) : (
//                         scanResults.map((log, index) => (
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
//                     <button
//                         onClick={handleClearAll}
//                         className="bg-red-500 hover:bg-red-400 text-black font-semibold py-2 px-4 rounded-md transition flex items-center gap-1"
//                     >
//                         <RiDeleteBin5Line /> Clear All
//                     </button>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full text-sm mt-4 text-left text-gray-400">
//                         <thead className="text-xs uppercase bg-[#0F172A] text-gray-200">
//                             <tr>
//                                 <th className="px-4 py-3">No.</th>
//                                 <th className="px-4 py-3">Target URL</th>
//                                 <th className="px-4 py-3">Subdomains</th>
//                                 <th className="px-4 py-3">Live Subdomains</th>
//                                 <th className="px-4 py-3">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {scanResults.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={5} className="px-4 pt-4 font-bold text-center text-gray-500">
//                                         No scans yet. Please start a scan.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 scanResults.map((result, index) =>
//                                     result.scans.map((scan, scanIndex) => (
//                                         <tr key={`${index}-${scanIndex}`} className="border-b border-[#4C566A] hover:bg-[#1E293B]">
//                                             <td className="px-4 py-3">{index + 1}</td>
//                                             <td className="px-4 py-3">{result.domain}</td>
//                                             <td className="px-4 py-3">{scan.subdomains?.join(", ") || "N/A"}</td>
//                                             <td className="px-4 py-3">
//                                                 {scan.live_subdomains?.length > 0
//                                                     ? scan.live_subdomains.map(sub => `${sub.subdomain} (${sub.ip})`).join(", ")
//                                                     : "None"}
//                                             </td>
//                                             <td className="px-4 py-3">{scan.status}</td>
//                                         </tr>
//                                     ))
//                                 )
//                             )}
//                         </tbody>
//                     </table>
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
import { fetchSubDomainData, subDomainUrl } from "../../store/slices/toolsSlice";

const Scaner = () => {
    const dispatch = useDispatch();
    const { scanResults, status } = useSelector((state) => state.tools);

    const location = useLocation();
    const cleanedPath = location.pathname.replace(/^\/tools\//, "").split("/scan")[0];

    const [targetUrl, setTargetUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toggleBtn, setToggleBtn] = useState(false);
    const [progress, setProgress] = useState(0);
    const [filterText, setFilterText] = useState("");
    const [sortCriteria, setSortCriteria] = useState("domain"); // Default sorting criteria
    const [enabled, setEnabled] = useState(false);
    const [payloadOption, setPayloadOption] = useState("none");


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

    const handleStartScan = () => {
        if (!targetUrl.trim()) return;

        setIsLoading(true);
        setToggleBtn(true);
        setProgress(0);

        dispatch(subDomainUrl({ domain: targetUrl })).then((response) => {
            if (response.payload?.status === 200) {
                dispatch(fetchSubDomainData(targetUrl)).then(() => {
                    // Scan completed
                    setIsLoading(false);
                    setToggleBtn(false);
                }).catch((error) => {
                    // Handle any errors during fetchSubDomainData
                    setIsLoading(false);
                    setToggleBtn(false);
                    console.error("Error fetching subdomain data:", error);
                });
            } else {
                // If status is not 200, stop loading immediately
                setIsLoading(false);
                setToggleBtn(false);
                console.error("Error: Invalid response status", response.payload?.status);
            }
        }).catch((error) => {
            // Handle any errors during subDomainUrl dispatch
            setIsLoading(false);
            setToggleBtn(false);
            console.error("Error in subDomainUrl request:", error);
        });

        setTargetUrl("");
    };

    const handleStopScan = () => {
        setIsLoading(false);
        setToggleBtn(false);
        setProgress(0);
        dispatch({ type: "tools/addLog", payload: "Scan stopped by user." });
    };

    const handleClearAll = () => {
        dispatch({ type: "tools/clearLogs" });
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const filteredResults = scanResults.flatMap((result) =>
        result.scans.flatMap((scan) =>
            scan.subdomains.filter((subdomain) => subdomain.includes(filterText)).map((subdomain) => {
                const liveSub = scan.live_subdomains.find((live) => live.subdomain === subdomain);
                return {
                    domain: result.domain,
                    subdomain,
                    ip: liveSub ? liveSub.ip : "--",
                    status: liveSub ? "200" : "404",
                };
            })
        )
    );

    // Sorting logic
    const sortedResults = filteredResults.sort((a, b) => {
        if (sortCriteria === "domain") {
            return a.domain.localeCompare(b.domain);
        } else if (sortCriteria === "subdomain") {
            return a.subdomain.localeCompare(b.subdomain);
        } else if (sortCriteria === "ip") {
            return a.ip.localeCompare(b.ip);
        } else if (sortCriteria === "status") {
            return a.status.localeCompare(b.status);
        }
        return 0;
    });

    // Extract logs from scanResults
    const logs = scanResults.flatMap((result) =>
        result.scans.flatMap((scan) => scan.logs)
    );

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
                    <>
                        {/* Upload URL file */}
                        <div className="url-file mt-4">
                            <label className="block mb-1 text-[#04D2D2] font-semibold">Upload URL file</label>
                            <input
                                type="file"
                                name="url"
                                className="w-full sm:w-8/9 p-2 cursor-pointer rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
                            />
                        </div>

                        {/* Payload Options */}
                        <div className="choose-option mt-3">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="none"
                                    name="payloadOption"
                                    value="none"
                                    checked={payloadOption === "none"}
                                    onChange={(e) => setPayloadOption(e.target.value)}
                                    className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
                                />
                                <label htmlFor="none" className="text-[#04D2D2] font-semibold text-[14px]">None</label>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                                <input
                                    type="radio"
                                    id="custom-payload"
                                    name="payloadOption"
                                    value="custom-payload"
                                    checked={payloadOption === "custom-payload"}
                                    onChange={(e) => setPayloadOption(e.target.value)}
                                    className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
                                />
                                <label htmlFor="custom-payload" className="text-[#04D2D2] font-semibold text-[14px]">Choose your own payloads</label>
                            </div>
                        </div>

                        {/* Conditional Payload Upload */}
                        {payloadOption === "custom-payload" && (
                            <div className="url-file mt-4">
                                <label className="block mb-1 text-[#04D2D2] font-semibold">Upload payloads file</label>
                                <input
                                    type="file"
                                    name="payloads"
                                    className="w-full sm:w-8/9 p-2 cursor-pointer rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
                                />
                            </div>
                        )}
                    </>
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
            </div>

            {/* Logs Section */}
            <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Logs</h3>
                <div className="h-40 overflow-y-auto text-sm bg-[#0F172A] p-3 rounded-md border border-[#4C566A]">
                    {logs.length === 0 ? (
                        <p className="text-gray-500">No logs yet. Start a scan to see logs.</p>
                    ) : (
                        logs.map((log, index) => (
                            <p key={index} className="text-gray-400">
                                [{new Date(log.timestamp).toLocaleTimeString()}] {log.event} - {log.details}
                            </p>
                        ))
                    )}
                </div>
            </div>

            {/* Table Section */}
            <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Results</h3>
                    <div className="flex gap-2">
                        <select
                            className="bg-[#0F172A] text-white p-2 rounded-md border border-[#4C566A]"
                            value={sortCriteria}
                            onChange={handleSortChange}
                        >
                            <option value="domain">Domain</option>
                            <option value="subdomain">Subdomain</option>
                            <option value="ip">IP</option>
                            <option value="status">Status</option>
                        </select>
                        <button onClick={handleClearAll} className="bg-red-500 px-4 py-2 rounded-md flex items-center">
                            <RiDeleteBin5Line /> Clear All
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm mt-4 text-left text-gray-400">
                        <thead className="text-xs uppercase bg-[#0F172A] text-gray-200">
                            <tr>
                                <th className="px-4 py-3">No.</th>
                                <th className="px-4 py-3">Target URL</th>
                                <th className="px-4 py-3">Subdomain</th>
                                <th className="px-4 py-3">Domain IP</th>
                                <th className="px-4 py-3">Status Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedResults.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                                        No matching results.
                                    </td>
                                </tr>
                            ) : (
                                sortedResults.map((item, index) => (
                                    <tr key={index} className="border-b border-[#4C566A] hover:bg-[#1E293B]">
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3">{item.domain}</td>
                                        <td className="px-4 py-3">{item.subdomain}</td>
                                        <td className="px-4 py-3">{item.ip}</td>
                                        <td className="px-4 py-3">{item.status}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Scaner;