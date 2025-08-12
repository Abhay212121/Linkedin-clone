import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../utils/constant";

interface FeedProps {
  placeholderImg?: string;
}

type Post = {
  post_id: number;
  user_name: string;
  user_jobrole: string;
  post_content: string;
  created_at: string;
  like_count: number;
  avatar: string;
  img_url: string;
};

const Feed: React.FC<FeedProps> = ({ placeholderImg }) => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [job, setJob] = useState("");
  const [org, setOrg] = useState("");
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [location, setLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmitJobInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BaseUrl}/user/updateprofile`,
        { job, org, location, about, skills },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.data.status === 200) {
        setPopup(false);
        localStorage.setItem("job", response.data.job);
        navigate("/");
        getPosts();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
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
      const response = await axios.get(`${BaseUrl}/post/getposts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data.status === 404) {
        setPopup(true);
      } else if (response.data.status === 200) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Free reverse geocoding (Nominatim - OpenStreetMap)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";
          const country = data.address.country || "";
          setLocation(`${city}, ${country}`);
        } catch {
          alert("Could not retrieve location name.");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        alert("Unable to retrieve your location.");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <>
      {/* Profile Completion Popup */}
      {popup && (
        // {true && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {step === 1 ? "Complete your profile" : "Tell us more about you"}
            </h2>

            {step === 1 && (
              <>
                <p className="text-sm text-gray-500">
                  Please tell us about your current role.
                </p>

                <input
                  type="text"
                  placeholder="Your Job Role"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Organization"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Location"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer"
                    disabled={loadingLocation}
                  >
                    {loadingLocation ? "..." : "📍"}
                  </button>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!job || !org || !location}
                  className="w-full px-4 py-2 bg-blue-600 text-white disabled:bg-blue-300 disabled:cursor-not-allowed rounded hover:bg-blue-700 transition cursor-pointer"
                >
                  Next →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <textarea
                  placeholder="About you"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmitJobInfo}
                    disabled={!about || !skills}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white disabled:bg-blue-300 disabled:cursor-not-allowed rounded hover:bg-blue-700 transition cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 mx-auto max-w-2xl mt-6">
        <CreatePost
          onPostCreated={getPosts}
          placeholderImg={placeholderImg}
        />

        <div className="space-y-4 mt-6">
          {posts ? (
            posts.map((post: any) => (
              <PostCard
                key={post.post_id}
                id={post.post_id}
                author={{
                  name: post.user_name,
                  title: post.user_jobrole,
                  avatar: post.avatar,
                }}
                content={post.post_content}
                timestamp={post.created_at}
                likes={post.like_count}
                comments={post.comments_count}
                img_url={post.img_url}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 min-h-[20vh]">
              Loading posts...
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Feed;
