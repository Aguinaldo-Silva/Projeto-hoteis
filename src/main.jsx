import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/detalhes/:id",
    element: <Details/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
