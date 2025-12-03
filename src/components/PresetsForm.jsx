import React, { useEffect, useState } from "react";
import api,{getTunnels} from "../api";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, Popup, useMap , useMapEvents,Rectangle  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function PresetsForm({ onSave, presets,farmerIdOrignal }) {
  const [country, setCountry] = useState("Pakistan");
  const [city, setCity] = useState("Lahore");
  const [areaName, setAreaName] = useState("Tunnel Field");
  const [location, setLocation] = useState({ lat: 32.21, lng: 74.3587 }); // Lahore default

  const [tunnels, setTunnels] = useState([]);


  // Fix Leaflet marker icon issue
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

 const getRectangleBounds = (center, sideFeet = 200) => {
  const metersPerSide = sideFeet * 0.3048; // convert feet → meters
  const earthRadius = 6378137; // meters
  const half = metersPerSide / 2;
  const offsetLat = (half / earthRadius) * (180 / Math.PI);
  const offsetLng =
    (half / (earthRadius * Math.cos((Math.PI * center.lat) / 180))) *
    (180 / Math.PI);

  return [
    [center.lat - offsetLat, center.lng - offsetLng],
    [center.lat + offsetLat, center.lng + offsetLng],
  ];
};



 
  // Keep map centered when location changes
  function MapUpdater({ location }) {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.flyTo(location, 18);
      }
    }, [location, map]);
    return null;
  }

  // 🆕 Handle user clicks on the map
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
        toast.info(`📍 Selected: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      },
    });
    return null;
  }

  const findLocation = async () => {
  if (!country || !city) {
    toast.error("Please enter both city and country");
    return;
  }

  // Build the query dynamically
  let query = `${city}, ${country}`;
  if (areaName && areaName.trim() !== "") {
    query = `${areaName}, ${city}, ${country}`;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&limit=1`
    );
    const data = await response.json();

    // If no results and area was included, retry with just city + country
    if (data.length === 0 && areaName && areaName.trim() !== "") {
      const fallbackResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          `${city}, ${country}`
        )}&format=json&limit=1`
      );
      const fallbackData = await fallbackResponse.json();

      if (fallbackData.length > 0) {
        const { lat, lon, display_name } = fallbackData[0];
        const newLocation = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setLocation(newLocation);
        toast.success(`📍 Found ${display_name} (fallback to city)`);
        return;
      }
    }

    // Normal success case
    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      const newLocation = { lat: parseFloat(lat), lng: parseFloat(lon) };
      setLocation(newLocation);
      toast.success(`📍 Found ${display_name}`);
    } else {
      toast.error("❌ Location not found. Try another city or area name.");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    toast.error("⚠️ Failed to find location");
  }
};




  useEffect(() => {
    const fetchTunnels = async () => {
      try {
        const data = await getTunnels();
        setTunnels(data);
      } catch (error) {
        console.error("Error fetching tunnels:", error);
      }
    };
    fetchTunnels();
  }, []);


  //save tunnel data
  const savetunnelData = async () => {
    try {
    const res = await api.post("/tunnels", {
      ownerid: farmerIdOrignal,
      country: country,
      city: city,
      area: areaName,
      lat: location.lat,
      lon: location.lng,
    });
    setTunnels(prev => {
     
      const exists = prev.find(e => e._id === res.data._id);
      if (exists) return prev;
      return [...prev, res.data];
    });
    toast.success("Tunnel added!");
  } catch {
    toast.error("Failed to add Tunnel");
  }
  }


  //delete tunnel
  const removeTunnel = async (id) => {
  try {
    await api.delete(`/tunnels/${id}`);
    setTunnels(prev => prev.filter(e => e._id !== id));
    toast.success("Tunnel removed!");
  } catch {
    toast.error("Failed to remove Tunnel");
  }
};

  return (
   <div className="bg-white shadow-lg rounded-2xl p-6 transition hover:shadow-xl">
  <h3 className="text-xl font-bold mb-4 text-gray-800"> Save Tunnels</h3>

  <div className="space-y-4">
    <div>
      <label className="text-sm font-medium text-gray-600">Country</label>
      <input
        className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-600">City</label>
      <input
        className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-600">Area Name</label>
      <input
        className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
        value={areaName}
        onChange={(e) => setAreaName(e.target.value)}
      />
    </div>
<button
  onClick={findLocation}
  className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
>
  Find Location on Map
</button>

      {/* 🗺️ Leaflet Map */}
        <MapContainer
          center={location}
          zoom={18}
          style={{ height: "250px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
            <Popup>
              Selected Area 🚜 <br />
              Lat: {location.lat.toFixed(5)} <br />
              Lng: {location.lng.toFixed(5)}
            </Popup>
          </Marker>
          <Rectangle
  bounds={getRectangleBounds(location, 200)} // 200×200 ft
  pathOptions={{ color: "blue", weight: 2, fillOpacity: 0.25 }}
/>


          <MapUpdater location={location} />
          <MapClickHandler /> {/* 🆕 enables click-to-select */}
        </MapContainer>

    <button
      onClick={savetunnelData}
      className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-md hover:opacity-90 transition"
    >
      Save Tunnel
    </button>
  </div>

  {tunnels.length > 0 && (
    <div className="mt-6">
      <h4 className="font-semibold text-gray-700 mb-2">Saved Tunnels</h4>
      <ul className="space-y-2">
        {tunnels.filter((e) => e.ownerid === farmerIdOrignal).map((p) => (
          <li
            key={p._id}
            className="p-3 bg-gray-100 rounded-lg shadow-sm text-sm text-gray-700 flex flex-col"
          >
           <p> 
            <span className="text-[#111418]  font-bold px-4 pb-3 pt-5">Country: </span >{p.country} <br /> 
            <span className="text-[#111418]  font-bold px-4 pb-3 pt-5"> City:</span> {p.city} <br />
            <span className="text-[#111418]  font-bold px-4 pb-3 pt-5"> Area: </span>{p.area}</p>
            <button onClick={() => removeTunnel(p._id)} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4  text-[#111418] text-sm font-bold bg-red-500 text-white">🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
}
