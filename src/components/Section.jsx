// src/components/Section.jsx
const Section = ({ title, features }) => (
  <div className="px-4">
    <h2 className="text-[22px] font-bold pb-3">{title}</h2>
    <div className="space-y-6">
      {features.map((f, i) => (
        <div
          key={i}
          className="flex flex-col  gap-4 rounded-lg"
        >
          {/* LEFT SIDE → Text Info */}
          <div className="flex flex-col flex-1 gap-1">
            {f.subtitle && (
              <p className="text-black text-[15px] md:text-base font-bold">
                {f.subtitle}
              </p>
            )}
            <p className="text-black text-[15px] md:text-base font-bold">
              {f.title}
            </p>
            <p className="text-gray-600 text-[15px] md:text-base font-medium">
              {f.desc}
            </p>
          </div>

          {/* RIGHT SIDE → Image ya Component */}
          <div className="w-full  rounded-lg ">
            {f.component ? (
              <div className="aspect-video">{f.component}</div> // ✅ map / chart
            ) : (
              f.img && (
                <div
                  className="w-full h-full bg-center bg-cover rounded-lg aspect-video"
                  style={{ backgroundImage: `url("${f.img}")` }}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Section;
