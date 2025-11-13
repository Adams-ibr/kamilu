
import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  headers: string[];
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, headers }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map(header => (
              <th key={header} scope="col" className="px-6 py-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 animate-pulse">
              {headers.map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
