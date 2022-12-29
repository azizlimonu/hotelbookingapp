import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import ReserveDetails from '../../components/reservedetails/ReserveDetails';
import ReserveFinalStep from '../../components/reservedetails/ReserveFinalStep';
import { AuthContext } from '../../context/AuthContext';
import { ReserveContext } from '../../context/ReserveContext';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';

const ReservePage = () => {
  const [step, setStep] = useState(1);

  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const hotelId = location.pathname.split('/')[2];

  const { selectedRooms } = useContext(ReserveContext);
  const { data: hotelData, loading: hotelLoading, error: hotelError } = useFetch(
    `/hotels/find/${hotelId}`
  );

  const { data: roomData, loading: roomLoading, error: roomError } = useFetch(`/rooms/multiple/${selectedRooms.toString()}`);

  const [formData, setFormData] = useState({
    userId: user._id,
    isTravelForWork: false,
    firstName: '',
    lastName: '',
    email: user.email || '',
    whoBookingFor: 0,
    specialRequest: '',
    country: '',
    phoneNumber: '',
    price: 0,
    hotelId: hotelId,
    roomIds: selectedRooms.toString(),
    startDate: dates[0].startDate,
    endDate: dates[0].endDate,
  })

  return (
    <>
      <Navbar />
      <div className='reserve-page'>

        {step === 1 && (
          <ReserveDetails
            setStep={setStep}
            hotel={hotelData}
            hotelLoading={hotelLoading}
            hotelError={hotelError}
            roomData={roomData}
            roomLoading={roomLoading}
            roomError={roomError}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <ReserveFinalStep
            setStep={setStep}
            hotel={hotelData}
            hotelLoading={hotelLoading}
            hotelError={hotelError}
            roomData={roomData}
            roomLoading={roomLoading}
            roomError={roomError}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </>
  )
}

export default ReservePage;