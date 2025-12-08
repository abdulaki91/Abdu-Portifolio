import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="grid min-h-screen grid-cols-layout grid-rows-[auto_1fr_auto]">
      <NavBar />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
