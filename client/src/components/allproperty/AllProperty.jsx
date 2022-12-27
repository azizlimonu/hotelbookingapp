import React from 'react';
import { useNavigate } from 'react-router-dom';
import './allproperty.css';

const AllProperty = ({ data, loading, error, type }) => {
  const navigate = useNavigate();

  const handleClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };
  
  return (
    <div className='hotel-list'>
      <div className="hotel-list-container">
        <div className="hotel-list-header">
          <h3>Last minute {type.toLowerCase()} near you </h3>
          <p>
            Find a great deal on a {type.toLowerCase()} for tonight or an upcoming
            trip
          </p>
        </div>

        <div className="hotel-list-container-items">
          {loading ? "loading..." : error ? "error 404" : (
            data?.map((hotel) => (
              <div
                onClick={() => handleClick(hotel._id)}
                key={hotel._id}
                className='item-list-card-hotel'
              >
                <img src={hotel.photos[0]} alt={type} className='item-list-img-hotel' />
                <div className='item-list-content'>
                  <div className="item-list-content-header">
                    <div className="item-list-content-header-title">
                      <h5>{hotel.name}</h5>
                      <span>{hotel.address}</span>
                    </div>
                    <div className="item-list-content-rating">
                      <button>{hotel?.rating ? hotel?.rating : 9.9}</button>
                    </div>
                  </div>

                  <div className="item-list-content-desc">
                    <span>From</span>
                    <div className="item-list-content-desc-price">
                      USD ${hotel.cheapestPrice}
                    </div>
                    <span>Per Night</span>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AllProperty;