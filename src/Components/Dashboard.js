import React from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
import NavBar from "./NavBar";
export default function Home() {
  const user = useLocalStorage.GetUser();

  return (
    <div>
      <NavBar />

    </div>
  );
}
