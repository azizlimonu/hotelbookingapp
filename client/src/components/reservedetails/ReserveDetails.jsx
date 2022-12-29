import React, { useContext } from 'react';
import './reservedetails.css';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';
import ReserveSideBar from '../reservedetails/ReserveSideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleCheck, faDesktop, faParking, faStar, faUserTie, faUtensils, faVanShuttle, faWifi } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { ReserveContext } from '../../context/ReserveContext';

const ReserveDetails = ({
  hotel,
  hotelLoading,
  hotelError,
  roomData,
  roomLoading,
  roomError,
  formData,
  setFormData,
  setStep
}) => {

  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { selectedRooms } = useContext(ReserveContext);

  const handleChange = (key, value) => {
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };
  // console.log("Room is now", selectedRooms);
  // console.log(hotel);
  // console.log(roomData)

  // console.log("prop room", roomData);
  return (
    <div className="reserved">
      {roomLoading ? "Room Is Loading" : roomError ? "Room Error" : (
        roomData && (
          <ReserveSideBar roomData={roomData} hotel={hotel} />
        )
      )}
      {hotelLoading ? "Hotel Is Loading" : hotelError ? "Hotel Error" : (
        hotel && (
          <div className='reserve-personal'>
            <div className="reserve-personal-container">
              <div className="reserve-personal-container-hotel">
                <div className="reserve-personal-container-hotel-container">
                  <img src={hotel.photos? hotel.photos[0] : ""} alt='hotel-img' />
                  <div className="reserve-personal-hotel-container-details">
                    <div className="reserve-personal-details-title">
                      <span>{hotel.type?.toUpperCase()}</span>
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </div>

                    <h3>{hotel.name}</h3>
                    <span>{hotel.address}</span>
                    <span className='reserve-personal-details-review'>
                      Great Services - 8.8
                    </span>
                    <div className='reserve-personal-details-rating'>
                      <button>8.8</button>
                      <span>Excellent</span>
                    </div>

                    <div className="reserve-personal-details-service">
                      <div className='reserve-details-service-item'>
                        <FontAwesomeIcon icon={faParking} />
                        Parking
                      </div>
                      <div className='reserve-details-service-item'>
                        <FontAwesomeIcon icon={faWifi} />
                        Free Wifi
                      </div>
                      <div className='reserve-details-service-item'>
                        <FontAwesomeIcon icon={faUtensils} />
                        Restaurant
                      </div>
                      <div className='reserve-details-service-item'>
                        <FontAwesomeIcon icon={faVanShuttle} />
                        Airport shuttle
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reserve-personal-container-services">
                <h3>Good To Know</h3>
                <div className="reserve-personal-container-service-desc">
                  <div className="reserve-personal-container-service-desc-item">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      color={'#00800a'}
                      className='service-desc-icon'
                      size="lg"
                    />
                    <span>
                      Free Cancelation Until 23:59 on {" "}
                      {format(dates[0].startDate, 'dd MMM yyyy')}
                    </span>
                  </div>

                  <div className="reserve-personal-container-service-desc-item">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      color={'#00800a'}
                      className=''
                      size="lg"
                    />
                    <span>No Credit Card Needed</span>
                  </div>

                  <div className="reserve-personal-container-service-desc-item">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      color={'#00800a'}
                      className=''
                      size="lg"
                    />
                    <span>No payment needed today. You'll pay when you stay</span>
                  </div>

                  <div className="reserve-personal-container-service-desc-item">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      color={'#00800a'}
                      className=""
                      size="lg"
                    />
                    <span>
                      {`Congratulations! You've chosen the cheapest ${hotel.type} at ${hotel.name}. Don't miss out, book now!`}
                    </span>
                  </div>
                </div>

              </div>

              <div className="reserve-personal-container-details">
                <div className="reserve-personal-container-details-header">
                  <div className="reserve-personal-container-details-header-title">
                    <h3>Enter your details</h3>
                    <span>Almost done! Just fill in the * required info</span>
                  </div>

                  <div className="reserve-personal-container-details-header-username">
                    <FontAwesomeIcon icon={faUserTie} color="#003580" />
                    {user.username}
                  </div>
                </div>

                <div className="reserve-personal-container-details-form">
                  <div className="reserve-details-form-work">
                    <h5>Are you traveling for work</h5>
                    <div className="reserve-details-form-work-input">
                      <input
                        type="radio"
                        id="yes"
                        name="work"
                        value={1}
                        onChange={(e) =>
                          handleChange('isTravelForWork', e.target.value)
                        }
                      />{' '}
                      <span>Yes</span>
                      <input
                        type="radio"
                        id="no"
                        name="work"
                        value={0}
                        onChange={(e) =>
                          handleChange('isTravelForWork', e.target.value)
                        }
                      />{' '}
                      <span>No</span>
                    </div>
                  </div>

                  <div className="reserve-details-form-data">
                    <div className="reserve-details-form-data-name">
                      <div className="details-form-data-name-first">
                        <label>First Name</label>
                        <input
                          type="text"
                          placeholder="first name"
                          defaultValue={formData.firstName}
                          onChange={(e) =>
                            handleChange('firstName', e.target.value)
                          }
                        />
                      </div>

                      <div className="details-form-data-name-last">
                        <label>Last Name</label>
                        <input
                          type="text"
                          placeholder="last name"
                          defaultValue={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="reserve-details-form-email">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      defaultValue={user.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <span>Confirmation email sent to this address</span>
                  </div>
                </div>

                <div className="reserve-personal-container-details-booking">
                  <h5>Who are you booking for</h5>
                  <div className="details-booking-container">
                    <div className="details-booking-container-input">
                      <input
                        type="radio"
                        id="main-guest"
                        name="who-booking"
                        value={0}
                        onChange={(e) =>
                          handleChange('whoBookingFor', e.target.value)
                        }
                      />{' '}
                      <span>{`I'm the main guest`}</span>
                    </div>

                    <div className="details-booking-container-input">
                      <input
                        type="radio"
                        id="someone-else"
                        name="who-booking"
                        value={1}
                        onChange={(e) =>
                          handleChange('whoBookingFor', e.target.value)
                        }
                      />{' '}
                      <span>{`I'm booking for someone else`}</span>
                    </div>


                  </div>
                </div>
              </div>

              <div className="reserve-personal-container-request">
                <h3>Special Request</h3>
                <div className='reserve-personal-request-container'>
                  <p>
                    Special requests can't be guaranteed, but the property will do
                    its best to meet your needs. You can always make a special
                    request after your booking is complete.
                  </p>
                  <span>
                    Please write your requests in English (optional)
                  </span>
                  <textarea
                    rows={4}
                    id="special-request"
                    name="special-request"
                    defaultValue={formData.specialRequest}
                    onChange={(e) => handleChange('specialRequest', e.target.value)}
                  />
                </div>
              </div>

              <div className="reserve-personal-container-arrival">
                <h3>Your arrival time</h3>
                <div className="arrival-container">
                  <div className="arrival-container-desc">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size="xl"
                      color="#00800a"
                    />
                    <p>
                      Your room will be ready for check-in between 2:00 PM and 12:00
                      PM
                    </p>
                  </div>

                  <div className="arrival-container-desc">
                    <FontAwesomeIcon icon={faDesktop} size="xl" color="#00800a" />
                    <p>24-hour front desk – help whenever you need it!</p>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => setStep(2)} className='reserve-btn'>
              Next: Final details{' '}
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </button>
          </div>
        )
      )}
    </div>
  )
}

export default ReserveDetails;