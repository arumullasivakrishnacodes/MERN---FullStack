import React from 'react'
import {Route, Routes} from 'react-router-dom';
import AllProducts from './Components/AllProducts/AllProducts';
import AddProducts from './Components/AddProducts/AddProducts';
import DashBoard from './Components/DashBoard/DashBoard';
import Navbar from './Components/Navbar/Navbar';
import '../src/App.css'
import Sidebar from './Components/Sidebar/Sidebar';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="content-manager-container row">
          <div className="sidebar-menu-container col-3">
            <div className="sidebar-items-container"><Sidebar /></div>
          </div>
          <div className="content-container col-9">
            <div className="content-data-container">
            <Routes>
              <Route path='/' element={<DashBoard />} />
              <Route path='/allproducts' element={<AllProducts />} />
              <Route path='/addproducts' element={<AddProducts />} />
            </Routes>
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default App