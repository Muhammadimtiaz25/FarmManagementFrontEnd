import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/images/logo2.jpg";
import { Plus, Trash2, Minus } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import api, {
  getAdminEngineers,
  getAdminFarmers,
  getAdminRobots,
} from "../api";



const Dashboard = () => {
    const [robots, setRobots] = useState([]);
    const [farmers, setFarmers] = useState([]);
    const [engineers, setEngineers] = useState([]);
  
    const [hiredEngineers, setHiredEngineers] = useState([]);
    const [hiredFarmers, setHiredFarmers] = useState([]);  // Fetch data from backend
    const [hiredRobots, setHiredRobots] = useState([]);  // Fetch data from backend

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const farmerId = queryParams.get("id");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resRobots = await api.get("/admin/robots");
        setRobots(resRobots.data);

        const resFarmers = await api.get("/admin/farmers");
        setFarmers(resFarmers.data);

        const resEngineers = await api.get("/admin/engineers");
        setEngineers(resEngineers.data);
      } catch (error) {
        console.error("Error fetching owner dashboard data", error);
      }
    };
    fetchData();
  }, [engineers]);
  const [alerts, setAlerts] = useState([]);

  
  const addAlert = (message) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 4000);
  };




const addTaskToEngineer = async (id) => {
  const engineerToHire = engineers.find((e) => e._id === id);
  if (!engineerToHire) return;
  setHiredEngineers((prev) => [...prev, engineerToHire]);
  setEngineers((prev) => prev.filter((e) => e._id !== id));

  try {
    const res = await api.post("/admin/engineers", {
      name: engineerToHire.name,   // ✅ use the single engineer
      ownerid: farmerId,           // ✅ comes from props/context/state
      ishired: true,               // ✅ field should match your schema casing
    });
    setHiredEngineers((prev) => {
      const exists = prev.find((e) => e._id === res.data._id);
      if (exists) return prev;
      return [...prev, res.data];
    });

    toast.success("Engineer added!");
  } catch (err) {
    console.error("Add engineer error:", err);
    toast.error("Failed to add engineer");
    setEngineers((prev) => [...prev, engineerToHire]);
    setHiredEngineers((prev) => prev.filter((e) => e._id !== id));
  }
};

// Remove from hired -> send back to engineers
const removeEngineer = async(id) => {
    try {
    await api.delete(`/admin/engineers/${id}`);
    setEngineers(prev => prev.filter(e => e._id !== id));
    toast.success("Engineer removed!");
  } catch {
    toast.error("Failed to remove engineer");
  }
};



// Move farmer from Farmers -> Hired Farmers
const addFarmer = async(id) => {
  const farmerToHire = farmers.find((e) => e._id === id);
  if (!farmerToHire) return;
  setHiredFarmers((prev) => [...prev, farmerToHire]);
  setFarmers((prev) => prev.filter((e) => e._id !== id));

  try {
    const res = await api.post("/admin/farmers", {
      name: farmerToHire.name,   // ✅ use the single engineer
      ownerid: farmerId,           // ✅ comes from props/context/state
      ishired: true,               // ✅ field should match your schema casing
    });
    setHiredFarmers((prev) => {
      const exists = prev.find((e) => e._id === res.data._id);
      if (exists) return prev;
      return [...prev, res.data];
    });
    toast.success("Robot added!");
  } catch (err) {
    console.error("Add engineer error:", err);
    toast.error("Failed to add engineer");

    setFarmers((prev) => [...prev, robotToHire]);
    setHiredFarmers((prev) => prev.filter((e) => e._id !== id));
  }
};
// Move farmer back from Hired Farmers -> Farmers
const removeFarmer = async(id) => {
  try {
    await api.delete(`/admin/farmers/${id}`);
    setFarmers(prev => prev.filter(f => f._id !== id));
    toast.success("Farmer removed!");
  } catch {
    toast.error("Failed to remove farmer");
  }
};


// Move robot from Robots -> Hired Robots
const addRobot = async(id) => {
   const robotToHire = robots.find((e) => e._id === id);
  if (!robotToHire) return;
  setHiredRobots((prev) => [...prev, robotToHire]);
  setRobots((prev) => prev.filter((e) => e._id !== id));

  try {
    const res = await api.post("/admin/robots", {
      name: robotToHire.name,   // ✅ use the single engineer
      ownerid: farmerId,           // ✅ comes from props/context/state
      ishired: true, 
      rentPricePerMonth: robotToHire.rentPricePerMonth,              // ✅ field should match your schema casing
    });
    setHiredRobots((prev) => {
      const exists = prev.find((e) => e._id === res.data._id);
      if (exists) return prev;
      return [...prev, res.data];
    });
    toast.success("Robot added!");
  } catch (err) {
    console.error("Add engineer error:", err);
    toast.error("Failed to add engineer");

    setRobots((prev) => [...prev, robotToHire]);
    setHiredRobots((prev) => prev.filter((e) => e._id !== id));
  }
};

// Move robot back from Hired Robots -> Robots
const removeRobot = async (id) => {
  try {
    await api.delete(`/admin/robots/${id}`);
    setRobots(prev => prev.filter(r => r._id !== id));
    toast.success("Robot removed!");
  } catch {
    toast.error("Failed to remove robot");
  }
};



  const repairRobot = (id) =>
    setRobots(robots.map((r) => (r.id === id ? { ...r, health: Math.min(100, r.health + 20) } : r)));

  const getHealthColor = (health) => {
    if (health > 70) return "bg-green-600";
    if (health > 40) return "bg-yellow-500";
    return "bg-red-600";
  };

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
    <div className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      {/* Sidebar and Main Content */}
      <div className="layout-container flex h-full grow flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="layout-content-container flex flex-col w-full lg:w-80 bg-slate-50 border-r border-gray-200">
          <div className="flex h-full min-h-[300px] lg:min-h-[700px] flex-col justify-between p-4">
            <div className="flex flex-col gap-4 ">
              <div className="flex items-center gap-3  ">
               <div className="flex items-center space-x-2">
                     <img src={logo2} alt="Logo" className="w-10 h-10 rounded-full" />
                     <p className='text-green-700 font-bold'>AgriBot</p>
                   </div>
                <h1 className="text-white text-lg font-semibold leading-normal">AgriBull</h1>
              </div>
              <div className="flex flex-col gap-2">
                  <Link to="/">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                                                  <p className="text-[#0d141c] text-[17px] font-bold">Go to home page</p>
                                                 </div></Link>
                <Link to={`/Agritecdashboard?id=${farmerId}`}> <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e7edf4]">
                 <p className="text-[#0d141c] text-[17px] font-bold">Go to My Robo Dashboard</p>
                </div></Link>
                <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Robots</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Engineers</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Rentals</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <p className="text-[#0d141c] text-[17px] font-bold">Settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="layout-content-container flex flex-col flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#0d141c] tracking-light text-2xl md:text-3xl font-bold leading-tight">Farmer's Dashboard</p>
          </div>

          {/* Alerts */}
          <div className="fixed top-4 right-4 w-80 space-y-2 z-50">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-2 bg-red-600 text-white rounded shadow">{alert.message}</div>
            ))}
          </div>



          {/* Robots / Engineers / Farmers Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {/* Robots */}
            <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Robots</p>
              <p className="text-2xl font-bold">{robots.filter((farmer) => farmer.ishired === false ) .length}</p>
              <div className="space-y-2 mt-2">
                {robots.filter((engineer) => engineer.ishired === false ) 
   .map((robot) => (
                  <div key={robot.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <p className="text-sm font-medium">{robot.name}</p>
                    <div className="flex gap-3">
                      <button onClick={() => addRobot(robot._id)} className="text-green-600 hover:text-green-800 cursor-pointer"><Plus size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineers */}
            <div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
              <p className="text-base font-bold">Engineers</p>
              <p className="text-2xl font-bold">{engineers.filter((farmer) => farmer.ishired === false ) .length}</p>
              <div className="space-y-2 mt-2">
                {engineers.filter((engineer) => engineer.ishired === false ) 
    .map((engineer) => (
                  <div key={engineer._id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <p className="text-sm font-medium">{engineer.name}</p>
                    <div className="flex gap-2">
                      <button onClick={() => addTaskToEngineer(engineer._id)} className="text-green-600 hover:text-green-800 cursor-pointer"><Plus size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmers */}
         {/* Farmers */}
<div className="flex flex-col gap-2 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
  <p className="text-base font-bold">Farmers</p>
  <p className="text-2xl font-bold">{farmers.filter((farmer) => farmer.ishired === false ) .length}</p>
  <div className="space-y-2 mt-2">
    {farmers.filter((farmer) => farmer.ishired === false ) 
    .map((farmer) => {
      const status = farmer.priceStatus ? farmer.priceStatus.toUpperCase() : "N/A";
      return (
        <div key={farmer._id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
          <p
            className={`text-sm font-medium ${
              farmer.priceStatus === "pending" ? "text-red-600" : "text-green-600"
            }`}
          >
            {farmer.name} - {status}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => addFarmer(farmer._id)}
              className="text-green-600 hover:text-green-800 cursor-pointer"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      );
    })}
  </div>
</div>

            {/* Hired  Robots */}
         <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
  <p className="text-base font-bold">Hired Robots</p>
  {robots.filter((robot) => robot.ishired === true && robot.ownerid === farmerId) // ✅ filter only hired engineers of this farmer
    .map((robot) => (
    <div key={robot._id} className="flex items-center justify-between border-b pb-2 last:border-none">
      <div>
      <p className="text-lg ">{robot.name}</p><br />
      <p className="text-sm text-gray-500x font-medium">Price per Month:{robot.rentPricePerMonth}</p>
      </div>
      <button
        onClick={() => removeRobot(robot._id)}
        className="text-red-600 hover:text-red-800 cursor-pointer"
      >
        <Trash2 size={18} />
      </button>
    </div>
  ))}

    {/* 🧾 Total Rent Summary */}
  {(() => {
    const totalRent = robots
      .filter((r) => r.ishired === true && r.ownerid === farmerId)
      .reduce(
        (sum, r) => sum + (r.totalRent || r.rentPricePerMonth),
        0
      );

    return (
      <div className="mt-4 border-t pt-2 text-right font-bold text-blue-800">
        Total Rental Cost: {totalRent}
      </div>
    );
  })()}
</div>


              {/* For Engineers Hired */}
              <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
  <p className="text-base font-bold">Engineers Hired</p>
  {engineers.filter((engineer) => engineer.ishired === true && engineer.ownerid === farmerId) // ✅ filter only hired engineers of this farmer
    .map((engineer) => (
    <div key={engineer._id} className="flex items-center justify-between border-b pb-2 last:border-none">
      <p className="text-sm font-medium">{engineer.name}</p>
       <button onClick={() => removeEngineer(engineer._id)} className="text-red-600 hover:text-red-800 cursor-pointer"><Trash2 size={18} /></button>
    </div>
  ))}
</div>


{/* for famer */}
             
{/* Hired Farmers */}
<div className="flex flex-col gap-4 rounded-lg p-4 border border-[#cedbe8] bg-white shadow h-[300px] overflow-y-auto overflow-x-hidden">
  <p className="text-base font-bold">Hired Farmers</p>
  {farmers.filter((farmer) => farmer.ishired === true && farmer.ownerid === farmerId) // ✅ filter only hired engineers of this farmer
    .map((farmer) => (
    <div key={farmer._id} className="flex items-center justify-between border-b pb-2 last:border-none">
      <p className="text-sm font-medium">{farmer.name}</p>
      <button
        onClick={() => removeFarmer(farmer._id)}
        className="text-red-600 hover:text-red-800 cursor-pointer"
      >
        <Trash2 size={18} />
      </button>
    </div>
  ))}
</div>
 </div>

          



          {/* Robot Health & Status */}
          <h2 className="text-[#0d141c] text-lg md:text-2xl font-bold px-4 pb-3 pt-5">Robot Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="flex flex-col gap-4 rounded-lg border border-[#cedbe8] p-6 bg-white shadow">
              <p className="text-base font-medium">Robot Availability</p>
              {robots.filter((farmer) => farmer.ishired === true && farmer.ownerid === farmerId).map((robot) => (
                <div key={robot._id} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{robot.name}</p>
                    <p className={`text-sm font-bold ${getHealthColor(robot.health)} text-white px-2 rounded`}>
                      {robot.health}%
                    </p>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
                    <div className={`${getHealthColor(robot.health)} h-3 transition-all duration-500`} style={{ width: `${robot.health}%` }}></div>
                  </div>
                  <button onClick={() => repairRobot(robot.id)} className="mt-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                    Repair / Boost Health
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-[#cedbe8] p-6 bg-white shadow">
              <p className="text-base font-medium">Robot Status</p>
              {robots.filter((farmer) => farmer.ishired === true && farmer.ownerid === farmerId).map((robot) => (
                <div key={robot._id} className="flex items-center justify-between">
                  <p className="font-medium">{robot.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${getStatusColor(robot.status)}`}></span>
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

export default Dashboard;
