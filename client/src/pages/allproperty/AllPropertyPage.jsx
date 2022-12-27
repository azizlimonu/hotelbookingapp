import React from 'react'
import AllProperty from '../../components/allproperty/AllProperty';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import PropertyList from '../../components/propertylist/PropertyList';
import useFetch from '../../hooks/useFetch'
import './allpropertypage.css';

const AllPropertyPage = ({ type }) => {
  const { data, loading, error } = useFetch(`/hotels?type=${type}`);

  return (
    <div>
      <Navbar />
      <Header />
      <div className='hotel-page-container'>
        <AllProperty
          data={data}
          loading={loading}
          error={error}
          type={type}
        />
        <h2 style={{"marginTop":"10px", "marginBottom":"10px"}}>Want to search another Property? Here...</h2>
        <PropertyList />
      </div>
    </div>
  )
}

export default AllPropertyPage;