import { MapPin, Calendar, Link as LinkIcon, Mail } from "lucide-react";
import PostCard from "./PostCard";
import Header from "./Header";

const userPosts = [
  {
    id: 1,
    author: {
      name: "John Doe",
      title: "Software Engineer at TechCorp",
      avatar: "/placeholder.svg",
    },
    content:
      "Excited to share that I just completed a major refactoring of our authentication system! Moving from session-based to JWT tokens improved our API performance by 40%. Key lessons learned: always measure before and after, and don't underestimate the power of proper caching strategies.",
    timestamp: "1 day ago",
    likes: 18,
    comments: 5,
  },
  {
    id: 2,
    author: {
      name: "John Doe",
      title: "Software Engineer at TechCorp",
      avatar: "/placeholder.svg",
    },
    content:
      "Just attended an amazing workshop on React Server Components. The future of React is looking incredibly promising! The ability to run components on the server while maintaining the interactive nature of client components is a game-changer for performance.",
    timestamp: "3 days ago",
    likes: 29,
    comments: 8,
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6 rounded-lg border border-[#e5e7eb] bg-white text-[#0a0a0a] shadow-sm">
          <div className="relative pb-0 flex flex-col space-y-1.5 p-6">
            <div className="h-32 bg-gradient-to-r from-[#0077b5] to-[#005582] rounded-t-lg -mx-6 -mt-6"></div>

            <div className="relative pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                <div className="relative -mt-16 mb-4 sm:mb-0 h-32 w-32 rounded-full border-4 border-white overflow-hidden">
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
                      <h1 className="text-3xl font-bold">John Doe</h1>
                      <p className="text-xl text-[#6b7280]">
                        Software Engineer at TechCorp
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <button className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2">
                        Message
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0077b5] hover:bg-[#005582] px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">About</h3>
                <p className="text-[#6b7280] mb-4">
                  Passionate software engineer with 5+ years of experience
                  building scalable web applications. Specialized in React,
                  Node.js, and cloud architecture. Love mentoring junior
                  developers and contributing to open source projects.
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-[#6b7280]">
                    <MapPin className="h-4 w-4 mr-2" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center text-[#6b7280]">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined January 2020
                  </div>
                  <div className="flex items-center text-[#6b7280]">
                    <Mail className="h-4 w-4 mr-2" />
                    john.doe@techcorp.com
                  </div>
                  <div className="flex items-center text-[#6b7280]">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    johndoe.dev
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "React",
                    "TypeScript",
                    "Node.js",
                    "Python",
                    "AWS",
                    "Docker",
                    "GraphQL",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-[#e6f0f8] text-[#004974] border border-transparent hover:bg-[#d4e7f3] focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2"
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold mb-3">Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-[#f1f5f9] rounded-lg p-3">
                    <div className="text-2xl font-bold text-[#0077b5]">
                      500+
                    </div>
                    <div className="text-sm text-[#6b7280]">Connections</div>
                  </div>
                  <div className="bg-[#f1f5f9] rounded-lg p-3">
                    <div className="text-2xl font-bold text-[#0077b5]">
                      1.2K
                    </div>
                    <div className="text-sm text-[#6b7280]">Followers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          <div className="space-y-0">
            {userPosts.map((post) => (
              <PostCard
                id={post.id}
                key={post.id}
                author={post.author}
                content={post.content}
                timestamp={post.timestamp}
                likes={post.likes}
                comments={post.comments}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
