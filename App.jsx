import React, { useState } from "react";
import JsonTable from "./JsonTable";

// JSON Data Examples
const jsonExamples = [
  {
    title: "User Profile",
    date: "2024-08-23",
    data: {
      id: 101,
      user: {
        name: "Alice Johnson",
        age: 29,
        email: "alice.johnson@example.com",
        isActive: true,
        profile: {
          username: "alicej",
          bio: "Software engineer and avid reader.",
          social: {
            twitter: "@alicej",
            linkedin: "alice-johnson-1234",
          },
          preferences: {
            theme: "dark",
            language: "English",
            notifications: {
              email: true,
              sms: false,
              push: true,
            },
          },
        },
      },
      orders: [
        {
          orderId: "A123",
          date: "2024-08-23",
          items: [
            { name: "Laptop", price: 1200, quantity: 1 },
            { name: "Mouse", price: 25, quantity: 2 },
          ],
          status: "Delivered",
        },
        {
          orderId: "B456",
          date: "2024-07-15",
          items: [
            { name: "Keyboard", price: 75, quantity: 1 },
            { name: "Monitor", price: 300, quantity: 1 },
          ],
          status: "Shipped",
        },
      ],
      subscription: {
        plan: "Premium",
        startDate: "2024-01-01",
        renewalDate: "2025-01-01",
      },
    },
  },
  {
    title: "Product Details",
    date: "2024-08-22",
    data: {
      productId: "P456",
      name: "Smartphone",
      price: 699,
      features: {
        screen: "6.5 inches",
        battery: "4500mAh",
        processor: "Snapdragon 888",
        storageOptions: ["128GB", "256GB"],
      },
      reviews: [
        {
          reviewer: "John Doe",
          rating: 4.5,
          comment: "Great phone with excellent battery life.",
        },
        {
          reviewer: "Jane Smith",
          rating: 4.0,
          comment: "Good performance but a bit pricey.",
        },
      ],
      warranty: {
        period: "2 years",
        coverage: "Manufacturer defects only",
      },
    },
  },
  {
    title: "Company Financials",
    date: "2024-08-21",
    data: {
      company: "Tech Innovations Inc.",
      financials: {
        revenue: "10M",
        profit: "2.5M",
        expenses: {
          salaries: "1.2M",
          rent: "500K",
          utilities: "100K",
        },
      },
      divisions: [
        {
          name: "Research & Development",
          budget: "3M",
          projects: [
            { projectId: "R&D-001", name: "AI Research", status: "Ongoing" },
            { projectId: "R&D-002", name: "Quantum Computing", status: "Completed" },
          ],
        },
        {
          name: "Marketing",
          budget: "2M",
          campaigns: [
            { campaignId: "MKT-001", name: "Summer Sale", status: "Completed" },
            { campaignId: "MKT-002", name: "Winter Campaign", status: "Planned" },
          ],
        },
      ],
      fiscalYear: "2024",
    },
  },
];

const App = () => {
  const [expandedEntries, setExpandedEntries] = useState({});

  const toggleExpand = (index) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
          JSON Data Viewer
        </h1>
        {jsonExamples.map((example, index) => (
          <div key={index} className="mb-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <div
              onClick={() => toggleExpand(index)}
              className="cursor-pointer p-6 border-b border-gray-200 flex justify-between items-center"
            >
              <h2 className="text-2xl font-bold text-indigo-800">{example.title}</h2>
              <span className="text-gray-600">
                {!expandedEntries[index] ? "[-]" : "[+]"}
              </span>
            </div>
            {!expandedEntries[index] && (
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  <strong>Date:</strong> {example.date}
                </p>
                <JsonTable jsonData={example.data} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
