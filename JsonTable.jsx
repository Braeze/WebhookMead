import React from "react";
import JsonTableRow from "./JsonTableRow";

const JsonTable = ({ jsonData }) => {
  return (
    <div className="shadow-2xl rounded-lg border border-gray-200">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-indigo-600 text-white border-b border-gray-300">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider border-r border-gray-200">
              Key
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <JsonTableRow data={jsonData} />
        </tbody>
      </table>
    </div>
  );
};

export default JsonTable;
