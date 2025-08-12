import { useNavigate } from "react-router-dom";
import Feed from "./Feed";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar (hidden on small screens) */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 hidden lg:block">
            <Sidebar />
          </aside>

          {/* Feed */}
          <section className="w-full lg:w-2/3 xl:w-3/4">
            <Feed />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
