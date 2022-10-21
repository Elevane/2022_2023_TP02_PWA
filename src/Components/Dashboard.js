import React, { useEffect, useState } from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
import NavBar from "./NavBar";
function getApps() {
  let user = useLocalStorage.GetUser();
  let token = user.token;

  return fetch(process.env.REACT_APP_DBHOST_APPS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + user.token,
      Accept: "*/*",
    },
  }).then((data) => data.json());
}
export default function Home() {
  let [Apps, setApps] = useState([]);
  let appComponents = [];
  useEffect(() => {
    
    getApps().then((value) => {
      if (value == undefined || value == null || value.result === undefined) {
        alert("Failed connection Error");
      } else if (!value.isSuccess) {
        alert(value);
        alert(value.errorMessage);
      } else {
        setApps(value.result);
        
      }
    });
  }, []);

  
   
    if(Apps.length >0){
     appComponents = Apps.map((app, index) => (
      <tr key={index}>
        <td>{app.id}</td>
        <td>{app.name}</td>
        <td>{app.date}</td>
        <td>
        {
           app.active ?  <input type="checkbox"  disabled/> :  <input type="checkbox" checked disabled/>
        } 
          
        </td>
        <td>
          <button type="button" className="btn btn-danger  m-1">
            delete
          </button>
          <button type="button" className="btn btn-primary  m-1">
          <a style={{"textDecoration" :"none"}}href={"/dashboard/details/"+app.id}>details</a>
          </button>
          <button type="button" className="btn btn-info m-1">
            <a style={{"textDecoration" :"none"}} href={"/dashboard/update/"+app.id}>edit</a>
          </button>
        </td>
      </tr>
    ));
    }
 

  return (
    <div>
      <NavBar />
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container w3-blue">
          <h1>Dashboard</h1>
        </div>
        <table className="table" style={{ margin: "50px", width: "80%" }}>
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Configuration</th>
            </tr>
          </thead>
          <tbody>
            {appComponents}
          </tbody>
        </table>
      </div>
    </div>
  );
}
