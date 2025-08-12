import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import BaseUrl from "../utils/constant";
import { useNavigate } from "react-router-dom";

const SearchBoxWithDropdown = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState<
    {
      user_id: number;
      user_name: string;
    }[]
  >([]);

  useEffect(() => {
    if (searchTerm.trim().length === 0) return;

    const triggerSearch = async () => {
      const response = await axios.post(`${BaseUrl}/user/getallusers`, {
        searchTerm,
      });
      console.log(response);
      if (response.data.status === 200) {
        setSuggestions(response.data.userData);
      }
    };
    triggerSearch();
  }, [searchTerm]);

  return (
    <div className="relative flex-1 max-w-md mx-8">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          placeholder="Search for people, posts, and more..."
          className="pl-10 pr-4 h-11 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:border-[#0077b5] transition-all shadow-sm"
        />
      </div>

      {/* Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg text-sm overflow-hidden">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchTerm(item.user_name);
                setIsFocused(false);
                navigate(`/profile/${item.user_id}`);
              }}
            >
              {item.user_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBoxWithDropdown;
