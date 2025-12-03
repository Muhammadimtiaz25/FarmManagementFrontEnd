import React from "react";

const SeedingSVG = () => (
  <svg
    viewBox="0 0 64 64"
    className="w-14 h-14 text-green-700"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="6" y="36" width="52" height="18" rx="3" />
    <circle cx="18" cy="55" r="4" fill="currentColor" />
    <circle cx="46" cy="55" r="4" fill="currentColor" />
    <path d="M10 36V22c0-6 5-10 11-10h10c6 0 11 4 11 10v14" />
    <path d="M16 28h8M28 20h8M24 24h8" />
    <path d="M6 42h52M22 36v8M42 36v8" />
  </svg>
);

const SprayerSVG = () => (
  <svg
    viewBox="0 0 64 64"
    className="w-14 h-14 text-emerald-700"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="22" y="24" width="30" height="16" rx="3" />
    <path d="M8 40l8-6v-8l-8-6" />
    <circle cx="46" cy="52" r="6" />
    <circle cx="22" cy="52" r="6" />
    <path d="M52 28h6M52 32h6M52 36h6" />
    <path d="M16 20h12l4-6h10" />
  </svg>
);

const HarvesterSVG = () => (
  <svg
    viewBox="0 0 64 64"
    className="w-14 h-14 text-teal-700"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="10" y="26" width="36" height="16" rx="3" />
    <path d="M46 30h8l4 6-4 6h-8" />
    <circle cx="22" cy="50" r="6" />
    <circle cx="40" cy="50" r="6" />
    <path d="M6 42h40" />
    <path d="M14 26v-6h12l4 6" />
  </svg>
);

const Section = ({ title, features }) => {
  return (
    <section className="mt-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-green-800">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full md:w-1/3 rounded-xl object-cover"
              />
              <div className="mt-4 md:mt-0 md:ml-6">
                <p className="text-orange-400 font-semibold text-sm">
                  {feature.subtitle}
                </p>
                <h3 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Robot = () => {
  const robots = [
    {
      title: "Seeding Robot",
      desc: "High-precision sowing with minimal wastage.",
      Icon: SeedingSVG,
    },
    {
      title: "Smart Sprayer",
      desc: "Targeted spray reduces chemicals by up to 40%.",
      Icon: SprayerSVG,
    },
    {
      title: "Compact Harvester",
      desc: "Gentle picking to avoid crop damage.",
      Icon: HarvesterSVG,
    },
    {
      title: "Fleet Monitor",
      desc: "Real-time robot telemetry & route playback.",
      Icon: SprayerSVG,
    },
    {
      title: "Task Scheduler",
      desc: "Auto-assign jobs based on weather & fields.",
      Icon: SeedingSVG,
    },
    {
      title: "Maintenance Bot",
      desc: "Predictive alerts, parts health & logs.",
      Icon: HarvesterSVG,
    },
  ];

  return (
    <section id="robots" className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="text-[17px] font-bold text-orange-400">Our Robots</p>
          <h2 className="text-3xl font-bold text-green-800">
            Meet Our Agricultural Robots
          </h2>
        </div>

        {/* Scrollable robot container */}
        <div className="max-h-[600px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {robots.map(({ title, desc, Icon }, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-50 group-hover:bg-green-100 transition">
                  <Icon />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </div>
              <p className="mt-3 text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Section
        title="Robot Features"
        features={[
          {
            subtitle: "Precision Spraying",
            title: "Advanced Nozzle Control",
            desc: "Our robots use advanced nozzle control technology to ensure precise and efficient spraying.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSof2Gwo5mDZH1I6Kc5beEw-z85k1FCMNGymFr8kcUzQSZyZy0NoTX2HQquKA3Ob8ih_OTiplee43r9SKbtBhjrCrO1dZCUCMBJxxRBxIQuZqLZVvGhaw4o7olU7HCrfDbUK2MIpAgmb2Ml4QYQVHH97vQN8R_f64mr81t_ji6V8Qhzbq1eKbIxIAscqabWMBQc0dRnt1pA9pD-OTbWrrscDdnk1wzDdyWbREm3xJOVPMgsSVOEgrvxS8z3RZUz3FMa-3YLE5bwlPR",
          },
          {
            subtitle: "Autonomous Navigation",
            title: "GPS-Guided Precision",
            desc: "Equipped with GPS-guided navigation, our robots autonomously navigate fields with accuracy.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy-eqUAHpr4qWimtoaVpMk0mfL1KWxLL0vRiNHsISAzTe2NTgrGS4fSvwS03RL9EkFtmUWny0mOllKZZZ-dt-00zp4D-nr3PkDjdlP8JoCLcOYl33JtMzs6YmRFIAysnOlq_vf3WnocVUkTSAsVGp5MrQuctM2EZTnU0nlC5Pa1dhTlxiaw1e-xlW52s9B_bq617RZ4iaB5Jxy8N90wbF6PryNZ5cmnTH5g-bmzzukxyn6i1FwZFVmZJrmJeY1V4DLR3RgSHR_Hy1p",
          },
        ]}
      />
    </section>
  );
};

export default Robot;
