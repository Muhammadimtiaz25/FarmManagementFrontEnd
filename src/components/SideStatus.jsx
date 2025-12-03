import React from "react";

export default function SideStatus({ mission }) {
  if (!mission) return null;
  const status = mission.status;

  return (
    <div className="mt-4 border rounded-lg p-3 bg-gray-50">
      <h4 className="font-semibold text-sm">
        Mission {mission.id} ({mission.side})
      </h4>
      {!status && <div>⏳ Waiting for status...</div>}
      {status && (
        <div className="mt-2 space-y-2">
          <img
            src={status.cameraImage}
            alt="camera"
            className="rounded-lg w-full"
          />
          <div className="text-sm">
            <p>🌡 Temperature: {status.sensors.temperature_c} °C</p>
            <p>💧 Humidity: {status.sensors.humidity_pct} %</p>
            <p>💡 Light: {status.sensors.light_lux} lux</p>
            <p>👀 Motion: {status.sensors.motion ? "YES" : "No"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
