import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../utils/constant";
import placeholderImg from "../assets/placeholder.svg";

type CreatePostProps = {
  onPostCreated: () => void;
};

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();

  const handlePost = async () => {
    const trimmedContent = postContent.trim();
    if (!trimmedContent) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BaseUrl}/post/create`,
        { postContent: trimmedContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setPostContent("");
        onPostCreated();
      } else if (response.data.status === 404) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Post error:", error);
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm">
      <div className="p-6 pt-8">
        <div className="flex space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <img
              src={placeholderImg}
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Input Field */}
          <div className="flex-1">
            <textarea
              placeholder="What do you want to talk about?"
              className="w-full min-h-[80px] resize-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handlePost}
                disabled={!postContent.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0077b5] rounded-md transition hover:bg-[#005582] focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-[#0077b5] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
