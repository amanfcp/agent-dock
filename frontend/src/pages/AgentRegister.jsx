import { useState } from "react";

export default function AgentRegister() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering Agent:", formData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 text-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Register New Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-black w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="text-black w-full p-2 border rounded"
            placeholder="Enter agent description (optional)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Configuration</label>
          <input
            name="config"
            value={formData.config}
            onChange={handleChange}
            className="text-black w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register Agent
        </button>
      </form>
    </div>
  );
}
