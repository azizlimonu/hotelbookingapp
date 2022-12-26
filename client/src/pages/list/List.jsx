import React, { useContext, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import SearchItem from '../../components/searchItem/SearchItem';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import './list.css';
// import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';

const List = () => {
  const location = useLocation();
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("999");
  const [destination, setDestination] = useState(location.state.destination || { adult: 1, children: 0, room: 1 });
  const [options, setOptions] = useState(location.state.options);

  const [openOptions, setOpenOptions] = useState(false);

  const { data, loading, reFetch } = useFetch(`
  /hotels?city=${destination}&min=${min}&max=${max}
  `);

  const { data: count } = useFetch(`
  /hotels/countByCity?cities=${destination}
  `);
  const { dispatch } = useContext(SearchContext);

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1
      }
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
    reFetch();
  }

  return (
    <>
      <Navbar />
      <Header type='list' />
      <div className="listContainer">
        <div className="listWrapper">
          {/* left side */}
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <form onSubmit={handleSubmit}>
              <div className="lsItem">
                <label>Destination</label>
                <input placeholder={destination} type="text" onChange={(e) => setDestination(e.target.value)} />
              </div>

              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    range={dates}
                  />
                )}
              </div>

              <div className='lsItem'>
                <label>Room Capatity</label>
                <div className='lsOptions'>
                  <div className="lsOptionItem">
                    <span className="lsOptionText"
                      onClick={() => setOpenOptions(!openOptions)}
                    >
                      {`${options.adult} adults・${options.children} children・${options.room} room`}
                    </span>

                    {openOptions && (
                      <div className="headerItemOptions">
                        {/* adult */}
                        <div className="headerOptionsItem">
                          <span className="headerOptionsText">
                            Adult
                          </span>
                          <div className="headerOptionsButtonContainer">
                            <button
                              className='optionsCounterBtn'
                              onClick={() => handleOptions('adult', 'd')}
                              disabled={options.adult <= 1}
                            >
                              -
                            </button>
                            <span className="optionsCounterBtnNumber">
                              {options.adult}
                            </span>
                            <button
                              className='optionsCounterBtn'
                              onClick={() => handleOptions('adult', 'i')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        {/* children */}
                        <div className="headerOptionsItem">
                          <span className="headerOptionsText">
                            children
                          </span>
                          <div className="headerOptionsButtonContainer">
                            <button
                              className='optionsCounterBtn'
                              onClick={() => handleOptions('children', 'd')}
                              disabled={options.children <= 0}
                            >
                              -
                            </button>
                            <span className="optionsCounterBtnNumber">
                              {options.children}
                            </span>
                            <button
                              className='optionsCounterBtn'
                              onClick={() => handleOptions('children', 'i')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        {/* room */}
                        <div className="headerOptionsItem">
                          <span className="headerOptionsText">
                            Room
                          </span>
                          <div className="headerOptionsButtonContainer">
                            <button
                              className='optionsCounterBtn'
                              onClick={() => handleOptions('room', 'd')}
                              disabled={options.room <= 1}
                            >
                              -
                            </button>
                            <span className="optionsCounterBtnNumber">
                              {options.room}
                            </span>
                            <button
                              className='optionsCounterBtn'
                              onClick={() => handleOptions('room', 'i')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                </div>
              </div>
            </form>
            <button type='onSubmit'>Search</button>
          </div>
          {/* right side */}
          <div className="listResult">
            {loading ? "loading..." : (
              <>
                <h1>
                  {destination?.toUpperCase() || '..'} : {(count && count[0]) || "-"} Property Found
                </h1>
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