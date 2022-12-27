import React from 'react'
import AllProperty from '../../components/allproperty/AllProperty';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import useFetch from '../../hooks/useFetch'

const AllPropertyPage = ({ type }) => {
const {data,loading,error} = useFetch(`/hotels?type=${type}`);

  return (
    <div>
      <Navbar />
      <Header />
        <div className='hotel-page-container'>
          {data?.map((data, i) => (
            <AllProperty data={data} key={i} />
          ))}
        </div>
    </div>
  )
}

export default AllPropertyPage;