import React from "react";
import { Link } from "react-router-dom";

const PlanDetails = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white">
      {/* Plan Header */}
      <div className="border border-gray-200 rounded-md p-6 mb-6">
        <div className="mb-1 text-gray-500 text-sm">Plan</div>
        <div className="flex items-center gap-3">
          <div className="text-2xl font-medium">Free</div>
          <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded uppercase font-medium">
            FOREVER
          </div>
        </div>
      </div>

      {/* Change Plan Button */}
      <div className="mb-8">
        <Link to="/plans&pricing">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium px-4 py-2 text-sm rounded">
            Change plan
          </button>
        </Link>
      </div>

      {/* Plan Stats */}
      <div className="mb-8">
        <h2 className="text-gray-700 font-medium mb-4">Plan stats</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Added Assets */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-gray-500 text-sm mb-1">Added assets</div>
            <div className="flex items-baseline">
              <span className="text-xl font-medium mr-1">1</span>
              <span className="text-gray-400 text-sm">/100</span>
            </div>
          </div>

          {/* Running Scans */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-gray-500 text-sm mb-1">Running scans</div>
            <div className="flex items-baseline">
              <span className="text-xl font-medium mr-1">0</span>
              <span className="text-gray-400 text-sm">/2</span>
            </div>
          </div>

          {/* Waiting Scans */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-gray-500 text-sm mb-1">Waiting scans</div>
            <div className="flex items-baseline">
              <span className="text-xl font-medium mr-1">0</span>
              <span className="text-gray-400 text-sm">/100</span>
            </div>
          </div>

          {/* Active Scheduled Scans */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-gray-500 text-sm mb-1">
              Active scheduled scans
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-medium mr-1">0</span>
              <span className="text-gray-400 text-sm">/25</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scanned Assets Usage */}
      <div className="mb-8">
        <h2 className="text-gray-700 font-medium mb-4">Scanned assets usage</h2>

        <div className="bg-blue-50 p-6 rounded-md">
          <div className="flex items-center mb-1">
            <div className="text-gray-600 mr-2">
              Number of scanned assets during this scan cycle
            </div>
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
              ?
            </div>
          </div>
          <div className="text-gray-500 text-sm mb-6">
            Mar 9, 2025 - Apr 9, 2025
          </div>

          {/* Progress Bar */}
          <div className="relative pt-4">
            <div className="h-2 bg-gray-200 rounded-full w-full mb-1"></div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <div>0</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
            <div className="absolute top-0 right-0 text-gray-500 text-sm">
              0 / 5
            </div>
          </div>
        </div>
      </div>

      {/* Plan Features */}
      <div>
        <h2 className="text-gray-700 font-medium mb-4">Plan features</h2>

        <div className="bg-gray-50 p-6 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Available Features */}
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-blue-600">Medium business scope</span>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-blue-600">Up to 2 parallel scans</span>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-blue-600">
                Two-Factor Authentication (2FA)
              </span>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-blue-600">
                Simple reports (PDF, HTML, CSV)
              </span>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-blue-600">
                Save scan data for up to 30 days
              </span>
            </div>

            {/* Unavailable Features */}
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-500">Wordlists</span>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-500">Free Tools</span>
            </div>

            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-500">Deep Tools</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
