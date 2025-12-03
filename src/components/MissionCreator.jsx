import React, { useEffect, useState, useRef } from "react";
import api,{getTunnels, getMyMissions} from "../api";
import { toast } from "react-toastify";

export default function MissionCreator({ farmerId, farmerIdOrignal }) {

  const [tunnels, setTunnels] = useState([]);
  const [startingTunnel, setStartingTunnel] = useState();
  const [endingTunnel, setEndingTunnel] = useState();
  const [missions, setMissions] = useState([]);

   useEffect(() => {
      const fetchTunnels = async () => {
        try {
          const data = await getTunnels();
          const missionsData = await getMyMissions();
          setMissions(missionsData);
          setTunnels(data);
        } catch (error) {
          console.error("Error fetching tunnels:", error);
        }
      };
        fetchTunnels(); // initial fetch

  const interval = setInterval(fetchTunnels, 5000); // refresh every 5 sec

  return () => clearInterval(interval); // cleanup on unmount
    }, []);


   //save Miison data
  const savemissionData = async () => {
    try {
    const res = await api.post("/missions", {
      ownerid: farmerIdOrignal,
      startingcountry: startingTunnel.country,
      startingcity: startingTunnel.city,
      startingarea: startingTunnel.area,
      startinglat: startingTunnel.lat,
      startinglon: startingTunnel.lon,
    
    });
    setMissions(prev => {
     
      const exists = prev.find(e => e._id === res.data._id);
      if (exists) return prev;
      return [...prev, res.data];
    });
    toast.success("Mission added!");
  } catch {
    toast.error("Failed to add Mission");
  }
  }

  //delete Mission
  const removeMission = async (id) => {
  try {
    await api.delete(`/missions/${id}`);
    setMissions(prev => prev.filter(e => e._id !== id));
    toast.success("Mission removed!");
  } catch {
    toast.error("Failed to remove Mission");
  }
}


  
  // ✅ Only tunnels for this farmer
  const farmerTunnels = tunnels.filter((t) => t.ownerid === farmerIdOrignal);

  // ✅ handleChange for dropdowns
  const handleStartingChange = (e) => {
    const selected = farmerTunnels.find((t) => t._id === e.target.value);
    setStartingTunnel(selected || null);
  };

  const handleEndingChange = (e) => {
    const selected = farmerTunnels.find((t) => t._id === e.target.value);
    setEndingTunnel(selected || null);
  };


  

  return (
   <div className="bg-white shadow-lg rounded-2xl p-6 transition hover:shadow-xl">
  <h3 className="text-xl font-bold mb-4 text-gray-800"> Create Mission</h3>

<div>
{/* dropbox for starting Tunnel */}

      {/* STARTING TUNNEL */}
      <div className="flex flex-col gap-4 px-4 py-3">
        <label htmlFor="startingTunnel">Choose tunnel for robot:</label>
        <select
          id="startingTunnel"
          name="startingTunnel"
          value={startingTunnel?._id || ""}
          onChange={handleStartingChange}
          className="form-input w-full rounded-lg text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] h-12 sm:h-14 p-3 sm:p-4 text-sm sm:text-base"
        >
          <option value="">Select a tunnel</option>
          {farmerTunnels.map((tunnel) => (
            <option key={tunnel._id} value={tunnel._id}>
              {tunnel.country} - {tunnel.city} - {tunnel.area}
            </option>
          ))}
        </select>
      </div>

</div>

<div>
   {/* ENDING TUNNEL
      <div className="flex flex-col gap-4 px-4 py-3">
        <label htmlFor="endingTunnel">Choose ending tunnel:</label>
        <select
          id="endingTunnel"
          name="endingTunnel"
          value={endingTunnel?._id || ""}
          onChange={handleEndingChange}
          className="form-input w-full rounded-lg text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] h-12 sm:h-14 p-3 sm:p-4 text-sm sm:text-base"
        >
          <option value="">Select a tunnel</option>
          {farmerTunnels.map((tunnel) => (
            <option key={tunnel._id} value={tunnel._id}>
              {tunnel.country} - {tunnel.city} - {tunnel.area}
            </option>
          ))}
        </select>
      </div> */}
</div>

  <button
    onClick={savemissionData}
    className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
  >
    Create Mission 
  </button>


 {missions.length > 0 && (
    <div className="mt-6">
      <h4 className="font-semibold text-gray-700 mb-2">Robot going in these tunnels</h4>
      <ul className="space-y-2">
        {missions.filter((e) => e.ownerid === farmerIdOrignal).map((p) => (
          <li
            key={p._id}
            className="p-3 bg-gray-100 rounded-lg shadow-sm text-sm text-gray-700 flex flex-col"
          >
           <p> 
            <span className="text-[#111418]  font-bold px-4 pb-3 pt-5"> Country: </span >{p.startingcountry} <br /> 
            <span className="text-[#111418]  font-bold px-4 pb-3 pt-5"> City:</span> {p.startingcity} <br />
            <span className="text-[#111418]  font-bold px-4 pb-3 pt-5"> Area: </span>{p.startingarea}</p>
{/* 
            <p> 
            <span className="text-[#111418]  font-bold px-4 pb-3 pt-5">Ending Country: </span >{p.endingcountry} <br /> 
            <span className="text-[#111418]  font-bold px-4 pb-3 pt-5">Ending City:</span> {p.endingcity} <br />
            <span className="text-[#111418]  font-bold px-4 pb-3 pt-5">Ending Area: </span>{p.endingarea}</p> */}
            <button onClick={() => removeMission(p._id)} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4  text-[#111418] text-sm font-bold bg-red-500 text-white">🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )}
  
</div>

  );
}





// import React, { useEffect, useState, useRef } from "react";
// import API from "../api";
// import SideStatus from "./SideStatus";

// export default function MissionCreator({ farmerId }) {
//   const [side, setSide] = useState("right");
//   const [mission, setMission] = useState(null);
//   const [area, setArea] = useState(null);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     API.get("/api/area").then((r) => setArea(r.data));
//   }, []);

//   const createMission = async () => {
//     const payload = { farmerId, areaId: "area-1", side };
//     const res = await API.post("/api/missions", payload);
//     setMission({ id: res.data.missionId, side });

//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(async () => {
//       const s = await API.get(`/api/mission/${res.data.missionId}/status`, {
//         params: { side },
//       });
//       setMission((prev) => ({ ...prev, status: s.data }));
//     }, 2000);
//   };

//   return (
//    <div className="bg-white shadow-lg rounded-2xl p-6 transition hover:shadow-xl">
//   <h3 className="text-xl font-bold mb-4 text-gray-800"> Create Mission</h3>

//   {area && (
//     <div className="relative border-2 border-dashed rounded-xl h-52 flex items-center justify-center bg-gray-50">
//       <span className="absolute top-2 left-2 text-xs text-gray-600 font-medium">
//         {area.width_ft}ft × {area.height_ft}ft
//       </span>

//       <div className="absolute bottom-3 flex gap-3">
//         {["left", "right", "top", "bottom"].map((s) => (
//           <button
//             key={s}
//             onClick={() => setSide(s)}
//             className={`w-10 h-10 rounded-full flex items-center justify-center font-bold capitalize transition ${
//               side === s
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {s[0].toUpperCase()}
//           </button>
//         ))}
//       </div>
//     </div>
//   )}

//   <button
//     onClick={createMission}
//     className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
//   >
//     Create Mission ({side})
//   </button>

//   {mission && (
//     <div className="mt-4">
//       <SideStatus mission={mission} />
//     </div>
//   )}
// </div>

//   );
// }
