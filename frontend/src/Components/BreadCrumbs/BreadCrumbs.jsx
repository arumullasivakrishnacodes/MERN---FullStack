import React from "react";
import '../BreadCrumbs/BreadCrumbs.css'

function BreadCrumbs (props) {
    return (
      <div className="breadcrumbs-main-container">
        <p>{props.home}</p>
        <p><i class="bi bi-chevron-right"></i></p>
        <p>{props.category}</p>
        <p className={`${props.pname ? '': 'd-none'}`}><i class="bi bi-chevron-right"></i></p>
        <p>{props.pname ? props.pname: ''}</p>
      </div>
    );
}

export default BreadCrumbs;