import React  from 'react'
import { useParams } from 'react-router-dom';



function ProductDetail(props){
    
    const {id} = useParams();
    //create a variable to store the data of the product
    const product = props.data.find((item) => item.item.id === id);
    //check if the product is found
    if(product){
    return(
        <div className="container">
            <div className="row">
            <h1>{product.item.Productname}</h1>
                <div className="col-6">
                    <img src={product.item.image} alt={product.item.type} width="100%" height="100%"/>
                </div>
                <div className="col-6">
                    <h3>Product Description</h3>
                    <p>{product.item.description}</p><h3>Product Details</h3>
                    <strong>Brand Name</strong> : {product.item.name}<br/>
                    <strong>Price</strong> : {product.item.price}<br/>
                    <strong>Ram</strong> : {product.item.Ram}<br/>
                    <strong>Internal Storage</strong> : {product.item.InternalStorage}<br/>
                    <strong>Screen Type</strong> : {product.item.ScreenType}<br/>
                    <strong>Screen Size</strong> : {product.item.ScreenSize}<br/>
                    <a href={product.item.url} target="_blank" rel="noreferrer"><button className="btn btn-primary" >Buy Now</button></a>
                </div>
            </div>
        </div>
    )
  }
}
export default ProductDetail

  