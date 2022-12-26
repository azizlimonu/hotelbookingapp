import React from 'react';
import useFetch from '../../hooks/useFetch';
import './featured.css';

const Featured = () => {
  const { data, loading, error } = useFetch(
    '/hotels/countByCity?cities=bandung,jakarta,bali'
  );
  // console.log(data);

  return (
    <div className='featured'>
      {loading ? "Loading ..." : error ? "Error Occured" :
        <>
          <div className="featuredItem">
            <img
              src="https://res.cloudinary.com/di7pxwxss/image/upload/v1671895875/hotel/jakarta_jjby6t.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Jakarta</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
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
          <div className="featuredItem">
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