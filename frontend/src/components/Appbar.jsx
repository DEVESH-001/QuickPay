import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Appbar = () => {
  const [username, setUsername] = useState(""); // Initialize state for the username

  // Fetch user information to get the username
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Send JWT token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching user information");
        }

        const data = await response.json();
        setUsername(data.username); // Set the username from the fetched data
      } catch (err) {
        console.error(err.message); // Handle errors gracefully
      }
    };

    fetchUserInfo();
  }, []); // Fetch once on component mount

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        <Link to="/" className="text-lg font-semibold">QuickPAY</Link>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          <h1 className="text-lg font-semibold">Hello, {username || "User"}</h1>{" "}
          {/* Display username or default text */}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {username ? username.charAt(0).toUpperCase() : "U"}{" "}
            {/* Display first letter of username or 'U' */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
