// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import type { Submission } from '../../types';

const SubmissionsChart: React.FC = () => {
  const { submissions } = useAdmin();

  const data = React.useMemo(() => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    }).reverse();

    const dailyCounts = last7Days.map(date => {
      const count = submissions.filter(sub => {
        const subDate = new Date(sub.timestamp);
        return subDate.getFullYear() === date.getFullYear() &&
               subDate.getMonth() === date.getMonth() &&
               subDate.getDate() === date.getDate();
      }).length;
      return {
        date,
        count
      };
    });

    return dailyCounts;
  }, [submissions]);

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Submissions (Last 7 Days)</h3>
      <div className="flex justify-between items-end h-64 space-x-2 pt-4">
        {data.map(({ date, count }) => (
          <div key={date.toISOString()} className="flex-1 h-full flex flex-col items-center justify-end group">
            <div 
              className="w-full bg-brand-blue rounded-t-md transition-all duration-300 group-hover:bg-brand-gold relative"
              style={{ height: `${(count / maxCount) * 100}%` }}
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-gray-700 dark:text-gray-200 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {count}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsChart;
