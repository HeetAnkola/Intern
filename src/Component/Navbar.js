import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../firebase-config";


function Navbar(props) {
  const [search, setSearch] = useState("");

  
  const handlesearch = (e) => {
    e.preventDefault();
    const product = props.data.find(
      (data) =>
        data.item.name ===
        search.charAt(0).toUpperCase() + search.toLowerCase().slice(1)
    );
    if (product) {
    window.location.href = `/ProductDetail/${product.item.id}`;
    } else {
      alert("Product not found");
    }
  };

  const handlinventory = (e) => {
    e.preventDefault();
    !props.user? alert("You need to login first."):(
      (props.user.email==="internuser@gmail.com")?(
      window.location.href = `/Invertory`):(alert("You are not authorized to access this page."))
    )
  }
  const handlelogin = () => {
    window.location.href = "/Login";
    auth.signOut();
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>E-store</strong>
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-outline-light"
              type="submit"
              onClick={handlesearch}
            >
              Search
            </button>
          </form>
          <span className="d-flex">
            <button
              className="btn btn-outline-light d-flex"
              onClick={handlelogin}
            >
              {props.user ? "Logout" : "Login"}
            </button>
            <button className="btn btn-outline-light d-flex" onClick={handlinventory}>
              Inventory
            </button>
          </span>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
