import React, { useState } from 'react';
import '../Sidebar/Sidebar.css'
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className='sidebar-main-component'>
        <div className="side-bar-menu-container">
            <NavLink to='/'><div className={`menu-item`}>DASHBOARD</div></NavLink>
            <NavLink to='/addproducts'><div className={`menu-item`}>ADD PRODUCTS</div></NavLink>
            <NavLink to='/allproducts'><div className={`menu-item`}>PRODUCTS LIST</div></NavLink>
            <NavLink to='/newcollections'><div className={`menu-item`}>ADD NEWCOLLECTIONS</div></NavLink>
            <NavLink to='/newcollectionslist'><div className={`menu-item`}>NEWCOLLECTIONS List</div></NavLink>
        </div>
    </div>
  )
}

export default Sidebar