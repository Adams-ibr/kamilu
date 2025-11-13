// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';

interface SERPPreviewProps {
  title: string;
  metaDescription: string;
  slug: string;
}

const TITLE_LIMIT = 60;
const DESC_LIMIT = 160;

const getLengthColor = (length: number, limit: number) => {
    const percentage = (length / limit) * 100;
    if (percentage > 100) return 'text-red-500';
    if (percentage > 85) return 'text-yellow-500';
    return 'text-green-500';
};

const getBgColor = (length: number, limit: number) => {
    const percentage = (length / limit) * 100;
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 85) return 'bg-yellow-500';
    return 'bg-green-500';
}

const SERPPreview: React.FC<SERPPreviewProps> = ({ title, metaDescription, slug }) => {
    const displayTitle = title || 'Your Blog Post Title';
    const displayDescription = metaDescription || 'Enter a meta description to see how it looks in search results. A good description is concise and invites users to click.';
    const displayUrl = `www.kamiluwelding.com/blog/${slug || 'new-post'}`;

    return (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600">
            <div className="font-sans">
                <p className="text-sm text-gray-800 dark:text-gray-200 truncate">{displayUrl}</p>
                <h3 className="text-blue-800 dark:text-blue-400 text-xl hover:underline truncate">
                    {displayTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {displayDescription}
                </p>
            </div>
            <div className="mt-4 pt-3 border-t dark:border-gray-600 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                 <div className="flex justify-between items-center">
                    <span>Title length:</span>
                    <span className={getLengthColor(title.length, TITLE_LIMIT)}>
                        {title.length} / {TITLE_LIMIT}
                    </span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-600">
                    <div className={`h-1.5 rounded-full ${getBgColor(title.length, TITLE_LIMIT)}`} style={{ width: `${Math.min((title.length / TITLE_LIMIT) * 100, 100)}%` }}></div>
                </div>

                 <div className="flex justify-between items-center pt-2">
                    <span>Description length:</span>
                    <span className={getLengthColor(metaDescription.length, DESC_LIMIT)}>
                        {metaDescription.length} / {DESC_LIMIT}
                    </span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-600">
                    <div className={`h-1.5 rounded-full ${getBgColor(metaDescription.length, DESC_LIMIT)}`} style={{ width: `${Math.min((metaDescription.length / DESC_LIMIT) * 100, 100)}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default SERPPreview;
