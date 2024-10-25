import { useNavigate } from "react-router-dom";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between bg-gray-50"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1670893494919-412b65e5e58c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-24 px-4 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
          Simplify Your <span className="text-blue-400">Money</span>
        </h1>
        <p className="mt-4 text-lg sm:text-2xl max-w-xl">
          Experience the next generation of money management. <br />
          Sign up for free and explore the world of{" "}
          <span className="text-amber-500 border-b-2 border-amber-500">
            QuickPAY
          </span>
          .
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            setTimeout(() => {
              navigate("/signup");
            }, 1000);
          }}
          className="mt-8 py-3 px-6 bg-blue-600 hover:bg-black text-white rounded-full text-sm sm:text-base"
        >
          Get QuickPAY Now
        </button>
      </div>

      {/* Key Features Section */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 text-white">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-semibold">Instant Signup</span>
          <p className="mt-2 text-gray-300">Join QuickPAY in just a few taps</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-semibold">Secure Transactions</span>
          <p className="mt-2 text-gray-300">Your money, always safe</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-semibold">Easy Payments</span>
          <p className="mt-2 text-gray-300">Fast and hassle-free payments</p>
        </div>
      </div>

      {/* Contact Developer Section */}
      <div className="flex flex-col items-center mb-12 text-white">
        <p className="animate-pulse">Contact Developer</p>
        <div className="flex gap-6 mt-4 text-2xl">
          <a
            href="https://www.linkedin.com/in/deveshyadav1/"
            target="_blank"
            className="hover:text-blue-400"
          >
            <CiLinkedin />
          </a>
          <a
            href="https://github.com/DEVESH-001"
            target="_blank"
            className="hover:text-gray-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/_devesh_yadav_/"
            target="_blank"
            className="hover:text-blue-400"
          >
            <FiInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
