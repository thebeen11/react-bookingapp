import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  return (
    <div className="fp">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0] || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"}
                alt=""
                className="fpImg"
              />
              <div className="fpName">{item.name}</div>
              <div className="fpCity">{item.city}</div>
              <div className="fpPrice">Starting from ${item.cheapestPrice}</div>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Exellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
