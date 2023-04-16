import React from "react";
import { Outlet } from "react-router-dom";

import "./App.css";

export const App = () => (
  <div className="App">
    <Outlet />
  </div>
);

export default App;

// reference: https://medium.com/litslink/how-to-create-google-chrome-extension-using-react-js-5c9e343323ff
// reference: https://github.com/nemrosim/chrome-react-extension-example
