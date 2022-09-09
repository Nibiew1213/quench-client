import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';


import Beverages from './components/beverages/Beverages';
import BeverageDetails from './components/beverage/BeverageDetails';
import Header from './components/partials/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
     <Header />

     <Routes>
        <Route path="/" />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/beverages/:beverageId" element={<BeverageDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
     </Routes>

     <ToastContainer />
    </div>
  );
}

export default App;
