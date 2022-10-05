import React from "react";
import "../styles/bookings.css";

import carData from "../assets/dummy-data/booking-cars.js";
import CarItem from "../components/UI/CarItem";

const Bookings = () => {
  return (
    <div className="bookings">
      <div className="booking__wrapper">
        <h2 className="booking__title">Type of Requests</h2>

        <div className="filter__widget-wrapper">
          <div className="filter__widget-01">
            {/* <select> */}
              {/* <option value="New">Type</option> */}
              {/* <option value="Popular">Barangay ID</option>
              <option value="BC">Barangay Clearance</option>
              <option value="BR">Barangay Residency</option>
              <option value="Upcoming">Local Employment</option>
              <option value="Upcoming">Post Residency</option>
              <option value="Upcoming">Green Card</option>
              <option value="Upcoming">Libreng Libing Program</option>
              <option value="Upcoming">Bank Application</option>
              <option value="Upcoming">Indingency</option> */}

            {/* </select> */}
          </div>
  
          {/* <div className="filter__widget-01">
            <select>
              <option value="toyota">Types</option>
              <option value="bmw">Bmw</option>
              <option value="audi">Audi</option>
            </select>
          </div> */}
        </div>

        <div className="booking__car-list">
          {carData?.map((item) => (
            <CarItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Request;
