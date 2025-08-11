import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Header from "./Header";
import BaseUrl from "../utils/constant";
import axios from "axios";
import Loading from "./Loading";
import Footer from "./Footer";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<{
    post_id: number;
    user_name: string;
    user_jobrole: string;
    post_content: string;
    created_at: string;
    like_count: number;
    comments_count: number;
    img_url: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<
    {
      comment_id: number;
      comment_content: string;
      user_name: string;
      created_at: Date;
    }[]
  >([]);
  const [newComment, setNewComment] = useState<string>("");
  const [commentsFlag, setCommentsFlag] = useState<boolean>(false);
  const navigate = useNavigate();

  const getPostData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/post/getpostdata`, {
        params: {
          postId,
        },
      });
      console.log(response);
      if (response.data.status === 200) {
        console.log(response.data.post);
        setPost(response.data.post);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    } finally {
      setLoading(false);
    }
  };
  const getCommentData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/post/getcomments`, {
        params: { postId },
      });
      console.log(response);
      if (response.data.status === 200) {
        console.log(response.data.commentsArr);
        setComments(response.data.commentsArr);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCommentsFlag(false);
    } else {
      setCommentsFlag(true);
    }
  }, []);

  useEffect(() => {
    getCommentData();
    getPostData();
  }, [postId]);

  const handleAddComment = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BaseUrl}/post/addcomment`,
        { newComment, postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.status === 200) {
        getPostData();
        getCommentData();
        setNewComment("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error occured!");
      }
    }
  };

  if (!post && loading) return <Loading />;
  if (!post) return <p>Error loading post.</p>;

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-8 px-4 pb-12">
        {/* Post */}
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

        {/* Commets */}

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Comments</h3>

          {!commentsFlag && (
            <div className="text-sm text-center text-gray-500 italic mt-4 mb-12">
              Please{" "}
              <span
                className="text-blue-600 font-semibold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                log in
              </span>{" "}
              to comment.
            </div>
          )}
          {commentsFlag && (
            <div className="mb-10 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <img
                  src="/placeholder.svg"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Input and button container */}
                <div className="flex flex-col flex-1 max-w-lg">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />

                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className={`cursor-pointer hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md transition-all ${
                        !newComment.trim() ? "bg-blue-400" : "bg-blue-600"
                      }`}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comment List */}
          <div className="space-y-5">
            {comments.map((comment) => (
              <div
                key={comment.comment_id}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm"
              >
                <p className="text-sm text-gray-800">
                  {comment.comment_content}
                </p>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>By {comment.user_name}</span>
                  <span>
                    {new Date(comment.created_at).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetail;
