import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-80 space-y-4">
      {/* Profile Card */}
      <div className="rounded-lg border border-[#e5e7eb] bg-[#ffffff] text-[#0a0a0a] shadow-sm">
        <div className="text-center pb-2 flex flex-col space-y-1.5 p-6">
          <div className="relative">
            {/* Cover background */}
            <div className="h-16 bg-gradient-to-r from-[#0077b5] to-[#005582] rounded-t-lg -mx-6 -mt-6 mb-4"></div>
            <div className="mx-auto -mt-8 border-4 border-white relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                src="/placeholder.svg"
                alt="Image not found"
              />
            </div>
          </div>
          <h3 className="font-semibold">{localStorage.getItem("name")}</h3>
          <p className="text-sm text-[#6b7280]">
            {localStorage.getItem("job")}
          </p>
        </div>
        <div className="pt-0 p-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6b7280]">Profile views</span>
              <span className="text-[#0077b5] font-medium">124</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b7280]">Post impressions</span>
              <span className="text-[#0077b5] font-medium">2,341</span>
            </div>
          </div>
          <button
            onClick={() =>
              navigate(`/profile/${localStorage.getItem("userId")}`)
            }
            className="w-full mt-4 h-9 px-3 rounded-md border border-[#0077b5] text-[#0077b5] text-sm font-medium hover:bg-[#e5f4fb] transition-colors focus:outline-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            View Profile
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
