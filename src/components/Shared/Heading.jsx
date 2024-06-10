import PropTypes from "prop-types";
const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-3xl font-bold lg:text-5xl md:text-4xl  text-[#8A2BE2] ">
        {title}
      </div>
      <div className="divider bg-[#8A2BE2] lg:h-1 h-[2px]"></div>
      {subtitle && (
        <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
      )}
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  center: PropTypes.bool,
};

export default Heading;
