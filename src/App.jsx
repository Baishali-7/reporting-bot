import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Preview from "./pages/Preview";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Preview />,
    },
  ]);

  return (
    <>
      <div className="app">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
