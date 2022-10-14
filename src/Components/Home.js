import React from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
import NavBar from "./NavBar";
export default function Home() {
  const user = useLocalStorage.GetUser();

  return (
    <div>
      <NavBar />
      <div style={{"marginLeft" : "25%"}}>
        <div className="w3-container w3-teal">
          <h1>Carte</h1>
        </div>

        <img src="img_car.jpg" alt="Car" />

        <div className="w3-container">
          <h2>Sidebar Navigation Example</h2>
          <p>The sidebar with is set with "style="width:25%".</p>
          <p>The left margin of the page content is set to the same value.</p>
        </div>
      </div>
    </div>
  );
}
