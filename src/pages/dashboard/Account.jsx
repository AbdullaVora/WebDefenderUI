import React, { useState } from "react";
import PlanDetails from "../../components/Account/PlanDetails";

const Account = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Kaif Shah",
    email: "kaifsh011@gmail.com",
    company: "",
    size: "",
    jobRole: "",
    country: "India",
    timeZone: "UTC+0530",
    scanDeletion: "Never delete",
  });

  const [avatar, setAvatar] = useState("KS");
  const [avatarColor, setAvatarColor] = useState("bg-red-200 text-red-500");
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const avatarColors = [
    "bg-red-200 text-red-500",
    "bg-blue-200 text-blue-500",
    "bg-green-200 text-green-500",
    "bg-purple-200 text-purple-500",
    "bg-yellow-200 text-yellow-500",
    "bg-pink-200 text-pink-500",
  ];

  const tabs = [
    {
      id: "user-settings",
      label: "User settings",
      icon: "⚙️",
      subtabs: [{ id: "overview", label: "Overview" }],
    },
    {
      id: "plan-details",
      label: "Plan details & billing",
      icon: "📄",
      subtabs: [
        { id: "active-plan", label: "Active plan" },
        { id: "invoices", label: "Invoices & billing" },
        { id: "scanned-assets", label: "Scanned assets" },
        { id: "scan-history", label: "Scan history" },
      ],
    },
    {
      id: "security",
      label: "Security",
      icon: "🔒",
      subtabs: [
        { id: "general", label: "General" },
        { id: "login-history", label: "Login history" },
      ],
    },
    {
      id: "api",
      label: "API",
      icon: "📱",
      subtabs: [{ id: "rest-api", label: "REST API" }],
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const changeAvatar = (color) => {
    setAvatarColor(color);
    setShowAvatarModal(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            {/* Profile section */}
            <div className="flex justify-between items-start mb-8">
              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-medium text-gray-800">
                      {userData.name}
                    </h2>
                    <p className="text-gray-500 text-sm">{userData.email}</p>
                  </>
                )}
              </div>
              <div className="flex items-center">
                {/* Profile avatar */}
                <div
                  className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center font-medium cursor-pointer`}
                  onClick={() => !isEditing && setShowAvatarModal(true)}
                >
                  {avatar}
                </div>
              </div>
            </div>

            <div className="mb-3">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                    onClick={handleSaveProfile}
                  >
                    Save changes
                  </button>
                  <button
                    className="px-3 py-1.5 border border-gray-300 text-gray-600 text-sm font-medium rounded hover:bg-gray-100 transition"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium rounded hover:bg-yellow-200 transition"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit profile
                  </button>
                  <button
                    className="px-3 py-1.5 text-gray-500 text-sm font-medium rounded hover:bg-gray-100 transition ml-2"
                    onClick={() => setShowAvatarModal(true)}
                  >
                    Change avatar
                  </button>
                </>
              )}
            </div>

            {/* Company details section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-800">
                  Company details
                </h3>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Company</p>
                  <p className="text-sm text-gray-800">
                    {userData.company || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Size</p>
                  <p className="text-sm text-gray-800">
                    {userData.size || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Job role</p>
                  <p className="text-sm text-gray-800">
                    {userData.jobRole || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Location section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-800">Location</h3>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Country</p>
                  <p className="text-sm text-gray-800">{userData.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Time zone</p>
                  <p className="text-sm text-gray-800">{userData.timeZone}</p>
                </div>
              </div>
            </div>

            {/* Scans deletion section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-800">
                  Scans deletion
                </h3>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Edit
                </button>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Scans deletion</p>
                <p className="text-sm text-gray-800">{userData.scanDeletion}</p>
              </div>
            </div>
          </div>
        );

      case "active-plan":
        return <PlanDetails />;

      case "invoices":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Invoices & Billing</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No invoices available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case "scanned-assets":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Scanned Assets</h2>
            <div className="text-sm text-gray-500">No scanned assets found</div>
          </div>
        );

      case "scan-history":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Scan History</h2>
            <div className="text-sm text-gray-500">
              No scan history available
            </div>
          </div>
        );

      case "general":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Password</h3>
                <button className="px-3 py-1.5 border border-gray-300 text-gray-600 text-sm font-medium rounded hover:bg-gray-100 transition">
                  Change password
                </button>
              </div>

              <div>
                <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Add an extra layer of security to your account
                </p>
                <button className="px-3 py-1.5 border border-gray-300 text-gray-600 text-sm font-medium rounded hover:bg-gray-100 transition">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        );

      case "login-history":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Login History</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Mar 16, 2025 10:30 AM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      192.168.1.1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Chrome / Windows
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Mumbai, India
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case "rest-api":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">API Keys</h2>
            <p className="text-sm text-gray-600 mb-4">
              Manage your API keys to integrate with our services
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Generate API Key
            </button>
            <div className="mt-6">
              <div className="text-sm text-gray-500">No API keys found</div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
              Select a tab from the sidebar
            </h2>
            <p className="text-sm text-gray-600">
              Choose an option from the left sidebar to view its contents.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-800">My account</h1>
        </div>
      </div>

      <div className="flex flex-1 container mx-auto mt-6 px-4">
        {/* Left sidebar with tabs */}
        <div className="w-64 border-r border-gray-200 pr-4">
          {tabs.map((tab) => (
            <div key={tab.id} className="mb-4">
              <div className="flex items-center text-gray-600 font-medium mb-2">
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              <div className="ml-7">
                {tab.subtabs.map((subtab) => (
                  <div
                    key={subtab.id}
                    className={`py-2 px-3 rounded-md cursor-pointer mb-1 text-sm ${
                      activeTab === subtab.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(subtab.id)}
                  >
                    {subtab.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main content area */}
        <div className="flex-1 pl-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Avatar change modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-medium mb-4">Change Avatar</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {avatarColors.map((color, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-full ${color} flex items-center justify-center font-medium cursor-pointer`}
                  onClick={() => changeAvatar(color)}
                >
                  {avatar}
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
                onClick={() => setShowAvatarModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
