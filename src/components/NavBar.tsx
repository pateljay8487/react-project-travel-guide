/* eslint-disable no-restricted-globals */
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import plusRound from "../assets/plus-round.png";

export default function NavBar() {
  const user = useContext(AuthContext).user;
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const handleLogout = () => {
    authContext.setUser({ name: "", email: "" });
    localStorage.removeItem("user");
    navigate("/login");
  };
    
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className=" px-40 py-4  bg-white shadow-md" ref={dropdownRef}>
      <div className=" flex align-middle items-center  justify-between">
        <div>
          <button onClick={() => navigate("/")}>
            {}
            <img src={logo} alt="logo" className=" w-[190px] " />
          </button>
        </div>

        <div className="relative">
          <div className="bg-red-500 rounded-full p-2 w-[28px] absolute top-2 right-2">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="block fill-white  h-[12px] w-[12px] stroke-white overflow-visible stroke-[5px]"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <g fill="none">
                <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
              </g>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            name="search"
            value={search}
            onChange={handleSearch}
            className="border border-gray-300 rounded-3xl py-2 px-4"
          />
        </div>

        {user?.name ? (
          <div className="flex justify-center align-middle">
            <div className="flex align-middle">
              <button onClick={() => navigate("/add-listing")} >
                <img src={plusRound} alt="plus round" className="w-10 mr-4" />
              </button>
            </div>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className=" cursor-pointer flex justify-between align-middle border border-gray-300 px-4 py-2 rounded-lg"
            >
              <span className="text-lg text-red-600 font-medium mr-2">
                {user.name}
              </span>{" "}
              <div className="relative flex align-middle">
                <button onClick={() => setShowDropdown(!showDropdown)}>
                  <img
                    src="https://img.icons8.com/ios-filled/16/null/menu--v1.png"
                    alt="menu-icon"
                  />
                </button>
                {showDropdown && (
                  <div className="flex flex-col absolute top-9  transition-all duration-400 ease-in-out  right-[-14px] justify-between align-bottom self-end w-40 bg-white shadow-md rounded-md px-4 py-4">
                    <button
                      className="block w-full text-left mb-1 border-b pb-2 border-b-gray-200"
                      onClick={() => navigate("/add-listing")}
                    >
                      Add new Listing
                    </button>
                    <button
                      className="block w-full text-left mb-1"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                path === "/login" ? navigate("/register") : navigate("/login");
              }}
              className="text-white  bg-red-500 rounded-lg px-4 py-2"
            >
              {path === "/login" ? "Signup" : "Login"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}