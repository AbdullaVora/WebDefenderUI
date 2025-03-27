import React, { useState } from 'react';

const PricingPlan = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  const plans = [
    {
      name: "Free",
      assets: 5,
      parallelScans: 2,
      priceMonthly: 0,
      features: [
        "Save scan data for up to 30 days",
        "Some tools included",
        "Small business scope",
        "Simple reporting",
        "Two-Factor Authentication"
      ],
      current: true,
      color: "bg-green-50",
      buttonColor: "bg-green-200 text-green-800"
    },
    {
      name: "Basic",
      assets: 5,
      parallelScans: 2,
      priceMonthly: 6627,
      originalPrice: 7797,
      features: [
        "Everything in Free",
        "All tools included",
        "Light, Deep and Custom modes",
        "Automation capabilities",
        "Multiple workspaces",
        "Manual findings",
        "Continuous security monitoring"
      ],
      color: "bg-blue-50",
      buttonColor: "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
    },
    {
      name: "Advanced",
      assets: 50,
      parallelScans: 5,
      priceMonthly: 14815,
      originalPrice: 17429,
      features: [
        "Everything in Basic",
        "Medium business scope",
        "Scan behind logged in",
        "Scan internal networks",
        "Advanced reporting"
      ],
      color: "bg-indigo-50",
      buttonColor: "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
    },
    {
      name: "Teams",
      assets: 500,
      parallelScans: 10,
      priceMonthly: 30800,
      originalPrice: 36235,
      features: [
        "Everything in Advanced",
        "Large business scope",
        "API access",
        "White label reports",
        "Multi-user access",
        "Integrations",
        "Premium support",
        "Additional payment methods"
      ],
      color: "bg-purple-50",
      buttonColor: "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
    }
  ];

  const formatPrice = (price) => {
    if (price === 0) return "₹0";
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className=" mx-auto p-4 bg-white">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Change plan</h1>
      </div>

      <div className="flex justify-between mb-8">
        <div className="inline-flex bg-gray-200 rounded-full p-1">
          <button
            className={`px-4 py-2 rounded-full ${
              billingCycle === 'monthly' ? 'bg-white shadow-sm' : ''
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-full flex items-center ${
              billingCycle === 'yearly' ? 'bg-white shadow-sm' : ''
            }`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
            <span>Explore our Services</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`rounded-lg border overflow-hidden transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${plan.current ? plan.color : 'bg-gray-50'}`}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h2>
              <div className="space-y-1 text-sm text-gray-600 mb-6">
                <p>Up to {plan.assets} assets</p>
                <p>Up to {plan.parallelScans} parallel scans</p>
              </div>

              {plan.originalPrice && (
                <div className="text-gray-500 line-through text-sm">₹{plan.originalPrice.toLocaleString('en-IN')}</div>
              )}
              
              <div className="flex items-baseline mb-4">
                <div className="text-2xl font-bold">{formatPrice(plan.priceMonthly)}</div>
                <div className="text-gray-500 ml-1">/month</div>
              </div>

              {plan.current ? (
                <button className={`w-full py-2 rounded-md font-medium ${plan.buttonColor}`}>
                  Current plan
                </button>
              ) : (
                <button className={`w-full py-2 rounded-md font-medium ${plan.buttonColor}`}>
                  Upgrade to {plan.name}
                </button>
              )}
            </div>
            
            <div className="p-6 pt-0">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Creative addition: Feature comparison section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Feature</th>
                {plans.map(plan => (
                  <th key={plan.name} className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Assets</td>
                {plans.map(plan => (
                  <td key={plan.name} className="py-3 px-4 text-center text-sm text-gray-600">
                    {plan.assets}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Parallel Scans</td>
                {plans.map(plan => (
                  <td key={plan.name} className="py-3 px-4 text-center text-sm text-gray-600">
                    {plan.parallelScans}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Data Retention</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">30 days</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">90 days</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">180 days</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">365 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700">Advanced Security</td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">
                  <span className="text-red-500">✗</span>
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Creative addition: FAQ section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">What happens if I exceed my asset limit?</h3>
            <p className="text-gray-600 text-sm">You'll be notified when you're approaching your limit. You can upgrade your plan at any time to increase your asset allowance.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Can I switch between plans?</h3>
            <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Is there a trial period for paid plans?</h3>
            <p className="text-gray-600 text-sm">We offer a 14-day trial for all paid plans. Contact our sales team for more information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;