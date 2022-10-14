import React from "react";
import NavBar from "./NavBar";
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function Home() {
    
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };
  return (
    <div>
      <NavBar />
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container w3-teal">
          <h1>Carte</h1>
        </div>
        <div style={{ height: '95vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
            />
      </GoogleMapReact>
      </div>
      </div>
    </div>
  );
}
