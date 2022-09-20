import { Link } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoryItem = ({ category: { title, imageUrl } }) => {
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="directory-item-body">
        <h2>{title}</h2>
        <Link to={`shop/${title}`}>Shop Now</Link>
      </div>
    </div>
  );
};

export default DirectoryItem;
