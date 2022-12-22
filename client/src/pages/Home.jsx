import React from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';
import './home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className='homeContainer'>
        {/* Featured */}
        <h1 className="homeTitle">Browse by property type</h1>
        {/* <PropertyList /> */}
        <h1 className="homeTitle">Homes guests love</h1>
        {/* <FeaturedProperties /> */}
        {/* <MailList /> */}
        <Footer />
      </div>
    </>
  )
}

export default Home