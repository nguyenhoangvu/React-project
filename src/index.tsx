import React from "react";
import ReactDOM from "react-dom";
import "./global-css.css";
import WebviewXeMay from "./pages/WebviewXeMay";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import data from "../src/json/partner-info.json";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {data.nv === "XC.1.1" && <WebviewXeMay />}
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
