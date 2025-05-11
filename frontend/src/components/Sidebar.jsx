import { Link } from "react-router-dom";
import { RouteConstants } from "../constants/RouteConstants";

export default function Sidebar() {
  const { AGENT, REGISTER_AGENT, CHAT } = RouteConstants;

  return (
    <div className="w-60 h-screen bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold mb-6">AGENT DOCK</h1>
      <ul className="space-y-3">
        <li>
          <Link to={AGENT} className="block hover:bg-gray-700 p-2 rounded">
            Manage Agents
          </Link>
        </li>
        <li>
          <Link
            to={REGISTER_AGENT}
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Register Agent
          </Link>
        </li>
        <li>
          <Link to={CHAT} className="block hover:bg-gray-700 p-2 rounded">
            Chat
          </Link>
        </li>
      </ul>
    </div>
  );
}
