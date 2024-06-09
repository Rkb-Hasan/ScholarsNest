import FeatureCard from "./FeatureCard";
import Heading from "./../Shared/Heading";

const features = [
  {
    icon: "M5 13l4 4L19 7",
    title: "Free Wi-Fi",
    description:
      "Stay connected with our high-speed internet available throughout the hostel.",
  },
  {
    icon: "M5 13l4 4L19 7",
    title: "24/7 Security",
    description:
      "Your safety is our priority. Our hostel is equipped with round-the-clock security.",
  },
  {
    icon: "M5 13l4 4L19 7",
    title: "Complimentary Breakfast",
    description:
      "Start your day with a delicious and healthy breakfast, on us.",
  },
  {
    icon: "M5 13l4 4L19 7",
    title: "Laundry Services",
    description:
      "Convenient laundry facilities to keep your clothes fresh and clean.",
  },
  {
    icon: "M5 13l4 4L19 7",
    title: "Common Room",
    description:
      "A cozy common room to relax and socialize with fellow residents.",
  },
  {
    icon: "M5 13l4 4L19 7",
    title: "Fitness Center",
    description: "Stay fit and healthy with our fully-equipped fitness center.",
  },
  {
    icon: "M5 13l4 4L19 7",
    title: "Library",
    description: "Quiet and comfortable space for studying and reading.",
  },
  {
    icon: "M5 13l4 4L19 7",
    title: "Rooftop Terrace",
    description: "Enjoy breathtaking views and relax on our rooftop terrace.",
  },
];

const Feature = () => {
  return (
    <div className="my-10">
      <Heading title={"Features"} center={true}></Heading>
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-slate-300 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            All the amenities you need
          </h2>
          <p className="mt-4 text-lg ">
            Experience the best of hostel living with our top-notch facilities
            and services.
          </p>
        </div>
        <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Feature;
