import Home from "./home";
// import Login from "./login";
// import Signup from "./signup";
import Profile from "./profile";
import Search from "./search";
import Details from "./details";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import SportsMap from "./map";
import SearchWeather from "./searchWeather";
import SearchWeatherDetails from "./searchWeatherDetails";
import SearchMovie from "./searchMovie";
import Signin from "./users/signin";
import Account from "./users/account";
import UserTable from "./users/table";
import Signup from "./users/signup";

import SearchMovieDetails from "./searchMovieDetails";
// import UserList from "./users/list";
// import UserDetails from "./users/details";
// import SignIn from "./users/signin";
// import Account from "./users/account";


function Project(){
    return(
        <div className="container-fluid">
            <h1>Project</h1>
            <div className="row">
            <div className="col-2">
                <div className="list-group">
                <Link to="/project/" className="list-group-item">
              Home
            </Link>
            {/* <Link to="/project/signin" className="list-group-item">
              Signin
            </Link> */}
            {/* <Link to="/project/signup" className="list-group-item">
              Signup
            </Link> */}
            {/* <Link to="/project/account" className="list-group-item">
              Account
            </Link> */}
            <Link to="/project/search" className="list-group-item">
              Search
            </Link>
            <Link to="/project/map" className="list-group-item">
              SportsMap
            </Link>
            <Link to="/project/searchWeather" className="list-group-item">
              searchWeather
            </Link>
            <Link to="/project/searchWeatherDetails" className="list-group-item">
              searchWeatherDetails
            </Link>
            <Link to="/project/signin" className="list-group-item">
              Signin
            </Link>
            <Link to="/project/signup" className="list-group-item">
              SignUp
            </Link>
            <Link to="/project/admin/users" className="list-group-item">
              UserTable</Link>
            <Link to="/project/account" className="list-group-item">
              Account
            </Link>
            <Link to="/project/searchMovie" className="list-group-item">
              searchMovie
            </Link>
            {/* <Link to="/project/searchMovieDetails" className="list-group-item">
              searchMovieDetails
            </Link> */}
            {/* <Link to="/project/users" className="list-group-item">
              Users
            </Link> */}
                </div>
        
        
        </div>
        <div className="col-10">
        <Routes>
            <Route path="/" element ={<Home/>} ></Route>;
            <Route path="/profile" element ={<Profile/>} ></Route>;
            <Route path="/search" element ={<Search/>} ></Route>;
            <Route path="/signin" element={<Signin />} ></Route>;
            <Route path="/signup" element={<Signup />} ></Route>;
            
            <Route path="/admin/users" element={<UserTable />} />

            <Route path="/account" element={<Account />} ></Route>;
            <Route path="/account/:id" element={<Account />} />
            <Route path="/details" element ={<Details/>} ></Route>;
            <Route path="/map" element ={<SportsMap/>} ></Route>;
            <Route path="/searchWeather" element ={<SearchWeather/>} ></Route>;
            {/* <Route path="/searchWeatherDetails/" element ={<SearchWeatherDetails/>} ></Route>; */}
            <Route path="/searchMovie" element ={<SearchMovie/>} ></Route>;
            <Route path="/searchMovieDetails/:imdbID" element ={<SearchMovieDetails/>} ></Route>;

        </Routes>

        </div>

    </div>
        </div>
        
    );
    

}
export default Project;