import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/Login/Login';
import Register from './pages/register/Register';
import ReservePage from './pages/reserve/ReservePage.jsx';
import UserReservation from './pages/reservation/UserReservation';

import AllPropertyPage from './pages/allproperty/AllPropertyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/:id' element={<Hotel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reserve/:id' element={<ReservePage />} />
        <Route path='/reservations' element={<UserReservation />} />

        <Route path='/all/hotel' element={<AllPropertyPage type={'hotel'} />} />
        <Route path='/all/apartment' element={<AllPropertyPage type={'apartment'} />} />
        <Route path='/all/cabin' element={<AllPropertyPage type={'cabin'} />} />
        <Route path='/all/villa' element={<AllPropertyPage type={'villa'} />} />
        <Route path='/all/resort' element={<AllPropertyPage type={'resort'} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
