import { Navigate } from "react-router-dom";
import { HeroesApp } from "../HeroesApp";
import { LoginPage } from "../auth";
import { MarvelPage, DCPage, SearchPage, HeroPage } from "../heroes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const routes = [
    {
      path:"/",
      element: 
      <PrivateRoute>
        <HeroesApp/>
      </PrivateRoute>,
      children: [
        {
          path:"/marvel",
          element: <MarvelPage/>
        },
        {
          path:"/dc",
          element: <DCPage/>
        },
        {
          path:"/search",
          element: <SearchPage/>
        },
        {
          path:"/hero/:id",
          element: <HeroPage/>
        },
        {
          path:"/",
          element: <Navigate to="/marvel"/>
        },
      ]
    },
    {
      path:"/login",
      element:
      <PublicRoute>
        <LoginPage/>
      </PublicRoute> 
    },
  ]