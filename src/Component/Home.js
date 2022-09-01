import React from "react";
import Item from "./Item";

export default function Home(props) {
  //create a function to display the item in the firebase database

  return (
    <div className="container">
      <div className="row" >
        {props.data.map((data, index) => {
          return (
            <div className="col-md-2" key={index} >
              <Item
                id={data.item.id}
                type={data.item.name}
                productname={data.item.Productname}
                description={data.item.description}
                image={data.item.image}
                amount={data.item.price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
