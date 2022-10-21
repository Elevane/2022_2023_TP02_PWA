import React from "react";
import NavBar from "./NavBar";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
import { render } from "@testing-library/react";

let  AnyReactComponent = ({props}) => {
 
  <div
  className="testmark"
  style={{
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "2px solid red",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
}}
>
<p style={{ margin: "0", width: "70%", height: "70%" }} >{props} qdqzdqz</p>
</div>
  ;
;}

function getApps() {
  let user = useLocalStorage.GetUser();
  let token = user.token;

  return fetch(process.env.REACT_APP_DBHOST_APPS + "/extended", {
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
  let  defaultProps = {
    center: {
      lat: 47.1,
      lng: -1,
    },
    zoom: 9,
  };
  let markers = [];
  useEffect(() => {
    getApps().then((value) => {
      console.log(value);
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
 
  if (Apps.length > 0) {
   
    markers = Apps.map((app, index) => (
      <AnyReactComponent
        key={index}
        lat={app.lattitude}
        lng={app.longitude}
        text={app.name}
        style={{with :"50px", height: "50px"}}
      />
      
    )); 
  }
  return (
    <div>
      <NavBar />
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container w3-blue">
          <h1>Carte</h1>
        </div>
        <div style={{ height: "95vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {markers}
            <AnyReactComponent
        key={1}
        lat={47.1}
        lng={-1}
        text={"app.name"}
      />
            </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
