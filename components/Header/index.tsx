import Navbar from "../Navbar";
import MobileNav from "@/components/Navbar/MobileNav";

const Header = () => {
  return (
    <header>
      <div className="container px-auto p-10">
        <Navbar />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header