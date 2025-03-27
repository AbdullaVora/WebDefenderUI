// import React, { useState } from 'react'

// const Custom_Selection = ({ cleanedPath }) => {
//     const [proxy, setProxy] = useState("No");
//     const [database, setDatabase] = useState("No");
//     const [selectedTechniques, setSelectedTechniques] = useState([]);

//     const sqlInjectionTechniques = [
//         { label: "Boolean-based blind SQL injection", value: "B" },
//         { label: "Error-based SQL injection", value: "E" },
//         { label: "UNION query SQL injection", value: "U" },
//         { label: "Stacked queries SQL injection", value: "S" },
//         { label: "Time-based blind SQL injection", value: "T" },
//         { label: "Inline queries SQL injection", value: "Q" }
//     ];

//     const handleCheckboxChange = (event) => {
//         const value = event.target.value;
//         setSelectedTechniques((prev) =>
//             prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
//         );
//     };
//     return (
//         <div className="flex flex-col gap-4">
//             {/* File Uploads */}
//             <div className="flex items-center gap-8">
//                 {/* Upload URL File */}
//                 <div className="mt-4">
//                     <label className="block mb-1 text-[#04D2D2] font-semibold">Upload URL file</label>
//                     <input
//                         type="file"
//                         name="url"
//                         className="w-full sm:w-8/9 p-2 cursor-pointer rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
//                     />
//                 </div>

//                 {/* Upload Payload File */}
//                 <div className="mt-4">
//                     <label className="block mb-1 text-[#04D2D2] font-semibold">Upload payloads file</label>
//                     <input
//                         type="file"
//                         name="payloads"
//                         className="w-full sm:w-8/9 p-2 cursor-pointer rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
//                     />
//                 </div>
//             </div>

//             {/* Conditional Rendering for Proxy and Database Options */}
//             {cleanedPath === "SQLInjectionScanner" && (
//                 <>
//                     {/* Proxy Selection */}
//                     <div className="flex items-center gap-6">
//                         <span className="text-[#04D2D2] font-semibold">Enter Proxy (By Default is No)</span>
//                         <div className="flex gap-4">
//                             <label className="flex items-center gap-2">
//                                 <input
//                                     type="radio"
//                                     name="proxyOption"
//                                     value="No"
//                                     checked={proxy === "No"}
//                                     onChange={(e) => setProxy(e.target.value)}
//                                     className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
//                                 />
//                                 <span className="text-[#04D2D2]">No</span>
//                             </label>

//                             <label className="flex items-center gap-2">
//                                 <input
//                                     type="radio"
//                                     name="proxyOption"
//                                     value="Yes"
//                                     checked={proxy === "Yes"}
//                                     onChange={(e) => setProxy(e.target.value)}
//                                     className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
//                                 />
//                                 <span className="text-[#04D2D2]">Yes</span>
//                             </label>
//                         </div>
//                         {proxy === "Yes" && (
//                             <input
//                                 type="text"
//                                 placeholder="Enter Proxy"
//                                 className="w-ful sm:w-[300px] p-2 rounded-md text-white bg-[#0F172A] border border-[#4C566A]"
//                             // value={targetUrl}
//                             // onChange={(e) => setTargetUrl(e.target.value)}
//                             // disabled={isLoading}
//                             />
//                         )}
//                     </div>

//                     {/* Database Selection */}
//                     <div className="flex items-center gap-6">
//                         <span className="text-[#04D2D2] font-semibold">Would you like to extract database if vulnerable? Y/N</span>
//                         <div className="flex gap-4">
//                             <label className="flex items-center gap-2">
//                                 <input
//                                     type="radio"
//                                     name="databaseOption"
//                                     value="No"
//                                     checked={database === "No"}
//                                     onChange={(e) => setDatabase(e.target.value)}
//                                     className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
//                                 />
//                                 <span className="text-[#04D2D2]">No</span>
//                             </label>

//                             <label className="flex items-center gap-2">
//                                 <input
//                                     type="radio"
//                                     name="databaseOption"
//                                     value="Yes"
//                                     checked={database === "Yes"}
//                                     onChange={(e) => setDatabase(e.target.value)}
//                                     className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
//                                 />
//                                 <span className="text-[#04D2D2]">Yes</span>
//                             </label>
//                         </div>
//                     </div>
//                     <div className="flex flex-col gap-4">
//                         {/* Checkbox Selection for SQL Injection Techniques */}
//                         <div>
//                             <label className="block mb-2 text-[#04D2D2] font-bold">Select SQL Injection Techniques</label>
//                             <div className="flex flex-col gap-2">
//                                 {sqlInjectionTechniques.map((technique) => (
//                                     <label key={technique.value} className="flex items-center gap-2">
//                                         <input
//                                             type="checkbox"
//                                             value={technique.value}
//                                             checked={selectedTechniques.includes(technique.value)}
//                                             onChange={handleCheckboxChange}
//                                             className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-md checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
//                                         />
//                                         <span className="text-[#04D2D2]">{technique.label}</span>
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Display selected values */}
//                         <div className="text-[#04D2D2] font-semibold">Selected: {selectedTechniques.join(", ") || "None"}</div>
//                     </div>
//                 </>
//             )}
//         </div>
//     )
// }

// export default Custom_Selection


import React, { useState, useRef } from 'react';

const Custom_Selection = ({ cleanedPath, onCustomValuesChange }) => {
    const [proxy, setProxy] = useState("No");
    const [database, setDatabase] = useState("No");
    const [selectedTechniques, setSelectedTechniques] = useState([]);
    const [proxyValue, setProxyValue] = useState("");
    const [urlFileContent, setUrlFileContent] = useState(null);
    const [payloadsFileContent, setPayloadsFileContent] = useState(null);

    const urlFileInputRef = useRef(null);
    const payloadsFileInputRef = useRef(null);

    const sqlInjectionTechniques = [
        { label: "Boolean-based blind SQL injection", value: "B" },
        { label: "Error-based SQL injection", value: "E" },
        { label: "UNION query SQL injection", value: "U" },
        { label: "Stacked queries SQL injection", value: "S" },
        { label: "Time-based blind SQL injection", value: "T" },
        { label: "Inline queries SQL injection", value: "Q" }
    ];

    // const handleCheckboxChange = (event) => {
    //     const value = event.target.value;
    //     const updatedTechniques = prev =>
    //         prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];

    //     setSelectedTechniques(updatedTechniques);

    //     // Call the parent callback with updated values
    //     setTimeout(() => {
    //         onCustomValuesChange({
    //             proxy: proxy,
    //             proxyValue: proxy === "Yes" ? proxyValue : "",
    //             database: database,
    //             techniques: updatedTechniques(selectedTechniques),
    //             urlFileContent: urlFileContent,
    //             payloadsFileContent: payloadsFileContent
    //         });
    //     }, 0);
    // };

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedTechniques((prev) =>
            prev.includes(value) ? prev.replace(value, "") : prev + value
        );

        setTimeout(() => {
            onCustomValuesChange({
                proxy,
                proxyValue: proxy === "Yes" ? proxyValue : "",
                database,
                techniques: selectedTechniques.includes(value)
                    ? selectedTechniques.replace(value, "")
                    : selectedTechniques + value,
                urlFileContent,
                payloadsFileContent
            });
        }, 0);
    };

    const handleProxyChange = (value) => {
        setProxy(value);
        onCustomValuesChange({
            proxy: value,
            proxyValue: value === "Yes" ? proxyValue : "",
            database: database,
            techniques: selectedTechniques,
            urlFileContent: urlFileContent,
            payloadsFileContent: payloadsFileContent
        });
    };

    const handleDatabaseChange = (value) => {
        setDatabase(value);
        onCustomValuesChange({
            proxy: proxy,
            proxyValue: proxy === "Yes" ? proxyValue : "",
            database: value,
            techniques: selectedTechniques,
            urlFileContent: urlFileContent,
            payloadsFileContent: payloadsFileContent
        });
    };

    const handleProxyValueChange = (value) => {
        setProxyValue(value);
        onCustomValuesChange({
            proxy: proxy,
            proxyValue: value,
            database: database,
            techniques: selectedTechniques,
            urlFileContent: urlFileContent,
            payloadsFileContent: payloadsFileContent
        });
    };

    const handleUrlFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                // Parse content to array, assuming one URL per line
                const urls = content.split('\n').filter(url => url.trim());
                setUrlFileContent(urls);

                onCustomValuesChange({
                    proxy: proxy,
                    proxyValue: proxy === "Yes" ? proxyValue : "",
                    database: database,
                    techniques: selectedTechniques,
                    urlFileContent: urls,
                    payloadsFileContent: payloadsFileContent
                });
            };
            reader.readAsText(file);
        }
    };

    const handlePayloadsFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                // Parse content to array, assuming one payload per line
                const payloads = content.split('\n').filter(payload => payload.trim());
                setPayloadsFileContent(payloads);

                onCustomValuesChange({
                    proxy: proxy,
                    proxyValue: proxy === "Yes" ? proxyValue : "",
                    database: database,
                    techniques: selectedTechniques,
                    urlFileContent: urlFileContent,
                    payloadsFileContent: payloads
                });
            };
            reader.readAsText(file);
        }
    };

    const clearUrlFile = () => {
        setUrlFileContent(null);
        if (urlFileInputRef.current) {
            urlFileInputRef.current.value = "";
        }

        onCustomValuesChange({
            proxy: proxy,
            proxyValue: proxy === "Yes" ? proxyValue : "",
            database: database,
            techniques: selectedTechniques,
            urlFileContent: null,
            payloadsFileContent: payloadsFileContent
        });
    };

    const clearPayloadsFile = () => {
        setPayloadsFileContent(null);
        if (payloadsFileInputRef.current) {
            payloadsFileInputRef.current.value = "";
        }

        onCustomValuesChange({
            proxy: proxy,
            proxyValue: proxy === "Yes" ? proxyValue : "",
            database: database,
            techniques: selectedTechniques,
            urlFileContent: urlFileContent,
            payloadsFileContent: null
        });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* File Uploads */}
            <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Upload URL File */}
                <div className="mt-4 w-full md:w-auto">
                    <label className="block mb-1 text-[#04D2D2] font-semibold">Upload URL file</label>
                    <div className="flex flex-col gap-2">
                        <input
                            ref={urlFileInputRef}
                            type="file"
                            name="url"
                            onChange={handleUrlFileChange}
                            className="w-full p-2 cursor-pointer rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
                        />
                        {urlFileContent && (
                            <div className="flex flex-col gap-1">
                                <div className="text-sm text-[#04D2D2]">
                                    Loaded {urlFileContent.length} URLs
                                </div>
                                <button
                                    onClick={clearUrlFile}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                                >
                                    Clear File
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upload Payload File */}
                <div className="mt-4 w-full md:w-auto">
                    <label className="block mb-1 text-[#04D2D2] font-semibold">Upload payloads file</label>
                    <div className="flex flex-col gap-2">
                        <input
                            ref={payloadsFileInputRef}
                            type="file"
                            name="payloads"
                            onChange={handlePayloadsFileChange}
                            className="w-full p-2 cursor-pointer rounded-md text-white bg-[#0F172A] border border-[#4C566A] focus:outline-none focus:ring-2 focus:ring-[#04D2D2]"
                        />
                        {payloadsFileContent && (
                            <div className="flex flex-col gap-1">
                                <div className="text-sm text-[#04D2D2]">
                                    Loaded {payloadsFileContent.length} payloads
                                </div>
                                <button
                                    onClick={clearPayloadsFile}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                                >
                                    Clear File
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Conditional Rendering for Proxy and Database Options */}
            {cleanedPath === "SQLInjectionScanner" && (
                <>
                    {/* Proxy Selection */}
                    <div className="flex items-center gap-6">
                        <span className="text-[#04D2D2] font-semibold">Enter Proxy (By Default is No)</span>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="proxyOption"
                                    value="No"
                                    checked={proxy === "No"}
                                    onChange={(e) => handleProxyChange(e.target.value)}
                                    className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
                                />
                                <span className="text-[#04D2D2]">No</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="proxyOption"
                                    value="Yes"
                                    checked={proxy === "Yes"}
                                    onChange={(e) => handleProxyChange(e.target.value)}
                                    className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
                                />
                                <span className="text-[#04D2D2]">Yes</span>
                            </label>
                        </div>
                        {proxy === "Yes" && (
                            <input
                                type="text"
                                placeholder="Enter Proxy"
                                className="w-full sm:w-[300px] p-2 rounded-md text-white bg-[#0F172A] border border-[#4C566A]"
                                value={proxyValue}
                                onChange={(e) => handleProxyValueChange(e.target.value)}
                            />
                        )}
                    </div>

                    {/* Database Selection */}
                    <div className="flex items-center gap-6">
                        <span className="text-[#04D2D2] font-semibold">Would you like to extract database if vulnerable? Y/N</span>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="databaseOption"
                                    value="No"
                                    checked={database === "No"}
                                    onChange={(e) => handleDatabaseChange(e.target.value)}
                                    className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
                                />
                                <span className="text-[#04D2D2]">No</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="databaseOption"
                                    value="Yes"
                                    checked={database === "Yes"}
                                    onChange={(e) => handleDatabaseChange(e.target.value)}
                                    className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-full checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
                                />
                                <span className="text-[#04D2D2]">Yes</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {/* Checkbox Selection for SQL Injection Techniques */}
                        <div>
                            <label className="block mb-2 text-[#04D2D2] font-bold">Select SQL Injection Techniques</label>
                            <div className="flex flex-col gap-2">
                                {sqlInjectionTechniques.map((technique) => (
                                    <label key={technique.value} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value={technique.value}
                                            checked={selectedTechniques.includes(technique.value)}
                                            onChange={handleCheckboxChange}
                                            className="w-4 h-4 cursor-pointer appearance-none border-2 border-[#04D2D2] rounded-md checked:bg-[#04D2D2] checked:border-transparent transition-all duration-200"
                                        />
                                        <span className="text-[#04D2D2]">{technique.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Display selected values */}
                        {/* <div className="text-[#04D2D2] font-semibold">Selected: {selectedTechniques.join(", ") || "None"}</div> */}
                        <div className='text-[#04D2D2] font-semibold'>Selected: {selectedTechniques || "None"}</div>

                    </div>
                </>
            )}
        </div>
    );
};

export default Custom_Selection;