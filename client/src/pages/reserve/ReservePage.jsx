import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
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
  const [roomArray, setRoomArray] = useState([]);
  // console.log(hotelId);
  const { selectedRooms } = useContext(ReserveContext);
  // console.log("rsv[rooms]:", selectedRooms)
  // fetch hotel data
  const { data: hotelData } = useFetch(
    `/hotels/find/${hotelId}`
  );

  // fetch room data
  useEffect(() => {
    const fetchData = async () => {
      const roomArr = await Promise.all(
        selectedRooms?.map((roomId) => {
          const res = axios.get(`/rooms/multiple/${roomId}`);
          return res
        })
      );
      setRoomArray(roomArr);
    }
    fetchData();
  }, [selectedRooms]);
  // console.log("roomArr", roomArray);

  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  // console.log("hotel data:", hotelData);
  // console.log("room data:", roomData);
  // console.log("room selected", selectedRooms);

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
            roomData={roomArray}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {/* {step === 2 && (
          <ReserveFinalStep
            setStep={setStep}
            hotel={hotelData}
            roomData={roomData}
            formData={formData}
            setFormData={setFormData}
          />
        )} */}
      </div>
    </>
  )
}

export default ReservePage;