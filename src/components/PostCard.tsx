import { useState } from "react";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import axios from "axios";
import BaseUrl from "../utils/constant";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  id: number;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const PostCard = ({
  id,
  author,
  content,
  timestamp,
  likes,
  comments,
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleShare = async (id: number) => {
    try {
      await navigator.clipboard.writeText(
        `https://linkedin-clone-frontend-sage.vercel.app/post/${id}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleLike = async (postId: any) => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BaseUrl}/post/updatelike`,
        {
          postId,
          like: !isLiked,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  return (
    <div className="mb-4 hover:shadow-md transition-shadow rounded-lg border border-[#e5e7eb] bg-[#ffffff] text-[#0a0a0a] shadow-sm">
      <div className="pb-3 flex flex-col space-y-1.5 p-6">
        <div className="flex items-start justify-between">
          <div className="flex space-x-3">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                src={author.avatar || "/placeholder.svg"}
                alt="Image not found"
              />
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f4f4f5]">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#0a0a0a]">{author.name}</h3>
              <p className="text-sm text-[#6b7280]">{author.title}</p>
              <p className="text-xs text-[#6b7280]">
                {new Date(timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          <button className="h-9 rounded-md px-3 hover:bg-[#e5f4fb] hover:text-[#0a0a0a] inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-[#ffffff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077b5] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="pt-0 p-6">
        <p className="text-[#0a0a0a] mb-4 leading-relaxed">{content}</p>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm text-[#6b7280] mb-3 pb-3 border-b border-[#e5e7eb]">
          <span>{likeCount} likes</span>
          <span>{comments} comments</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleLike(id)}
            className={`flex-1 ${
              isLiked ? "text-[#0077b5]" : "text-[#6b7280]"
            } hover:bg-[#e5f4fb] hover:text-[#0a0a0a] h-9 rounded-md px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-[#ffffff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077b5] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer`}
          >
            <ThumbsUp
              className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
            />
            Like
          </button>

          <button
            onClick={() => navigate(`/post/${id}`)}
            className="flex-1 text-[#6b7280] hover:bg-[#f1f2f3] hover:text-[#0a0a0a] h-9 rounded-md px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-[#ffffff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077b5] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </button>

          <button
            onClick={() => handleShare(id)}
            className="flex-1 text-[#6b7280] hover:bg-[#f1f2f3] hover:text-[#0a0a0a] h-9 rounded-md px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-[#ffffff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077b5] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {copied ? "Link Copied!" : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
