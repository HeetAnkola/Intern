import React, { useState } from "react";
import { ref, remove, push, set, update } from "firebase/database";
import { db } from "../firebase-config";
import { v4 as uuidv4 } from "uuid";
import {Link} from "react-router-dom";

function Invertory(props) {
  //create table
  const [brandname, setBrandName] = useState("");
  const [productname, setProductName] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [ScreenSize, setScreenSize] = useState("");
  const [ScreenType, setScreenType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tempid, settempid] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [URL , setURL] = useState("");
  

  let c = 1;
  const addItem = () => {
    const postListRef = ref(db, "item");
    const newPostRef = push(postListRef);
    const id = uuidv4();
    if(brandname!=="" && productname!=="" && ram!=="" && storage!=="" && ScreenSize!=="" && ScreenType!=="" && price!=="" && description!=="" && image!=="" && URL!==""){
    set(newPostRef, {
      id: id,
      name: brandname,
      price: price,
      description: description,
      Productname: productname,
      Ram: ram,
      InternalStorage: storage,
      ScreenSize: ScreenSize,
      ScreenType: ScreenType,
      image: image,
      url: URL,
    }).then(() => {
      console.log("item added");
      setBrandName("");
      setProductName("");
      setRam("");
      setStorage("");
      setScreenSize("");
      setScreenType("");
      setPrice("");
      setDescription("");
      setImage("");
      setURL("");
    }).catch((error) => {
      alert(error.message);
    }
    )}
    else{
      alert("Please fill all the fields");
    }
  };
  const handleedit = (data) => {
    setIsEdit(true);
    settempid(data.key);
    setBrandName(data.item.name);
    setProductName(data.item.Productname);
    setRam(data.item.Ram);
    setStorage(data.item.InternalStorage);
    setScreenSize(data.item.ScreenSize);
    setScreenType(data.item.ScreenType);
    setPrice(data.item.price);
    setDescription(data.item.description);
    setImage(data.item.image);
    setURL(data.item.url);
  }

  const handleupdate = (e) => {
    update(ref(db, `item/${tempid}`), {
      name: brandname,
      price: price,
      description: description,
      Productname: productname,
      Ram: ram,
      InternalStorage: storage,
      ScreenSize: ScreenSize,
      ScreenType: ScreenType,
      image: image,
      url: URL,
    }).then(() => {
      console.log("item updated");
      setIsEdit(false);
      setBrandName("");
      setProductName("");
      setRam("");
      setStorage("");
      setScreenSize("");
      setScreenType("");
      setPrice("");
      setDescription("");
      setImage("");
      settempid("");
      setURL("");
    }).catch((error) => {
      alert(error.message);
    }
    );
  }
  if(props.email === "internuser@gmail.com"){
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Ram</th>
            <th scope="col">Internal Storage</th>
            <th scope="col">Screen Type</th>
            <th scope="col">Screen Size</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">URL</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((data, index) => {
            const deleteItem = () => {
              const itemRef = ref(db, "item/" + data.key);
              remove(itemRef)
                .then(() => {
                  console.log("Remove succeeded.");
                })
                .catch((error) => {
                  alert(error.message);
                });
            };
            return (
              <tr key={index}>

                <th scope="row">{c++}</th>
                {(data.key !== tempid) ? (<><td>{data.item.name}</td>
                  <td>{data.item.Productname}</td>
                  <td>{(data.item.description.length > 100) ? data.item.description.slice(0, 100) + "..." : data.item.description}</td>
                  <td>{data.item.Ram}</td>
                  <td>{data.item.InternalStorage}</td>
                  <td>{data.item.ScreenType}</td>
                  <td>{data.item.ScreenSize}</td>
                  <td>$ {data.item.price}</td>
                  <td>
                    <img
                      src={data.item.image}
                      style={{ width: "10rem" }}
                      alt={data.item.name}
                    />
                  </td>
                  <td><a href={data.item.url} target="_blank" rel="noreferrer">
                    <button className="btn btn-primary">URL</button></a>
                  </td>
                  </>) : (<><td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={brandname}
                      onChange={(e) => setBrandName(e.target.value)}
                    />
                  </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={productname}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Ram"
                        value={ram}
                        onChange={(e) => setRam(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Internal Storage"
                        value={storage}
                        onChange={(e) => setStorage(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Screen Type"
                        value={ScreenType}
                        onChange={(e) => setScreenType(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Screen Size"
                        value={ScreenSize}
                        onChange={(e) => setScreenSize(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="URL"
                        value={URL}
                        onChange={(e) => setURL(e.target.value)}
                        />
                      </td></>)}
                {isEdit ? (<><td>
                  <button className="btn btn-danger" onClick={handleupdate}>
                    Update
                  </button>
                  <button className="btn btn-primary " onClick={() => {
                    setIsEdit(false)
                    setBrandName("");
                    setProductName("");
                    setRam("");
                    setStorage("");
                    setScreenSize("");
                    setScreenType("");
                    setPrice("");
                    setDescription("");
                    setImage("");
                    settempid("");
                  }} >Cancel</button>
                </td></>) : (<><td>
                  <button className="btn btn-danger" onClick={deleteItem}>
                    Delete
                  </button>
                  <button className="btn btn-primary " onClick={() => handleedit(data)} >Edit</button>
                </td></>)}
              </tr>
            );
          })}
          <tr>
          {!isEdit?(<> <th scope="row">{c++}</th>
           <td>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                required
                value={brandname}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                required
                value={productname}
                onChange={(e) => setProductName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Ram"
                required
                value={ram}
                onChange={(e) => setRam(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Internal Storage"
                required
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Screen Type"
                required
                value={ScreenType}
                onChange={(e) => setScreenType(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Screen Size"
                required
                value={ScreenSize}
                onChange={(e) => setScreenSize(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Image"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="URL"
                value={URL}
                onChange={(e) => setURL(e.target.value)}
                />
            </td>
            <td>
              <button className="btn btn-primary" onClick={addItem}>
                Add
              </button>
            </td>
            </>) : (<></>) }
          </tr>
        </tbody>
      </table>
    </div>
  );
}
else{
  return(<div><h1>You are not authorized to access</h1>
  <Link to="/">Let's go back to home page...</Link></div>)
}
}

export default Invertory;
