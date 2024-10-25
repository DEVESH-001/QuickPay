
import { Link } from "react-router-dom";
function Appbar2() {
  return (
    <div>
      <div className="flex flex-col justify-center h-full ml-4">
        <Link to="/" className="text-lg font-semibold">
          QuickPAY
        </Link>
      </div>
    </div>
  );
}

export default Appbar2