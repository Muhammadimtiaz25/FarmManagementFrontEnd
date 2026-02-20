// src/components/RealTimeMonitor.jsx
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const RealTimeMonitor = () => {

  const [data, setData] = useState([{ time: "0s", battery: 100, chemical: 100 }]);
  const [location, setLocation] = useState({ lat: 32.21, lng: 74.3587 }); // Lahore default
  const ThinkAPIKey = import.meta.env.VITE_THINKSPEEK_API_KEY;
  
  function MapUpdater({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 18); // Smoothly move to marker position
    }
  }, [location, map]);

  return null;
}

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        const newTime = `${parseInt(last.time) + 5}s`;
        const newBattery = Math.max(last.battery - Math.random() * 2, 0);
        const newChemical = Math.max(last.chemical - Math.random() * 3, 0);
        axios.get(`https://api.thingspeak.com/channels/3053112/feeds.json?api_key=${ThinkAPIKey}&results=2`)
        .then((response)=>{
            const channel = response.data.channel;
    setLocation({
      lat: parseFloat(channel.latitude),
      lng: parseFloat(channel.longitude)
    });
    console.log("Fetched location:",channel);
        })
        .catch((error) => console.error("Error fetching data:", error));


        return [...prev, { time: newTime, battery: newBattery, chemical: newChemical }].slice(-10);
      });

       
    }, 5000);
 
     
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md space-y-4">
      <h2 className="text-[20px] font-bold">Live Robot Monitoring</h2>

      {/* Graph */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="battery" stroke="#4f46e5" strokeWidth={2} />
          <Line type="monotone" dataKey="chemical" stroke="#16a34a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Status Info */}
      <div className="flex justify-around text-sm font-medium">
        <div>Battery: {data[data.length - 1].battery.toFixed(0)}%</div>
        <div>Chemical: {data[data.length - 1].chemical.toFixed(0)}%</div>
        <div>Location: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</div>
      </div>

      {/* Leaflet Map */}
      <MapContainer center={location} zoom={18} style={{ height: "250px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>
            Robot is here 🚜 <br /> Battery: {data[data.length - 1].battery.toFixed(0)}%
          </Popup>
        </Marker>
         {/* This keeps map centered on marker */}
      <MapUpdater location={location} />
      </MapContainer>

    </div>
  );
};

export default RealTimeMonitor;
