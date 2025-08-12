import { MapPin, Calendar, Mail } from "lucide-react";
import PostCard from "./PostCard";
import Header from "./Header";
import { useEffect, useState } from "react";
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
  user_name: string;
  user_jobrole: string;
  post_content: string;
  created_at: string;
  like_count: number;
  img_url?: string;
  comments_count: number;
};

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<UserInterface | null>(null);
  const [postData, setPostData] = useState<PostInterface[] | null>(null);
  const { userid } = useParams<{ userid: string }>();
  const userIdNum = userid ? Number(userid) : null;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileRes, postsRes] = await Promise.all([
          axios.get(`${BaseUrl}/user/getuserprofile`, {
            params: { userIdNum },
          }),
          axios.get(`${BaseUrl}/post/getuserposts`, { params: { userIdNum } }),
        ]);

        if (profileRes.data.status === 200) {
          setProfileData(profileRes.data.userData);
        }
        if (postsRes.data.status === 200) {
          setPostData(postsRes.data.posts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Header />
      {loading && <Loading profile={true} />}
      {!loading && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="mb-6 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200">
            {/* Banner */}
            <div className="relative pb-0 flex flex-col space-y-1.5 p-6">
              <div className="h-36 bg-gradient-to-r from-[#0077b5] via-[#00639b] to-[#005582] rounded-t-xl -mx-6 -mt-6"></div>

              {/* Avatar & Name */}
              <div className="relative pt-4">
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                  <div className="relative -mt-20 mb-4 sm:mb-0 h-36 w-36 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                    <img
                      src="/placeholder.svg"
                      alt="User avatar"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h1 className="text-3xl font-bold leading-tight">
                          {profileData?.user_name}
                        </h1>
                        <p className="text-lg text-gray-500">
                          {profileData?.user_jobrole}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* About */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">About</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {profileData?.user_description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData?.user_location && profileData.user_location}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData?.created_at && (
                        <>
                          Joined{" "}
                          {new Date(profileData.created_at).toLocaleString(
                            "en",
                            {
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData?.user_mail && profileData?.user_mail}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {profileData?.user_skills?.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!postData && (
            <p className="text-center text-gray-500 italic py-8 bg-gray-50 rounded-md shadow-sm">
              No data found!
            </p>
          )}

          {postData && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
              <div className="space-y-0">
                {postData?.map((post) => (
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
                    comments={post.comments_count}
                    img_url={post.img_url}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
