import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Header from "./Header";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<{
    author: {
      name: string;
      title: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
  } | null>(null);

  const comments = [
    {
      id: 1,
      text: "This is very insightful!",
      author: "Alice Smith",
    },
    {
      id: 2,
      text: "Thanks for sharing your thoughts.",
      author: "Bob Johnson",
    },
    {
      id: 3,
      text: "I totally agree with you.",
      author: "Charlie Brown",
    },
  ];

  useEffect(() => {
    // Simulated fetch – replace with real API later
    const mockPost = {
      author: {
        name: "John Doe",
        title: "Software Engineer at TechCorp",
        avatar: "/placeholder.svg",
      },
      content: "Just started learning React and it's amazing!",
      timestamp: "2 hours ago",
      likes: 23,
      comments: comments.length,
    };

    setPost(mockPost);
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-8 px-4">
        {/* Post */}
        <PostCard {...post} />

        {/* Commets */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 p-4 rounded-lg border border-[#e5e7eb] bg-[#f9f9f9]"
            >
              <p className="text-sm text-[#0a0a0a]">{comment.text}</p>
              <p className="text-xs text-[#6b7280] mt-1">By {comment.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
