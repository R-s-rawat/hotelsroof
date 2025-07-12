import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="bg-bgPrimary min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        {/* <footer className='mt-auto'>Footer</footer> */}
        <footer className="bg-white text-center text-gray-500 text-sm py-4 border-t">
          &copy; {new Date().getFullYear()} HotelsRoof. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default App;
