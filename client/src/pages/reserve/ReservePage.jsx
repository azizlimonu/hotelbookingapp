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
  const location = useLocation();
  const hotelId = location.pathname.split('/')[2];
  console.log(hotelId);

  const { data: hotelData } = useFetch(`/hotels/${hotelId}`);

  const { selectedRooms } = useContext(ReserveContext);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { data: roomData } = useFetch(
    `/rooms/multiple/${selectedRooms}`
  );

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
          roomData={roomData}
          formData={formData}
          setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <ReserveFinalStep 
          setStep={setStep}
          hotel={hotelData}
          roomData={roomData}
          formData={formData}
          setFormData={setFormData}
          />
        )}
      </div>
    </>
  )
}

export default ReservePage;