import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './featured.css';

const Featured = () => {
  const { data, loading, error } = useFetch(
    '/hotels/countByCity?cities=bandung,jakarta,bali'
  );
  const navigate = useNavigate();

  // console.log(data);
  const handleNavigate = (city) => {
    navigate('/hotels', {
      state: {
        destination: city,
        dates: [{
          startDate: new Date(),
          endDate: new Date(new Date().getTime() + 86400000),
          key: 'selection'
        }],
        options: { adult: 1, children: 0, room: 1 },
        openDate: true,
      }
    })
  }

  return (
    <div className='featured'>
      {loading ? "Loading ..." : error ? "Error Occured" :
        <>
          <div
            className="featuredItem"
            onClick={() => handleNavigate("jakarta")}
          >
            <img
              src="https://res.cloudinary.com/di7pxwxss/image/upload/v1671895875/hotel/jakarta_jjby6t.jpg"
              alt=""
              className="featuredImg"
            />
            <div
              className="featuredTitles">
              <h1>Jakarta</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div
            className="featuredItem"
            onClick={() => handleNavigate("bandung")}
          >
            <img
              src="https://res.cloudinary.com/di7pxwxss/image/upload/v1671895875/hotel/bandung_o9zyen.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Bandung</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>

          <div
            className="featuredItem"
            onClick={() => handleNavigate("bali")}
          >
            <img
              src="https://res.cloudinary.com/di7pxwxss/image/upload/v1671895876/hotel/bali_xcal0g.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Bali</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>

        </>
      }
    </div>
  )
}

export default Featured;