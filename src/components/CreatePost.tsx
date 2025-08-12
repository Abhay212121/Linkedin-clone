import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../utils/constant";
import { Image, Loader2, X } from "lucide-react";

interface CreatePostProps {
  onPostCreated: () => void;
  placeholderImg?: string;
}

const CreatePost: React.FC<CreatePostProps> = ({
  onPostCreated,
  placeholderImg,
}) => {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImgUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
    event.target.value = "";
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handlePost = async () => {
    const trimmedContent = postContent.trim();
    if (!trimmedContent && !image) return;

    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      //create form data
      const formData = new FormData();
      formData.append("postContent", trimmedContent);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(`${BaseUrl}/post/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === 200) {
        setPostContent("");
        setPreview("");
        onPostCreated();
      } else if (response.data.status === 404) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Post error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm">
      <div className="p-6 pt-8">
        <div className="flex space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <img
              src={placeholderImg || "/placeholder.svg"}
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
            {preview && (
              <div className="mt-4 relative inline-block max-w-full">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 sm:max-h-80 rounded-lg object-cover border border-gray-200 shadow-sm"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setPreview("");
                  }}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-transform hover:scale-110"
                >
                  <X className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  onClick={handleImgUpload}
                  className="flex items-center cursor-pointer text-gray-500 hover:text-gray-900 text-sm font-medium px-3 py-2 rounded-md"
                >
                  <Image className="h-5 w-5 mr-2" />
                  Photo
                </button>
              </div>
              <button
                onClick={handlePost}
                disabled={!!((!postContent.trim() && !image) || loading)}
                className={`py-2 text-sm font-medium text-white bg-[#0077b5] relative rounded-md transition hover:bg-[#005582] focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-[#0077b5] disabled:opacity-50 disabled:cursor-not-allowed 
    ${loading ? "pl-8 pr-4" : "px-4"}`}
              >
                {loading && (
                  <Loader2 className="w-4 h-4 absolute top-1/2 left-2 -translate-y-1/2 animate-spin" />
                )}
                Post
              </button>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
