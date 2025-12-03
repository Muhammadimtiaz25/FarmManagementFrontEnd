import React, { useEffect, useState } from "react";
import RealTimeMonitor from "../components/RealTimeMonitor";
import api, { getMyMissions, createMission } from "../api";
import axios from "axios";
import Section from "../components/Section";
import logo2 from "../assets/images/logo2.jpg";
import { getEngineers, getAdminRobots, getBatteryStatus, getChemicalLevel } from "../api";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getRentals, rentNow } from "../api";
import MissionCreator from "../components/MissionCreator";
import PresetsForm from "../components/PresetsForm";
import { useLocation } from "react-router-dom";

const Agritecdashboard = () => {
  const [engineers, setEngineers] = useState([]);
  const [battery, setBattery] = useState(0);
  const [chemical, setChemical] = useState(0);
   const [rentals, setRentals] = useState([]);
     const [robots, setRobots] = useState([]);
   
     const location = useLocation();
         const queryParams = new URLSearchParams(location.search);
         const farmerIdOrignal = queryParams.get("id");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const engineersData = await getEngineers();
        setEngineers(engineersData);

        const robotsData = await getAdminRobots();
        setRobots(robotsData);

        const batteryData = await getBatteryStatus();
        setBattery(batteryData.value); 

        const chemicalData = await getChemicalLevel();
        setChemical(chemicalData.value);

        // just put api with api key
        // axios.get("")
        // .then((response)=>{
        //   setThinkspeekData(response.data.feeds);})
        // .catch((error) => console.error("Error fetching data:", error));
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    fetchData();
  }, []);
 
  const [chartData, setChartData] = useState([
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 50 },
  { name: 'Mar', value: 45 },
]);
 useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getRentals();
        setRentals(data);
      } catch (err) {
        console.error("Error fetching rentals:", err);
      }
    };
    fetchRentals();
  }, []);
const handleRent = async (plan) => {
  try {
    const payload = {
      userId: "farmer123",
      duration: plan.duration
    };

    const res = await rentNow(plan._id, payload);
    alert(` ${res.message}`);
  } catch (err) {
    const message = err.response?.data?.message || "Error booking rental";
    alert(` ${message}`);
  }
};
const farmerId = "farmer-001";
const [presets, setPresets] = useState([]);

useEffect(() => {
  api.get(`/api/presets/${farmerId}`).then((res) => setPresets(res.data));
}, []);

const onSavePreset = async (preset) => {
  const res = await api.post(`/api/presets/${farmerId}`, preset);
  setPresets((prev) => [...prev, res.data.preset]);
};

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

  return (
    <div
      className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col lg:flex-row">
       
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="flex h-full min-h-[300px] lg:min-h-[700px] flex-col justify-between bg-slate-50 p-4 border-b lg:border-b-0">
            <div className="flex flex-col gap-4">
              
            

<div className="flex gap-3 items-center ">
 
    <div className="flex items-center space-x-2">
          <img src={logo2} alt="Logo" className="w-10 h-10 rounded-full" />
          <p className='text-green-700 font-bold'>AgriBot</p>
        </div>


 
</div>


                 <Link to="/">   <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
                                                 <p className="text-[#0d141c] text-[17px] font-bold">Go to home page</p>
                                                </div></Link>
             
              <div className="flex flex-col gap-2">
               <Link to={`/Dashboard?id=${farmerIdOrignal}`}> <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e7edf4]">
                <p className="text-[17px] font-bold">Back to Main Dashboard</p>

                </div></Link> 
                <div className="flex items-center gap-3 px-3 py-2">
                  <p className="text-[17px] font-bold">Missions</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <p className="text-[17px] font-bold cursor-pointer">
                     <Link to="/">Robots</Link>
                  </p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <p className="text-[17px] font-bold cursor-pointer">
                    <Link to="/supportchat">Support</Link>
                  </p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <p className="text-[17px] font-bold cursor-pointer">
                  <Link to="/login">Account</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="flex-1 flex flex-col">
         
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex flex-col gap-2">
              <p className="text-[28px] lg:text-[32px] font-bold leading-tight">
               My Dashboard
              </p>
              <p className="text-gray-600 text-[15px] md:text-base font-medium">
                Welcome back, Farmer McGregor
</p>

            </div>
          </div>

       
          <div className="space-y-6">
            
            
            <div className="px-4">
  <RealTimeMonitor />
</div>

{/* <div>
      <h2 className="text-[#111418] text-[22px] font-bold px-4 pb-3 pt-5">
       Robot Rental Plan
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3 @3xl:grid-cols-4">
        {robots.filter((engineer) => engineer.ishired === false ) .map((plan) => (
          <div
            key={plan._id}
            className="flex flex-1 flex-col gap-4 rounded-lg border border-solid border-[#dbe0e6] bg-white p-6"
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-[#111418] text-base font-bold leading-tight">
                Per Month
              </h1>
              <p className="flex items-baseline gap-1 text-[#111418]">
                <span className="text-[#111418] text-4xl font-black leading-tight">
                  ${plan.rentPricePerMonth}
                </span>
                <span className="text-[#111418] text-base font-bold leading-tight">
                  
                </span>
              </p>
            </div>
            <button
              onClick={() => handleRent(plan)}
              className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold"
            >
              Rent Now
            </button>
            <div className="flex flex-col gap-2">
            Robot Name: {plan.name} 
            </div>
          </div>
        ))}
      </div>
    </div>
            */}
            <div className="px-4">
      <h2 className="text-[22px] font-bold pb-3">Precision Spraying Details</h2>

      <div className="p-4 border rounded-lg bg-white shadow-md">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

          
         <div className="px-4">
  <h2 className="text-[22px] font-bold pb-3">Available Farm Engineers</h2>
  
  <div className="max-h-[400px] overflow-y-auto pr-2">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {engineers.filter((engineer) => engineer.ishired === false ) 
   .map((eng, idx) => (
        <div key={idx} className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="font-bold">{eng.name}</p>
          <p className="text-sm text-gray-600">{eng.expertise}</p>
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              eng.status === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {eng.status}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>


            
<Section
  title="Mission Planning"
  features={[
    {
      title: "Mission Control",
      desc: "Select presets or create a new robot mission in your 200x200 ft tunnel area.",
      component: (
        <div className="grid md:grid-cols-2 gap-6">
          <PresetsForm farmerIdOrignal={farmerIdOrignal} onSave={onSavePreset} presets={presets} />
          <MissionCreator farmerId={farmerId} farmerIdOrignal={farmerIdOrignal} presets={presets} />
        </div>
      ),
    },
  ]}
/>


          </div>
        </div>
      </div>
    </div>
  );
};





export default Agritecdashboard;
