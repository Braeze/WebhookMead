import React, { useState } from "react";

const JsonTableRow = ({ data, level = 0 }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (typeof data !== "object" || data === null) {
    // If data is a primitive value, display it in a single row
    return (
      <tr className="border-b bg-white hover:bg-indigo-50 transition duration-300">
        <td
          colSpan={2}
          className="px-6 py-4 text-gray-800 border-r border-gray-200"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {String(data)}
        </td>
      </tr>
    );
  }

  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <React.Fragment key={key}>
          <tr
            className="border-b bg-white even:bg-gray-100 hover:bg-indigo-50 transition duration-300 cursor-pointer"
            onClick={() => typeof value === "object" && value !== null && toggleExpand(key)}
          >
            <td
              className="px-6 py-4 font-medium text-black border-r border-gray-200"
              style={{ paddingLeft: `${level * 20}px`, paddingRight: '10px' }}
            >
             {key}

              {typeof value === "object" && value !== null ? (
                <span className="mr-2 text-xl text-black">
                  {expanded[key] ? "-" : "+"}
                </span>
              ) : null}
            </td>
            <td className="px-6 py-4 text-gray-700">
              {typeof value === "object" && value !== null
                ? Array.isArray(value)
                  ? "[Array]"
                  : "[Object]"
                : String(value)}
            </td>
          </tr>
          {expanded[key] && <JsonTableRow data={value} level={level + 1} />}
        </React.Fragment>
      ))}
    </>
  );
};

export default JsonTableRow;
