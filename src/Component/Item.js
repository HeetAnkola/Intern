import React from 'react'
import {Link} from 'react-router-dom'

export default function Item(props) {
    
return (<Link to={`/ProductDetail/${props.id}`}style={{ textDecoration: 'none' }}>
    <div className='col' >
      <div className="card" style={{width:"12.5rem", marginTop:"8px"}}>
          <img src={props.image} className="card-img-top" alt="..." width="200" height="300"/>
          <div className="card-body">
            <h5 className="card-title text-truncate text-dark" >{props.productname}</h5>
            <p className="text-dark">{props.type}<br/>$ {props.amount}</p>

          </div>
      </div>
    </div>
    </Link>
  );
}