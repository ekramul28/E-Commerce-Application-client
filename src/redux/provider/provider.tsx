"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "../store";
interface ReduxProviderProps {
  children: ReactNode;
}

const Providers: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
};

export default Providers;
