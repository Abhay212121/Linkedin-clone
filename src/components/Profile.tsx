// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Calendar, Link as LinkIcon, Mail } from "lucide-react";
// import PostCard from "@/components/PostCard";
// import Header from "@/components/Header";

// const userPosts = [
//   {
//     id: 1,
//     author: {
//       name: "John Doe",
//       title: "Software Engineer at TechCorp",
//       avatar: "/placeholder.svg"
//     },
//     content: "Excited to share that I just completed a major refactoring of our authentication system! Moving from session-based to JWT tokens improved our API performance by 40%. Key lessons learned: always measure before and after, and don't underestimate the power of proper caching strategies.",
//     timestamp: "1 day ago",
//     likes: 18,
//     comments: 5
//   },
//   {
//     id: 2,
//     author: {
//       name: "John Doe",
//       title: "Software Engineer at TechCorp",
//       avatar: "/placeholder.svg"
//     },
//     content: "Just attended an amazing workshop on React Server Components. The future of React is looking incredibly promising! The ability to run components on the server while maintaining the interactive nature of client components is a game-changer for performance.",
//     timestamp: "3 days ago",
//     likes: 29,
//     comments: 8
//   }
// ];

// const Profile = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <div className="max-w-4xl mx-auto px-4 py-6">
//         {/* Profile Header */}
//         <Card className="mb-6">
//           <CardHeader className="relative pb-0">
//             {/* Cover Photo */}
//             <div className="h-32 bg-gradient-to-r from-professional to-professional-dark rounded-t-lg -mx-6 -mt-6"></div>

//             {/* Profile Info */}
//             <div className="relative pt-4">
//               <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
//                 <Avatar className="h-32 w-32 border-4 border-white -mt-16 mb-4 sm:mb-0">
//                   <AvatarImage src="/placeholder.svg" />
//                   <AvatarFallback className="text-2xl">JD</AvatarFallback>
//                 </Avatar>

//                 <div className="flex-1">
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                     <div>
//                       <h1 className="text-3xl font-bold">John Doe</h1>
//                       <p className="text-xl text-muted-foreground">Software Engineer at TechCorp</p>
//                     </div>
//                     <div className="flex space-x-2 mt-4 sm:mt-0">
//                       <Button variant="outline">Message</Button>
//                       <Button className="bg-professional hover:bg-professional-dark">Connect</Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="pt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* About */}
//               <div>
//                 <h3 className="font-semibold mb-3">About</h3>
//                 <p className="text-muted-foreground mb-4">
//                   Passionate software engineer with 5+ years of experience building scalable web applications.
//                   Specialized in React, Node.js, and cloud architecture. Love mentoring junior developers and
//                   contributing to open source projects.
//                 </p>

//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center text-muted-foreground">
//                     <MapPin className="h-4 w-4 mr-2" />
//                     San Francisco, CA
//                   </div>
//                   <div className="flex items-center text-muted-foreground">
//                     <Calendar className="h-4 w-4 mr-2" />
//                     Joined January 2020
//                   </div>
//                   <div className="flex items-center text-muted-foreground">
//                     <Mail className="h-4 w-4 mr-2" />
//                     john.doe@techcorp.com
//                   </div>
//                   <div className="flex items-center text-muted-foreground">
//                     <LinkIcon className="h-4 w-4 mr-2" />
//                     johndoe.dev
//                   </div>
//                 </div>
//               </div>

//               {/* Skills & Stats */}
//               <div>
//                 <h3 className="font-semibold mb-3">Skills</h3>
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL"].map((skill) => (
//                     <Badge key={skill} variant="secondary" className="bg-professional-light text-professional-dark">
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>

//                 <h3 className="font-semibold mb-3">Stats</h3>
//                 <div className="grid grid-cols-2 gap-4 text-center">
//                   <div className="bg-secondary rounded-lg p-3">
//                     <div className="text-2xl font-bold text-professional">500+</div>
//                     <div className="text-sm text-muted-foreground">Connections</div>
//                   </div>
//                   <div className="bg-secondary rounded-lg p-3">
//                     <div className="text-2xl font-bold text-professional">1.2K</div>
//                     <div className="text-sm text-muted-foreground">Followers</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Posts Section */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
//           <div className="space-y-0">
//             {userPosts.map((post) => (
//               <PostCard
//                 key={post.id}
//                 author={post.author}
//                 content={post.content}
//                 timestamp={post.timestamp}
//                 likes={post.likes}
//                 comments={post.comments}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
