import PropTypes from "prop-types";

import "./Feature.css";

export default function Feature({ imageSource, title, description }) {
  return (
    <div className="feature-item">
      <img src={imageSource} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

Feature.propTypes = {
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
