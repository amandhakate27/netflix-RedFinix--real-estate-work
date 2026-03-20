import { CalendarCheck2, Building2, MapPinned, ShieldCheck } from "lucide-react";

const reasons = [
  {
    title: "Explore verified listings",
    description: "Browse curated homes, apartments, and premium projects with trusted photos and essential details.",
    icon: Building2,
  },
  {
    title: "Schedule visits with ease",
    description: "Book site visits quickly and coordinate viewings with agents without losing your shortlisted properties.",
    icon: CalendarCheck2,
  },
  {
    title: "Compare top neighborhoods",
    description: "Discover the right area with nearby schools, commute insights, and lifestyle-friendly locality highlights.",
    icon: MapPinned,
  },
  {
    title: "Connect with trusted agents",
    description: "Get guided support from verified experts for tours, negotiations, and smooth next steps in your search.",
    icon: ShieldCheck,
  },
];

const ReasonsSection = () => {
  return (
    <section className="bg-black px-4 pb-16 pt-4 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-3xl sm:font-semibold">
          More reasons to choose Redfinix
        </h2>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5 xl:grid-cols-4">
          {reasons.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="relative mx-auto w-full max-w-[22.5rem] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[#1a2260] via-[#251b38] to-[#2b1522] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] min-h-[14.25rem] sm:max-w-none sm:min-h-[14rem] sm:p-6 lg:min-h-[15rem] xl:min-h-[17.5rem] xl:mx-0"
            >
              <div className="max-w-[32rem]">
                <h3 className="text-[1.35rem] font-semibold leading-tight text-white sm:text-[1.65rem]">{title}</h3>
                <p className="mt-3 max-w-[32rem] text-[0.98rem] leading-7 text-white/70 sm:text-[0.98rem] sm:leading-7">
                  {description}
                </p>
              </div>

              <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,163,196,0.95),_rgba(192,68,255,0.65)_60%,_rgba(192,68,255,0)_100%)] sm:bottom-5 sm:right-5 sm:h-14 sm:w-14">
                <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" strokeWidth={2.1} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;












