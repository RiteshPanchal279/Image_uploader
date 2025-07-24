import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import ProctedRoute from "./components/ProctedRoute";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProctedRoute>
          <Home />
        </ProctedRoute>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster position="top-right" richColors closeButton duration={4000} />
    </>
  );
}

export default App;
