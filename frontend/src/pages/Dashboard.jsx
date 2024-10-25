// import { Appbar } from "../components/Appbar";
// import { Balance } from "../components/Balance";
// import { Users } from "../components/Users";

// export const Dashboard = () => {
//   return (
//     <div>
//       <Appbar />
//       <div className="m-8">
//         <Balance value={"10,000"} />
//         <Users />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const fetchBalance = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await response.json();
      setBalance(data.balance); // Update the balance state
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance(); // Fetch balance when the component mounts
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/signin"); // Redirect to the sign-in page
  };

  return (
    <div>
      <Appbar />
      <div className="m-8 flex justify-between">
        <Balance value={balance} setBalance={setBalance} />
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white p-2 rounded"
        >
          Sign Out
        </button>
      </div>
      <Users />
    </div>
  );
};

export default Dashboard;
