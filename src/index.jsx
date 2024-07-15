import React from "react";
import { createRoot } from "react-dom/client";

import { MainView } from "./components/main-view/main-view";
//import { Container } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.min.css";
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
   //<Container fluid className="m-0 p-0">
    <MainView />
   //</Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);