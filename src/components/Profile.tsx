import { MapPin, Calendar, Mail, Pencil, X, Loader2 } from "lucide-react";
import PostCard from "./PostCard";
import Header from "./Header";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import BaseUrl from "../utils/constant";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

interface UserInterface {
  id: string | number | null;
  user_name: string;
  user_mail: string;
  user_jobrole: string;
  user_description: string;
  user_skills: string[];
  user_location: string;
  created_at: string;
  avatar: string;
}

type PostInterface = {
  post_id: number;
  user_id: number;
  user_name: string;
  user_jobrole: string;
  post_content: string;
  created_at: string;
  like_count: number;
  img_url?: string;
  comments_count: number;
  avatar: string;
};

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserInterface | null>(null);
  const [postData, setPostData] = useState<PostInterface[] | null>(null);
  const [imageOpen, setImageOpen] = useState(false);
  const { userid } = useParams<{ userid: string }>();
  const userIdNum = userid ? Number(userid) : null;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pfpLoading, setPfpLoading] = useState(false);
  const [admin, setAdmin] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const [profileRes, postsRes] = await Promise.all([
        axios.get(`${BaseUrl}/user/getuserprofile`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userIdNum },
        }),
        axios.get(`${BaseUrl}/post/getuserposts`, { params: { userIdNum } }),
      ]);
      console.log(profileRes.data);
      if (profileRes.data.status === 200) {
        setProfileData(profileRes.data.userData);
        if (profileRes.data.matchFlag) {
          setAdmin(true);
        }
      }
      if (postsRes.data.status === 200) setPostData(postsRes.data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userIdNum]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setImageOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPfpLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post(
        `${BaseUrl}/user/updateuserpfp`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.status === 200) fetchData();
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Unexpected Error occurred!"
      );
    } finally {
      setPfpLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  });

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Header />
      {loading && <Loading profile />}
      {!loading && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Profile Card */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="relative pb-0 p-6">
              <div className="h-36 bg-gradient-to-r from-[#0077b5] via-[#00639b] to-[#005582] rounded-t-xl -mx-6 -mt-6"></div>
              <div className="relative pt-4 flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                <div
                  onClick={() => admin && setImageOpen(true)}
                  className={`relative -mt-20 h-36 w-36 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 group ${
                    admin ? "cursor-pointer" : ""
                  }`}
                >
                  {/* User avatar */}
                  <img
                    src={profileData?.avatar || "/placeholder.svg"}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />

                  {/* Hover overlay with pencil icon */}
                  {admin && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Pencil className="text-white w-10 h-10" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold">
                    {profileData?.user_name}
                  </h1>
                  <p className="text-lg text-gray-500">
                    {profileData?.user_jobrole}
                  </p>
                </div>
              </div>
            </div>

            {/* About & Skills */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">About</h3>
                <p className="text-gray-600 mb-4">
                  {profileData?.user_description}
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />{" "}
                    {profileData?.user_location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Joined{" "}
                    {new Date(profileData?.created_at || "").toLocaleString(
                      "en",
                      { month: "long", year: "numeric" }
                    )}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" /> {profileData?.user_mail}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData?.user_skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100 hover:bg-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {postData?.length ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
              {postData.map((post) => (
                <PostCard
                  key={post.post_id}
                  id={post.post_id}
                  author={{
                    id: post.user_id,
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
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic py-8 bg-gray-50 rounded-md shadow-sm">
              No data found!
            </p>
          )}
        </div>
      )}

      {/* Avatar Modal */}
      {imageOpen && admin && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-4 mx-4">
            <button
              onClick={() => setImageOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 bg-red-100 p-2 rounded-full cursor-pointer"
            >
              <X size={20} />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute top-3 left-3 text-gray-600 hover:text-blue-500 bg-green-200 p-2 rounded-full cursor-pointer"
            >
              <Pencil size={20} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="relative mt-8">
              <img
                src={profileData?.avatar || "/placeholder.svg"}
                alt="Popup"
                className={`w-full p-1 rounded-md object-cover transition-opacity duration-300 ${
                  pfpLoading ? "opacity-50" : "opacity-100"
                }`}
              />
              {pfpLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-md">
                  <Loader2 className="animate-spin text-blue-500 w-16 h-16" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
