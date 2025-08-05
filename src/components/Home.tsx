import Feed from "./Feed";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6 min-h-140">
          <Sidebar />
          <Feed />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
