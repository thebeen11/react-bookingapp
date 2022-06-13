import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="searchItemImg"
      />
      <div className="searchItemDesc">
          <h1 className="searchItemTitle">
              {item.name}
          </h1>
          <span className="searchItemDistance">
              {item.distance}m from center
          </span>
          <span className="searchItemTaxiOp">Free Airports Taxi</span>
          <span className="searchItemSubtitle">
              {item.description}
          </span>
          <span className="searchItemFeatures">
              Entire Studio
          </span>
          <span className="searchItemCancelOp">
              Free Cancelation
          </span>
          <span className="searchItemCancelOpSubtitle">
              You Can Cancel Later
          </span>
      </div>
      <div className="searchItemDetails">
          {item.rating &&<div className="searchItemRating">
              <span>Excellent</span>
              <button>{item.rating}</button>
          </div>}
          <div className="searhItemdetailText">
              <span className="searchItemPrice">${item.cheapestPrice}</span>
              <span className="searchItemTaxOp">free taxes and fees</span>
              <Link to={`/hotels/${item._id}`}>
              <button className="searchItemButton">See Availability</button>
              </Link>
          </div>
      </div>
    </div>
  );
};

export default SearchItem;
