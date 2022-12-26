import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import SearchItem from '../../components/searchItem/SearchItem';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import './list.css';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const location = useLocation();
  const destination = location.state.destination;
  const options = location.state.options;
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  // const [destination, setDestination] = useState(location.state.destination);
  // const [options, setOptions] = useState(location.state.options);
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const result = await axios.get(
  //       `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  //     )
  //     setLoading(false);
  //     setData(result);
  //   };
  //   fetchData();
  //   console.log("api triggered")
  // }, [destination, max, min]);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <>
      <Navbar />
      <Header type='list' />
      <div className="listContainer">
        <div className="listWrapper">
          {/* left side */}
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>

            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate &&  (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  range={dates}
                />
              )}
            </div>

            <div className="lsItem">
              <label>Filter By</label>
              <div className="lsOptions">
                {/* min price */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night ($)</small>
                  </span>
                  <input
                    type="number"
                    min={1}
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                {/* max price */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    min={1}
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                {/* adult */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                {/* Children */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                {/* Room  */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          {/* right side */}
          <div className="listResult">
            {loading ? "loading..." : error ? "error occured" : (
              <>
                {data?.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default List