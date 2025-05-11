import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteConstants } from "../constants/RouteConstants";
// import api from "../api/axios";
import ConfirmModal from "../components/ConfirmModal";

export default function AgentList() {
  const navigate = useNavigate();
  const { REGISTER_AGENT } = RouteConstants;
  const [loading, setLoading] = useState(false);

  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "Slack",
      description: "Lorem ipsum dolor sit",
      config: "xXsfdDSFSDFfewVDvdfg$%T45rV$5t",
    },
    {
      id: 2,
      name: "Calendar",
      description: "Lorem ipsum dolor sit",
      config: "ffYTH%Bgh65jRGt34tR31242fgerG$",
    },
    {
      id: 3,
      name: "JIRA",
      description: "Lorem ipsum dolor sit",
      config: "gfHFadfq3r3464765tytfgDGFDT$%@",
    },
    {
      id: 4,
      name: "Github",
      description: "Lorem ipsum dolor sit",
      config: "fdgdfgFRR%^%T%^EYJhh$%T45rV$5t",
    },
  ]);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    agent: null,
  });

  const openModal = (type, agent) => setModal({ open: true, type, agent });
  const closeModal = () => setModal({ open: false, type: "", agent: null });

  const handleConfirm = () => {
    const { agent } = modal;
    if (modal.type === "delete") {
      handleDelete(agent);
    } else if (modal.type === "unregister") {
      handleUnregister(agent);
    }
  };

  const handleDelete = async (agent) => {
    try {
      setLoading(true);
      //   await api.delete(`/agents/${agent.id}`);
      setAgents((prev) => prev.filter((a) => a.id !== agent.id));
      alert(`Deleted agent: ${agent.name}`);
    } catch (err) {
      console.error(err);
      alert("Failed to delete agent.");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleUnregister = async (agent) => {
    try {
      setLoading(true);
      //   await api.post(`/agents/${agent.id}/unregister`); // adjust as per your backend
      setAgents((prev) => prev.filter((a) => a.id !== agent.id));
      alert(`Unregistered agent: ${agent.name}`);
    } catch (err) {
      console.error(err);
      alert("Failed to unregister agent.");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Agent List</h2>
        <button
          onClick={() => navigate(REGISTER_AGENT)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Agent
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin"></div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white shadow-md rounded border border-gray-700">
          <thead className="bg-gray-700 text-gray-300 border-b border-gray-600">
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Description</th>
              <th className="text-left p-3">Configuration</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, index) => (
              <tr
                key={agent.id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{agent.name}</td>
                <td className="p-3">{agent.description}</td>
                <td className="p-3">{agent.config}</td>
                <td className="p-3 space-x-2">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => openModal("delete", agent)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm"
                    onClick={() => openModal("unregister", agent)}
                  >
                    Unregister
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        isOpen={modal.open}
        title={`Are you sure you want to ${modal.type} ${modal.agent?.name}?`}
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </div>
  );
}
