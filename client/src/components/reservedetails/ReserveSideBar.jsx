import { format } from 'date-fns';
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ReserveContext } from '../../context/ReserveContext';
import { SearchContext } from '../../context/SearchContext';
import './reservesidebar.css';

const ReserveSideBar = ({ roomData, hotel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { dates, options } = useContext(SearchContext);
  const { selectedRooms } = useContext(ReserveContext);

  const hotelId = location.pathname.split('/')[2];

  // get time
  const millSeconds = 1000 * 60 * 60 * 24;
  const dayDifference = (startDate, endDate) => {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / millSeconds);
    return diffDays;
  }
  const numberOfDays = dayDifference(dates[0].startDate, dates[0].endDate);

  const price = roomData && numberOfDays * roomData.price * options.room;

  console.log(price, typeof (price));

  const handleSelectionChange = () => {
    navigate(`/hotels/${hotelId}`);
  };

  return (
    <div className='rb'>
      <div className="rbd">
        <h4 className="rbdh">
          Your Booking Details
        </h4>

        <div className="rbdc">
          <div className="rbdcd">
            <div className="rbdcdc-i">
              <h5>Check-in</h5>
              <p>{format(dates[0].startDate, 'E,MMM dd, yyyy')}</p>
              <span>2:00 PM - 12.00 PM </span>
            </div>

            <div className="rbdcdc-o">
              <h5>Check-out</h5>
              <p>{format(dates[0].endDate, 'E, MMM dd, yyyy')}</p>
              <span>7:00 AM - 12:00 PM</span>
            </div>
          </div>

          <div className="rbdcd-l">
            <h5>Total length of stay:</h5>
            <span>1 night</span>
          </div>
          <hr />

          <div className="rbdcs-r">
            <h5>You selected:</h5>
            <div className="rbdcs-rc">
              {roomData?.map((room) => (
                <div key={room._id}>
                  <>
                    {room.title} - {' '}
                    {room.roomNumbers?.map((num, i) => (
                      selectedRooms?.includes(num._id) && (
                        <span key={i}>{num.number}</span>
                      )
                    ))}
                  </>
                </div>
              ))}
            </div>
            <span className='rbdcs-r-c-cs' onClick={handleSelectionChange}>
              Change Your Selection
            </span>
          </div>

        </div>
      </div>

      <div className="rbp-s">
        <h4 className="rbp-sh">
          Your Price Summary
        </h4>

        <div className="rbp-sc">
          <div className="rbp-s-cp">
            <div className="rbp-scpi">
              <span>{roomData.title}</span>
              <span>US${price}</span>
            </div>

            <div className="rbp-scpi">
              <span>10 % TAX</span>
              <span>US${price && price * 0.1}</span>
            </div>
          </div>

          <div className="rbp-scp-t">
            <span>Price</span>
            <span>US${price && price + price * 0.05} *</span>
          </div>

          <div className="rbp-sce-c">
            <h5>Excluded charges</h5>
            <div className="rbp-sce-ci">
              <span>City tax</span>
              <span>US ${price * 0.01}</span>
            </div>

            <div className="rbp-sce-ci">
              <span>
                Damage deposit <b>Fully refundable</b>
              </span>
              <span>US${price * 0.25} *</span>
            </div>
          </div>
          <hr />

          <div className="rbp-scm-i">
            <span>
              *This price is converted to show you the approximate cost in US$. You'll pay in € or IDR. The exchange rate may change before you pay.
            </span>
            <span>
              Bear in mind that your card issuer may charge you a foreign transaction fee.
            </span>
          </div>
        </div>
      </div>

      <div className="rbp-sch">
        <h4 className="rbp-schh">
          Your payment schedule
        </h4>
        <div>
          <span className="rbp-schc">
            No payment today. You'll pay when you stay.
          </span>
        </div>
      </div>

      <div className="rbc-c">
        <h4 className="rbc-ch">
          How much will it cost to cancel?
        </h4>
        <div className="rbc-cc">
          <span>
            {
              `Free cancellation until 23:59 on ${format(
                dates[0].startDate, 'dd MMM',)}`
            }
          </span>
        </div>
      </div>
    </div >
  )
}

export default ReserveSideBar