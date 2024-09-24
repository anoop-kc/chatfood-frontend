import "./App.css";
import { Menu } from "./components";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/400.css"; // Specify weight
import "@fontsource/inter/400-italic.css"; // Specify weight and style
import React from "react";

function App() {
  return (
    <div role="main" className="outer-container">
      <Menu />
    </div>
  );
}

export default App;
