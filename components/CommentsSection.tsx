import React, { useState } from 'react';

// Updated Comment interface to support nesting
interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
    parentId?: number | null;
    replies: Comment[];
}

// Updated initial data with a nested reply for demonstration
const initialCommentsData: Comment[] = [
    { 
        id: 1, 
        author: 'Jane Doe', 
        text: 'This is a fantastic analysis. Really clarifies the current state of the industry.', 
        date: '2 days ago',
        parentId: null,
        replies: [
            { 
                id: 3, 
                author: 'Mark Johnson', 
                text: 'Agreed! I shared this with my team.', 
                date: '2 days ago',
                parentId: 1,
                replies: [],
            },
        ],
    },
    { 
        id: 2, 
        author: 'John Smith', 
        text: 'I have a slightly different take on this. I think the impact will be much larger than predicted.', 
        date: '1 day ago',
        parentId: null,
        replies: [],
    },
];

// Reusable component for both top-level and reply forms
interface CommentFormProps {
    onSubmit: (author: string, text: string) => void;
    onCancel?: () => void;
    placeholderText?: string;
    submitLabel: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, onCancel, placeholderText = "Join the discussion...", submitLabel }) => {
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() && author.trim()) {
            onSubmit(author, text);
            setText('');
            setAuthor('');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                 <label htmlFor={`author-${submitLabel}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                 <input 
                    type="text" 
                    id={`author-${submitLabel}`}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Alex Chen"
                    required
                />
            </div>
            <div>
                 <label htmlFor={`comment-${submitLabel}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Comment</label>
                <textarea 
                    id={`comment-${submitLabel}`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholderText}
                    required
                />
            </div>
            <div className="flex items-center justify-end gap-2">
                {onCancel && (
                    <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                )}
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
};

// Component to render a single comment and its replies recursively
interface CommentItemProps {
    comment: Comment;
    onReply: (parentId: number, author: string, text: string) => void;
    activeReplyId: number | null;
    setActiveReplyId: (id: number | null) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply, activeReplyId, setActiveReplyId }) => {
    const isReplying = activeReplyId === comment.id;

    const handleReplySubmit = (author: string, text: string) => {
        onReply(comment.id, author, text);
        setActiveReplyId(null);
    };

    return (
        <div className="flex items-start space-x-4">
             <img 
                src={`https://i.pravatar.cc/150?u=${comment.author}`} 
                alt={comment.author}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg rounded-tl-none">
                    <div className="flex items-baseline gap-2">
                        <p className="font-bold text-gray-900 dark:text-white">{comment.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.text}</p>
                </div>
                <div className="mt-2 text-xs font-semibold">
                    <button onClick={() => setActiveReplyId(isReplying ? null : comment.id)} className="text-blue-500 hover:underline">
                        {isReplying ? 'Cancel' : 'Reply'}
                    </button>
                </div>

                {isReplying && (
                    <div className="mt-4">
                        <CommentForm 
                            onSubmit={handleReplySubmit} 
                            onCancel={() => setActiveReplyId(null)}
                            submitLabel="Post Reply"
                            placeholderText={`Replying to ${comment.author}...`}
                        />
                    </div>
                )}
                
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                        {comment.replies.map(reply => (
                            <CommentItem 
                                key={reply.id} 
                                comment={reply} 
                                onReply={onReply}
                                activeReplyId={activeReplyId}
                                setActiveReplyId={setActiveReplyId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


// Main CommentsSection component, now manages the nested state
const CommentsSection: React.FC<{ articleId: string }> = ({ articleId }) => {
    const [comments, setComments] = useState<Comment[]>(initialCommentsData);
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

    const handleAddComment = (author: string, text: string) => {
        const newComment: Comment = {
            id: Date.now(),
            author,
            text,
            date: 'Just now',
            parentId: null,
            replies: [],
        };
        setComments([newComment, ...comments]);
    };

    const handleAddReply = (parentId: number, author: string, text: string) => {
        const newReply: Comment = {
            id: Date.now(),
            author,
            text,
            date: 'Just now',
            parentId,
            replies: [],
        };

        const addReplyToComment = (commentsList: Comment[]): Comment[] => {
            return commentsList.map(comment => {
                if (comment.id === parentId) {
                    return { ...comment, replies: [newReply, ...comment.replies] };
                }
                if (comment.replies.length > 0) {
                    return { ...comment, replies: addReplyToComment(comment.replies) };
                }
                return comment;
            });
        };

        setComments(addReplyToComment(comments));
    };

    const countComments = (commentsList: Comment[]): number => {
        let count = 0;
        for (const comment of commentsList) {
            count += 1 + countComments(comment.replies);
        }
        return count;
    };
    
    const totalComments = countComments(comments);

    return (
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Discussion ({totalComments})</h2>
            
            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-4">Leave a Comment</h3>
                <CommentForm onSubmit={handleAddComment} submitLabel="Post Comment" />
            </div>

            <div className="space-y-6">
                {comments.map(comment => (
                    <CommentItem 
                        key={comment.id}
                        comment={comment}
                        onReply={handleAddReply}
                        activeReplyId={activeReplyId}
                        setActiveReplyId={setActiveReplyId}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;
