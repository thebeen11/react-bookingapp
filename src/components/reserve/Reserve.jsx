import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { SearchContext } from "../../context/searchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);
  const [selectedRooms, setselectedRooms] = useState([]);
  const { date } = useContext(SearchContext);
  const navigate = useNavigate()

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const newStartDate = new Date(start.getTime());
    const date = [];

    while (newStartDate <= end) {
      date.push(new Date(newStartDate).getTime());
      newStartDate.setDate(newStartDate.getDate() + 1);
    }
    return date;
  };
  const allDates = getDatesInRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => 
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };


  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setselectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
        })
      );
      setOpen(false)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserveClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="reserveItem">
            <div className="reserveItemInfo">
              <div className="reserveTitle">{item.title}</div>
              <div className="reserveDescription">{item.description}</div>
              <div className="reserveMax">
                Max People:
                <b>{item.maxPoeple}</b>
              </div>
              <div className="reservePrice">{item.price}</div>
            </div>
            <div className="reserveSelect">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="reserveBtn">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
