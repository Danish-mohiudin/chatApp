import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/authentication/Login.jsx";
import Signup from "./pages/authentication/Signup.jsx";
import Home from "./pages/home/Home.jsx";
import ProfilePopup from "./pages/home/ProfilePopUp.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/Myprofile",
    element: <ProfilePopup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <RouterProvider router={router} />
  </Provider>
);
