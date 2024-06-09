const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={icon}
        ></path>
      </svg>
      <div className="ml-3">
        <dt className="text-lg font-medium">{title}</dt>
        <dd className="mt-2 ">{description}</dd>
      </div>
    </div>
  );
};

export default FeatureCard;
