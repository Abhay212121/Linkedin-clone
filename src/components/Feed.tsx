import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Post = {
  post_id: number;
  user_name: string;
  user_jobrole: string;
  post_content: string;
  created_at: string;
  like_count: number;
};

const Feed = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [job, setJob] = useState("");
  const [org, setOrg] = useState("");
  const [posts, setPosts] = useState<Post[] | null>(null);

  const handleSubmitJobInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/user/updateprofile",
        { job, org },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.data.status === 200) {
        setPopup(false);
        localStorage.setItem("job", response.data.job);
      }
    } catch (error) {
      console.log("Error updating job info:", error.message);
    }
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const getPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:3000/post/getposts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data.status === 404) {
        setPopup(true);
      } else if (response.data.status === 200) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Complete your profile
            </h2>
            <p className="text-sm text-gray-500">
              Please tell us about your current role.
            </p>

            <input
              type="text"
              placeholder="Your Job Role"
              className="w-full border cursor-pointer border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />

            <input
              type="text"
              placeholder="Organization"
              className="w-full border border-gray-300 cursor-pointer rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            />

            <button
              onClick={handleSubmitJobInfo}
              className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 transition w-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <main className="flex-1 max-w-2xl">
        <CreatePost onPostCreated={getPosts} />
        <div className="space-y-0">
          {posts ? (
            posts.map((post: any) => (
              <PostCard
                key={post.post_id}
                id={post.post_id}
                author={{
                  name: post.user_name,
                  title: post.user_jobrole,
                  avatar: "/placeholder.svg",
                }}
                content={post.post_content}
                timestamp={post.created_at}
                likes={post.like_count}
                comments={post.like_count}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Loading posts...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Feed;
