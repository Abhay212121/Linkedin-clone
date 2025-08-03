import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#ffffff] border-b border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0077b5]">
              ClickedIn
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className="flex flex-col items-center px-2 py-1 text-[#6b7280] hover:text-[#0077b5] transition-colors cursor-pointer hover:bg-[#fbfbfb]"
            >
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </button>

            <button
              className="flex items-center space-x-1 hover:bg-[#0076b5c6] cursor-pointer transition-colors border-2 p-2 bg-[#0077b5] text-white"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
