import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CreatePostProps = {
  onPostCreated: () => void;
};

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();

  const handlePost = async () => {
    if (postContent.trim()) {
      console.log("Posting:", postContent);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `https://linkedin-clone-backend-xrxp.onrender.com/post/create`,
          { postContent },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.status === 200) {
          setPostContent("");
          onPostCreated();
        } else if (response.data.status === 404) {
          localStorage.clear();
          navigate("/login");
        }
      } catch (error) {
        console.log(`err:`, error.message);
      }
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-[#e5e7eb] bg-[#ffffff] text-[#0a0a0a] shadow-sm">
      <div className="p-6 pt-8">
        <div className="flex space-x-3">
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img
              className="aspect-square h-full w-full"
              src="/placeholder.svg"
              alt="img not found"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#f4f4f5]" />
          </div>
          <div className="flex-1">
            <textarea
              placeholder="What do you want to talk about?"
              className="w-full min-h-[80px] resize-none rounded-md border border-[#e5e7eb] bg-[#f7f9fa] px-3 py-2 text-sm placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2 focus:ring-offset-[#f7f9fa] disabled:cursor-not-allowed disabled:opacity-50"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handlePost}
                disabled={!postContent.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0077b5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#005582] focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2 focus:ring-offset-[#f7f9fa] disabled:pointer-events-none disabled:opacity-50"
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
