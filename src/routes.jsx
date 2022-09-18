import {useRoutes} from "react-router-dom";
import Discussion from "./discussion";
import React from "react";

export const Routes = () => {
  return useRoutes([
    { path: "/", element: <Discussion /> },
  ]);
};
