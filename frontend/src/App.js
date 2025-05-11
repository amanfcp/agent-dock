import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AgentList from "./pages/AgentList";
import AgentRegister from "./pages/AgentRegister";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/agents" element={<AgentList />} />
            <Route path="/agents/register" element={<AgentRegister />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
