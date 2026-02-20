import React, { useState, useEffect } from "react";
import { useRef} from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/images/logo2.jpg";
import { Plus, Trash2, Minus } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import api, {
  getAdminEngineers,
  getAdminFarmers,
  getAdminRobots,
} from "../api";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [engineers, setEngineers] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [robots, setRobots] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const shownFarmerAlerts = useRef(new Set());

    const [robotName, setRobotName] = useState("Harvestor");
    const [farmerName, setFarmerName] = useState("Mr David Paji");
    const [engineerName, setEngineerName] = useState("Mr John Dev");

    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [engRes, farmRes, robRes] = await Promise.all([
          getAdminEngineers(),
          getAdminFarmers(),
          getAdminRobots(),
        ]);
        setEngineers(engRes);
        setFarmers(farmRes);
        setRobots(robRes);



        const res = await axios.get("https://farm-management-backend-v6ne.vercel.app/auth/all");
setUsers(res.data);

        
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to fetch dashboard data");
      }
    };
    fetchData();
  }, []);

 


const AddAdmin = async (id) => {
  try {
    const res = await axios.patch(`https://farm-management-backend-v6ne.vercel.app/auth/approve-admin/${id}`);
    alert(res.data.message);

    fetchData();
  } catch (error) {
    console.error("Error promoting user:", error);
    alert(error.response?.data?.error || "Failed to promote user");
  }
};


  // Remove Admin (demote)
  const RemoveAdmin = async (id) => {
     if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(`https://farm-management-backend-v6ne.vercel.app/auth/delete/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id)); // remove from state
      toast.success("Admin deleted successfully!");
    } catch (err) {
      console.error("Error deleting admin:", err);
      toast.error("Failed to delete admin.");
    }
  };


const addEngineer = async () => {
  try {
    const res = await api.post("/admin/engineers", {
      name: engineerName,
      ownerid:"sample1",
    });
    setEngineers(prev => {
     
      const exists = prev.find(e => e._id === res.data._id);
      if (exists) return prev;
      return [...prev, res.data];
    });
    toast.success("Engineer added!");
  } catch {
    toast.error("Failed to add engineer");
  }
};

const removeEngineer = async (id) => {
  try {
    await api.delete(`/admin/engineers/${id}`);
    setEngineers(prev => prev.filter(e => e._id !== id));
    toast.success("Engineer removed!");
  } catch {
    toast.error("Failed to remove engineer");
  }
};


const addFarmer = async () => {
  try {
    const res = await api.post("/admin/farmers", {
      name: farmerName,
      priceStatus: "pending",
      ownerid:"sample1",
    });
     const newFarmer = res.data; // full object with _id
    setFarmers(prev => {
      const exists = prev.find(f => f._id === newFarmer._id);
      if (exists) return prev;
      return [...prev, newFarmer];
    });
    toast.success("Farmer added!");

  } catch(err) {
     console.error("Add Farmer Error:", err);
    toast.error("Failed to add farmer");
  }
};

const removeFarmer = async (id) => {
  try {
    await api.delete(`/admin/farmers/${id}`);
    setFarmers(prev => prev.filter(f => f._id !== id));
    toast.success("Farmer removed!");
  } catch {
    toast.error("Failed to remove farmer");
  }
};


const addRobot = async () => {

  try {
    const res = await api.post("/admin/robots", {
      name: robotName,
      ownerid:"sample1",
      rentPricePerMonth: 1000,
      health: 100,
      status: "Idle",
    });

    const newRobot = res.data.robot;

    setRobots(prev => {
      const exists = prev.find(r => r._id === newRobot._id);
      if (exists) return prev;
      return [...prev, newRobot]; 
    });

    toast.success("Robot added!");
  } catch {
    toast.error("Failed to add robot");
  }
};


const removeRobot = async (id) => {
  try {
    await api.delete(`/admin/robots/${id}`);
    setRobots(prev => prev.filter(r => r._id !== id));
    toast.success("Robot removed!");
  } catch {
    toast.error("Failed to remove robot");
  }
};

const increasePrice = async (id) => {
    console.log("Robot ID:", id);
  
  setRobots(prev =>
    prev.map(r => (r._id === id ? { ...r, rentPricePerMonth: r.rentPricePerMonth + 1000 } : r))
  );
  try {
    await api.patch(`/admin/robots/${id}`, { rentPricePerMonth: robots.find(r => r._id === id).rentPricePerMonth + 1000 });
    toast.success("Price increased!");
  } catch {
    toast.error("Failed to update price on server");
  }
};

const decreasePrice = async (id) => {
  setRobots(prev =>
    prev.map(r => (r._id === id ? { ...r, rentPricePerMonth: r.rentPricePerMonth - 1000 } : r))
  );
  try {
    await api.patch(`/admin/robots/${id}`, { rentPricePerMonth: robots.find(r => r._id === id).rentPricePerMonth - 1000 });
    toast.success("Price decreased!");
  } catch {
    toast.error("Failed to update price on server");
  }
};

const repairRobot = async (id) => {
  setRobots(prev =>
    prev.map(r =>
      r._id === id ? { ...r, health: Math.min(100, (r.health || 0) + 20) } : r
    )
  );

  const updatedRobot = robots.find(r => r._id === id);
  if (!updatedRobot) return;

  try {
    await api.patch(`/admin/robots/${id}`, { 
      health: Math.min(100, (updatedRobot.health || 0) + 20) 
    });
    toast.success("Robot repaired!");
  } catch {
    toast.error("Failed to repair robot");
  }
};


const getHealthColor = (health) =>
  health > 70 ? "bg-green-600" : health > 40 ? "bg-yellow-500" : "bg-red-600";

const getStatusColor = (status) => {
  switch (status) {
    case "Operational":
      return "bg-green-600";
    case "Maintenance":
      return "bg-yellow-500";
    case "Repair":
      return "bg-red-600";
    case "Idle":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};



 
  return (
    <div
      className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="layout-content-container flex flex-col w-full lg:w-80 bg-slate-50 border-r border-gray-200">
          <div className="flex h-full min-h-[300px] lg:min-h-[700px] flex-col justify-between p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 ">
                <div className="flex items-center space-x-2">
                      <img src={logo2} alt="Logo" className="w-10 h-10 rounded-full" />
                      <p className='text-green-700 font-bold'>AgriBot</p>
                    </div>
               
              </div>
              <div className="flex flex-col gap-2">
               <Link to="/">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                                 <p className="text-[#0d141c] text-[17px] font-bold">Go to home page</p>
                                </div></Link>
                <div onClick={() => setActiveSection("dashboard")} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e7edf4] cursor-pointer">
                  <p   className="text-[#0d141c] text-[17px] font-bold ">
                    Dashboard
                  </p>
                </div>
                <div onClick={() => setActiveSection("robots")} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer  ">
                  <p className="text-[#0d141c] text-[17px] font-bold cursor-pointer">
                    Robots
                    </p>
                </div>
                <div onClick={() => setActiveSection("engineers")} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <p className="text-[#0d141c] text-[17px] font-bold ">
                    Engineers
                   
                  </p>
                </div>
                <div onClick={() => setActiveSection("farmers")} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <p  className="text-[#0d141c] text-[17px] font-bold ">
                  Farmers
                    
                  </p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="layout-content-container flex flex-col flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#0d141c] tracking-light text-2xl md:text-3xl font-bold leading-tight">
              Owner Dashboard
            </p>
          </div>

          {/* Alerts */}
          <div className="fixed top-4 right-4 w-80 space-y-2 z-50">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-2 bg-red-600 text-white rounded shadow"
              >
                {alert.message}
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">     
{activeSection === "dashboard" && (
  <>
 {/* Robots */}
<div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
  <p className="text-base font-bold">Robots</p>
  <p className="text-2xl font-bold">{robots.filter((farmer) => farmer.ishired === false ).length}</p>

  {/* Add button */}
  <input    value={robotName}
            onChange={(e) => setRobotName(e.target.value)}
            placeholder="Enter name for Robot" 
            type="text" 
            className="bg-green-600 text-white rounded hover:bg-green-700 text-sm" />
  <button
    onClick={addRobot}
    className="mt-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
  >
    ➕ Add Robot
  </button>

  {/* Robot list */}
  <div className="space-y-2 mt-2">
    {robots.length === 0 ? (
      <p className="text-gray-500 text-sm italic">No robots available</p>
    ) : (
      robots.filter((farmer) => farmer.ishired === false ).map((robot) => (
        <div
          key={robot._id}
          className="flex justify-between items-center bg-gray-50 p-2 rounded"
        >
          <p className="text-sm font-medium">{robot.name}</p>
          <button
            onClick={() => removeRobot(robot._id)}
            className="text-red-600 hover:text-red-800 cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))
    )}
  </div>
</div>

            {/* Engineers */}
            <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Engineers</p>
              <p className="text-2xl font-bold">{engineers.filter((farmer) => farmer.ishired === false ).length}</p>  
              <input    
            value={engineerName}
            onChange={(e) => setEngineerName(e.target.value)}
            placeholder="Enter name for Robot" 
            type="text" 
            className="bg-green-600 text-white rounded hover:bg-green-700 text-sm" />
              <button
                onClick={addEngineer}
                className="mt-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                ➕ Add Engineer
              </button>
              <div className="space-y-2 mt-2">
                {engineers.filter((farmer) => farmer.ishired === false ) .map((engineer) => (
                  <div
                    key={engineer._id}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <p className="text-sm font-medium">{engineer.name}</p>
                    <button
                      onClick={() => removeEngineer(engineer._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmers */}
            <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Farmers</p>
              <p className="text-2xl font-bold">{farmers.filter((farmer) => farmer.ishired === false ).length}</p>
             <input    
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            placeholder="Enter name for Robot" 
            type="text" 
            className="bg-green-600 text-white rounded hover:bg-green-700 text-sm" />
             
              <button
                onClick={addFarmer}
                className="mt-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                ➕ Add Farmer
              </button>
              <div className="space-y-2 mt-2">
                {farmers.filter((farmer) => farmer.ishired === false ).map((farmer) => {
                  const status = farmer.priceStatus
                    ? farmer.priceStatus.toUpperCase()
                    : "N/A";
                  return (
                    <div
                      key={farmer._id}
                      className="flex justify-between items-center bg-gray-50 p-2 rounded"
                    >
                      <p
                        className={`text-sm font-medium ${
                          farmer.priceStatus === "pending"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {farmer.name} - {status}
                      </p>
                      <button
                        onClick={() => removeFarmer(farmer._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Admin Requests */}
            <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Admin Requests</p>
              {users.filter(user => user.role === "admin" || user.role === "requestAdmin").map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-lg font-bold">
                     {user.role}

                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => AddAdmin(user._id)}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                    >
                      ✔️
                    </button>
                    <button
                      onClick={() => RemoveAdmin(user._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
            



            {/* Rental Prices */}
            <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Rental Prices</p>
              {robots.filter((farmer) => farmer.ishired === false ).map((robot) => (
                <div
                  key={robot._id}
                  className="flex items-center justify-between border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="text-sm font-medium">{robot.name}</p>
                    <p className="text-lg font-bold">
                     ${robot.rentPricePerMonth?.toLocaleString() || "0"}

                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => increasePrice(robot._id)}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => decreasePrice(robot._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Minus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
</>)}

{/* Robots */}
{activeSection === "robots" && (
<div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
  <p className="text-base font-bold">Robots</p>
  <p className="text-2xl font-bold">{robots.filter((farmer) => farmer.ishired === false ).length}</p>

  {/* Add button */}
  <input    value={robotName}
            onChange={(e) => setRobotName(e.target.value)}
            placeholder="Enter name for Robot" 
            type="text" 
            className="bg-green-600 text-white rounded hover:bg-green-700 text-sm" />
  <button
    onClick={addRobot}
    className="mt-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
  >
    ➕ Add Robot
  </button>

  {/* Robot list */}
  <div className="space-y-2 mt-2">
    {robots.length === 0 ? (
      <p className="text-gray-500 text-sm italic">No robots available</p>
    ) : (
      robots.filter((farmer) => farmer.ishired === false ).map((robot) => (
        <div
          key={robot._id}
          className="flex justify-between items-center bg-gray-50 p-2 rounded"
        >
          <p className="text-sm font-medium">{robot.name}</p>
          <button
            onClick={() => removeRobot(robot._id)}
            className="text-red-600 hover:text-red-800 cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))
    )}
  </div>
</div>
)}
            {/* Engineers */}
{activeSection === "engineers" && (
            <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Engineers</p>
              <p className="text-2xl font-bold">{engineers.filter((farmer) => farmer.ishired === false ).length}</p>  
              <input    
            value={engineerName}
            onChange={(e) => setEngineerName(e.target.value)}
            placeholder="Enter name for Robot" 
            type="text" 
            className="bg-green-600 text-white rounded hover:bg-green-700 text-sm" />
              <button
                onClick={addEngineer}
                className="mt-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                ➕ Add Engineer
              </button>
              <div className="space-y-2 mt-2">
                {engineers.filter((farmer) => farmer.ishired === false ) .map((engineer) => (
                  <div
                    key={engineer._id}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <p className="text-sm font-medium">{engineer.name}</p>
                    <button
                      onClick={() => removeEngineer(engineer._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
)}
            {/* Farmers */}
{activeSection === "farmers" && (
            <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Farmers</p>
              <p className="text-2xl font-bold">{farmers.filter((farmer) => farmer.ishired === false ).length}</p>
             <input    
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            placeholder="Enter name for Robot" 
            type="text" 
            className="bg-green-600 text-white rounded hover:bg-green-700 text-sm" />
             
              <button
                onClick={addFarmer}
                className="mt-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                ➕ Add Farmer
              </button>
              <div className="space-y-2 mt-2">
                {farmers.filter((farmer) => farmer.ishired === false ).map((farmer) => {
                  const status = farmer.priceStatus
                    ? farmer.priceStatus.toUpperCase()
                    : "N/A";
                  return (
                    <div
                      key={farmer._id}
                      className="flex justify-between items-center bg-gray-50 p-2 rounded"
                    >
                      <p
                        className={`text-sm font-medium ${
                          farmer.priceStatus === "pending"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {farmer.name} - {status}
                      </p>
                      <button
                        onClick={() => removeFarmer(farmer._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
)}
    
          </div>

          {/* Robot Health & Status */}
          <h2 className="text-[#0d141c] text-lg md:text-2xl font-bold px-4 pb-3 pt-5">
            Robot Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="flex flex-col gap-4 rounded-lg border border-[#cedbe8] p-6 bg-white shadow">
              <p className="text-base font-medium">Robot Availability</p>
              {robots.filter((farmer) => farmer.ishired === false ).map((robot) => (
                <div key={robot._id} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{robot.name}</p>
                    <p className={`text-sm font-bold ${getHealthColor(robot.health || 0)} text-white px-2 rounded`}>
  {(robot.health || 0)}%
</p>

                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
                    <div
                      className={`${getHealthColor(
                        robot.health
                      )} h-3 transition-all duration-500`}
                      style={{ width: `${robot.health}%` }}
                    ></div>
                  </div>
                  <button
  onClick={() => repairRobot(robot._id)}
  className={`mt-1 px-2 py-1 text-white rounded text-sm ${
    robot.health > 70
      ? "bg-green-600 hover:bg-green-700"
      : robot.health > 40
      ? "bg-yellow-500 hover:bg-yellow-600"
      :"bg-amber-800 hover:bg-amber-900"
  }`}
>
  Repair / Boost Health
</button>

                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-[#cedbe8] p-6 bg-white shadow">
              <p className="text-base font-medium">Robot Status</p>
              {robots.filter((farmer) => farmer.ishired === false ).map((robot) => (
                <div
                  key={robot._id}
                  className="flex items-center justify-between"
                >
                  <p className="font-medium">{robot.name}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        robot.status
                      )}`}
                    ></span>
                    <p>{robot.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
