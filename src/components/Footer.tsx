import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="sticky bottom-0 z-40 backdrop-blur-md bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-4 sm:py-0 text-sm text-gray-600 gap-2 sm:gap-0">
          {/* Left - Branding */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#0077b5]">
              ClickedIn
            </h2>
            <span className="ml-2 text-gray-400 hidden sm:inline">
              © {new Date().getFullYear()} All rights reserved
            </span>
          </div>

          {/* Right - Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Abhay212121"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0077b5] transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
