import { useNavigate } from "react-router-dom";
import FolderView from "../components/FolderView";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };
  return (
    <div className="p-3">
      <div className="flex justify-between">
        <h1 className=" text-blue-600 font-bold text-3xl">My Drive</h1>
        <button
          className="border px-4 rounded-lg bg-blue-600 font-semibold text-white cursor-pointer"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
      <SearchBar />
      <FolderView />
    </div>
  );
}
