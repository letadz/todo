import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import PropTypes from "prop-types";

const FaIcon = ({ icon, spin, size }) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`flex-shrink-0 ${size ? size : "h-4 w-4"} 
      ${spin ? "fa-spin" : ""}`}
    />
  );
};

FaIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  size: PropTypes.string,
  spin: PropTypes.bool,
};

FaIcon.defaultProps = {
  spin: false,
};

export default FaIcon;
