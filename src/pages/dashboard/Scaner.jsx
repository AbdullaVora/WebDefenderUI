import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";

const Scaner = () => {
    const location = useLocation();
    const cleanedPath = location.pathname.replace(/^\/tools\//, "").split("/scan")[0];

    const [targetUrl, setTargetUrl] = useState("");
    const [scans, setScans] = useState([]);
    const [enabled, setEnabled] = useState(false);
    const [payloadOption, setPayloadOption] = useState("none");
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [toggleBtn, setToggleBtn] = useState(false)

    // useRef to store interval id so we can clear it on Stop
    const scanIntervalRef = useRef(null);

    const handleStartScan = () => {
        setToggleBtn(true);
        if (!targetUrl.trim()) return;

        setIsLoading(true);
        setProgress(0); // Reset progress

        const newScan = {
            id: scans.length + 1,
            url: targetUrl,
            description: "Scanning in progress...",
            payload: "N/A",
            result: "In Progress",
        };

        setScans((prevScans) => [...prevScans, newScan]);
        setLogs((prevLogs) => [
            ...prevLogs,
            `Started scanning ${targetUrl}...`,
            "Checking for vulnerabilities...",
            "Processing responses...",
        ]);

        // Simulate scanning steps
        let currentProgress = 0;
        scanIntervalRef.current = setInterval(() => {
            currentProgress += 10;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(scanIntervalRef.current);
                finishScan(newScan.id);
            }
        }, 2000);

        setTargetUrl("");
    };

    const finishScan = (scanId) => {
        setScans((prevScans) =>
            prevScans.map((scan) =>
                scan.id === scanId
                    ? { ...scan, description: "Scan Complete", result: "No issues found" }
                    : scan
            )
        );
        setLogs((prevLogs) => [...prevLogs, "Scan completed!"]);
        setIsLoading(false);
    };

    const handleStopScan = () => {
        setToggleBtn(false);
        if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
        }
        setIsLoading(false);
        setProgress(0);
        setLogs((prevLogs) => [...prevLogs, "Scan stopped by user."]);
    };

    const handleClearAll = () => {
        setScans([]);
        setLogs([]);
    };

    return (
        <div className="main-container">
            {/* Section Title */}
            <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                {cleanedPath} Scanning
                <p className="block text-[12px] font-normal opacity-85 mt-1">
                    Identify and fix security vulnerabilities before they become threats.
                    Stay protected with advanced vulnerability scanning solutions!
                </p>
            </h2>

            {/* Input + Button */}
            <div className="bg-[#040C1F] p-4 mx-2 mb-4 rounded-md border border-[#4C566A]">
                <label className="block mb-2 text-[#04D2D2] font-semibold">Target URL</label>
                <div className="flex flex-col sm:flex-row justify-between">
                    <input
                        type="text"
                        placeholder="Enter target URL (e.g., https://example.com)"
                        className="w-full sm:w-8/9 p-2 rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="flex gap-2 mt-2 sm:mt-0">
                        {!toggleBtn &&
                            <button
                                onClick={handleStartScan}
                                className="bg-[#04D2D2] cursor-pointer hover:bg-[#03b8b8] text-black font-semibold py-2 px-4 rounded-md transition flex items-center"
                                disabled={isLoading}
                            >
                                {isLoading ? "Scanning..." : "Start Scan"}
                            </button>
                        }
                        {toggleBtn && (
                            <button
                                onClick={handleStopScan}
                                className="bg-red-500 hover:bg-red-400 text-black font-semibold py-2 px-4 rounded-md transition flex items-center"
                            >
                                Stop Scan
                            </button>
                        )}
                    </div>
                </div>

                {/* Toggle for Custom URL files and payloads */}
                <div className="flex items-center mt-3">
                    <span className="mr-2 text-gray-400 font-bold">Custom URL files and payloads</span>
                    <button
                        type="button"
                        aria-pressed={enabled}
                        onClick={() => setEnabled(!enabled)}
                        className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? "bg-[#04D2D2]" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"
                                }`}
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
            </div>

            {/* Show progress bar if scanning */}
            {isLoading && (
                <div className="my-4 px-5">
                    {/* Progress Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <div className="text-black dark:text-gray-200 text-sm">
                            <p className="font-semibold">
                                Crawling and Scanning... <span className="font-normal">({progress}% Done)</span>
                            </p>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-[#04D2D2] h-4 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Logs Section */}
            <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Logs</h3>
                <div className="h-40 overflow-y-auto text-sm bg-[#0F172A] p-3 rounded-md border border-[#4C566A]">
                    {logs.length === 0 ? (
                        <p className="text-gray-500">No logs yet. Start a scan to see logs.</p>
                    ) : (
                        logs.map((log, index) => (
                            <p key={index} className="text-gray-400">{log}</p>
                        ))
                    )}
                </div>
            </div>

            {/* Table Section */}
            <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Results</h3>
                    <button
                        onClick={handleClearAll}
                        className="bg-red-500 hover:bg-red-400 text-black font-semibold py-2 px-4 rounded-md transition flex items-center gap-1"
                    >
                        <RiDeleteBin5Line /> Clear All
                    </button>
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
                                    <tr key={scan.id} className="border-b border-[#4C566A] hover:bg-[#1E293B]">
                                        <td className="px-4 py-3">{scan.id}</td>
                                        <td className="px-4 py-3">{scan.url}</td>
                                        <td className="px-4 py-3">{scan.description}</td>
                                        <td className="px-4 py-3">{scan.payload}</td>
                                        <td className="px-4 py-3">{scan.result}</td>
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
