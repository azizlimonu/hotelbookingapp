import { faChevronLeft, faLock, faParking, faStar, faUtensils, faVanShuttle, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ReserveContext } from '../../context/ReserveContext';
import { SearchContext } from '../../context/SearchContext';
import ReserveSideBar from './ReserveSideBar';
import './reservefinalstep.css';

const ReserveFinalStep = ({
  setStep,
  hotel,
  hotelLoading,
  hotelError,
  roomData,
  roomLoading,
  roomError,
  formData,
  setFormData
}) => {

  const { dates } = useContext(SearchContext);
  const { selectedRooms } = useContext(ReserveContext);
  const { user } = useContext(AuthContext);

  // get time
  const millSeconds = 1000 * 60 * 60 * 24;
  const dayDifference = (startDate, endDate) => {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / millSeconds);
    return diffDays;
  };

  const numberOfDays = dayDifference(dates[0].startDate, dates[0].endDate);
  const price = roomData && roomData?.map((x) => (x.price * numberOfDays)).reduce((a, b) => a + b);

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, price: price && price * 1.05 }
    });
  }, [price, setFormData]);

  const getDatesInRage = (startDate, endDate) => {
    const date = new Date(startDate.getTime());
    const dateList = [];

    while (date <= endDate) {
      dateList.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dateList;
  };

  const allDates = getDatesInRage(dates[0].startDate, dates[0].endDate);

  const handleReserveForm = async () => {
    try {
      try {
        await axios.post('/forms', formData);
      } catch (error) {
        console.log("Form Error");
      }

      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`,
            { dates: allDates, }
          );
          return res.data;
        })
      );

      // after updated availability rooms redirect to payment
    }
    catch (error) {
      console.log('Error')
    }
  }

  const handleChange = (key, value) => {
    setFormData((prev) => {
      return { ...prev, [key]: value }
    });
  };

  return (
    <div rf>
      {roomLoading ? "Room Is Loading" : roomError ? "Room Error" : (
        roomData && (
          <ReserveSideBar roomData={roomData} hotel={hotel} />
        )
      )}

      {hotelLoading ? "Hotel Is Loading" : hotelError ? "Hotel Error" : (
        hotel && (
          <div className='rfp'>
            <div className="rfpc">
              <div className="rfpch">
                <div className="rfpchc">
                  <img
                    src={hotel.photos ? hotel.photos[0] : ""}
                    alt='hotel0-img'
                    className='rfpchci'
                  />
                  <div className="rfpchcd">
                    <div className="rfpchcdt">
                      <span>{hotel.type}</span>
                      <FontAwesomeIcon icon={faStar} size="xs" color="#febb02" />
                      <FontAwesomeIcon icon={faStar} size="xs" color="#febb02" />
                      <FontAwesomeIcon icon={faStar} size="xs" color="#febb02" />
                      <FontAwesomeIcon icon={faStar} size="xs" color="#febb02" />
                    </div>

                    <h3>{hotel.name}</h3>
                    <span>{hotel.address}</span>
                    <span className='rfpchcdrev'>
                      Excellent Location — 9.0
                    </span>

                    <div className="rfpchcdrat">
                      <button>9.0</button>
                      <span>Excellent</span>
                    </div>

                    <div className="rfpchcds">
                      <div className="rfpchcdsi">
                        <FontAwesomeIcon icon={faParking} />
                        Parking
                      </div>
                      <div className="rfpchcdsi">
                        <FontAwesomeIcon icon={faUtensils} />
                        Restaurant
                      </div>
                      <div className="rfpchcdsi">
                        <FontAwesomeIcon icon={faVanShuttle} />
                        Airport shuttle
                      </div>
                      <div className="rfpchcdsi">
                        <FontAwesomeIcon icon={faWifi} />
                        Free Wifi
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="rfpcd">
                <div className="rfpcdh">
                  <div className="rfpcdht">
                    <h3>Enter your details</h3>
                    <span>Almost done! Just fill in the * required info</span>
                  </div>
                </div>

                <div className="rfpcdf">
                  <div className="rfpcdfd">
                    <div className="rfpcdfdc">
                      <label>Country/region *</label>
                      <input
                        type="text"
                        placeholder="Viet Nam"
                        defaultValue={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                      />
                    </div>

                    <div className="rfpcdfdp">
                      <label>{'Telephone (mobile number preferred) *'}</label>
                      <input
                        type="number"
                        placeholder="+0123456789"
                        defaultValue={formData.phoneNumber}
                        onChange={(e) =>
                          handleChange('phoneNumber', e.target.value)
                        }
                      />
                      <span>Needed by the property to validate your booking</span>
                    </div>
                  </div>

                  <div className="rfpcdfi">
                    <div className="rfpcdfin">
                      <span>Name</span>
                      <div>
                        {formData.firstName
                          ? `${formData.firstName} ${formData.lastName}`
                          : user.username}
                      </div>
                    </div>

                    <div className="rfpcdfie">
                      <span>Email</span>
                      <div>{formData.email || user.email}</div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="rfpcm-i">
                <div className="rfpcm-ii">
                  You can unsubscribe at any time. View our{' '}
                  <span>privacy policy</span>.
                </div>
                <div className="rfpcm-iii">
                  Your booking is with Lovely House directly and by completing this
                  booking you agree to the <span>booking conditions</span>,{' '}
                  <span>general terms</span>, and <span>privacy policy</span>.
                </div>
              </div>

            </div>

            <div className="rfpbg">
              <button
                onClick={() => setStep(1)}
                className='rfpbgp-b'
              >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                <span>Previous Step</span>
              </button>

              <button
                onClick={handleReserveForm}
                className='rfpbgr-b'
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.country ||
                  !formData.phoneNumber ||
                  !formData.hotelId ||
                  !formData.roomIds
                }
              >
                <FontAwesomeIcon icon={faLock} size="lg" />
                <span>Complete Booking</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default ReserveFinalStep