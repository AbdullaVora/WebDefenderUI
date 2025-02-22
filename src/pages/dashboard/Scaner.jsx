import { useState } from "react";
import { useLocation } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";


const Scaner = () => {
    // 1) Extract the path from the URL
    const location = useLocation(); // e.g., "/tools/ReflectedXss/scan"
    const cleanedPath = location.pathname.replace(/^\/tools\//, "").split("/scan")[0];

    // 2) State to hold the target URL and any table data
    const [targetUrl, setTargetUrl] = useState("");
    const [scans, setScans] = useState([
        // Example initial data (if any)
        // { id: 1, url: "http://example.com", description: "Sample Desc", payload: "N/A", result: "Pending" }
    ]);

    // 3) Handler for starting the scan
    const handleStartScan = () => {
        if (!targetUrl.trim()) return;
        // For now, just add a row to the table as a placeholder
        const newScan = {
            id: scans.length + 1,
            url: targetUrl,
            description: "No description yet",
            payload: "N/A",
            result: "In Progress"
        };
        setScans([...scans, newScan]);
        // Clear the input
        setTargetUrl("");
    };

    return (
        <div className="main-container">
            {/* Section Title */}
            <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                {cleanedPath} Scanning
                <p className="block text-[12px] font-normal opacity-85 mt-1">
                    Identify and fix security vulnerabilities before they become threats. Stay protected with advanced vulnerability scanning solutions!
                </p>
            </h2>

            {/* Input + Button */}
            <div className="bg-[#040C1F] p-4 mx-2 mb-4 rounded-md border border-[#4C566A]">
                <label className="block mb-2 text-[#04D2D2] font-semibold">
                    Target URL
                </label>
                <div className="flex flex-col sm:flex-row justify-between">
                    <input
                        type="text"
                        placeholder="Enter target URL (e.g., https://example.com)"
                        className="w-full sm:w-8/9 p-2 rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                    />
                    <button
                        onClick={handleStartScan}
                        className="bg-[#04D2D2] hover:bg-[#03b8b8] text-black font-semibold py-2 px-4 rounded-md transition"
                    >
                        Start Scan
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="mx-2 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Results</h3>
                    <button className="bg-red-500 hover:bg-red-400 text-black font-semibold py-2 px-4 rounded-md transition flex items-center gap-1"><RiDeleteBin5Line /> Clear All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm mt-4 text-left text-gray-400">
                        <thead className="text-xs uppercase bg-[#0F172A] text-gray-200">
                            <tr>
                                <th scope="col" className="px-4 py-3">No.</th>
                                <th scope="col" className="px-4 py-3">Target URL</th>
                                <th scope="col" className="px-4 py-3">Description</th>
                                <th scope="col" className="px-4 py-3">Payload</th>
                                <th scope="col" className="px-4 py-3">Show Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scans.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 pt-4 font-bold text-center text-gray-500">
                                        No scans yet. Please start a scan.
                                    </td>
                                </tr>
                            ) : (
                                scans.map((scan) => (
                                    <tr
                                        key={scan.id}
                                        className="border-b border-[#4C566A] hover:bg-[#1E293B]"
                                    >
                                        <td className="px-4 py-3">{scan.id}</td>
                                        <td className="px-4 py-3">{scan.url}</td>
                                        <td className="px-4 py-3">{scan.description}</td>
                                        <td className="px-4 py-3">{scan.payload}</td>
                                        <td className="px-4 py-3">
                                            {/* You can replace this with a link/button to view detailed results */}
                                            {scan.result}
                                        </td>
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
