
export const Balance = ({ value, setBalance }) => {
  const isSignedIn = !!localStorage.getItem("token"); // Check if the user is signed in

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="font-bold text-lg">Your balance</div>
        <div className="font-semibold ml-4 text-lg">Rs {value}</div>
      </div>

      {isSignedIn ? ( // Only show the message if the user is signed in
        <div className="text-green-500 mt-4">
          You are signed in.
        </div>
      ) : (
        <div className="text-red-500 mt-4">
          Please sign in to access your account.
        </div>
      )}
    </div>
  );
};

export default Balance;
