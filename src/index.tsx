import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "redux/store";
import App from "./App";
import "styles/global.scss";
import { BrowserRouter } from "react-router-dom";
import Layout from "components/Layout/Layout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </Provider>
);
