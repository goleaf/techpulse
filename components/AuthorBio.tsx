import React from 'react';

interface AuthorBioProps {
    authorName: string;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ authorName }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-lg flex items-center gap-6">
            <img 
                src={`https://i.pravatar.cc/150?u=${authorName}`} 
                alt={authorName}
                className="w-20 h-20 rounded-full object-cover"
            />
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Written by</p>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{authorName}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {authorName} is a leading voice in technology journalism, specializing in AI and software development. When not writing, they enjoy exploring the latest in open-source projects.
                </p>
            </div>
        </div>
    );
};

export default AuthorBio;
