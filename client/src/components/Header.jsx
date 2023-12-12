import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className=" relative h-20 z-10 bg-slate-200 border p-5 shadow-md ">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <span className="text-slate-700 text-lg">
          <Link to="/">
            <span className="text-3xl font-black">Harari </span>
          </Link>
          building permit and inspection authority
        </span>
        <ul className="flex gap-6">
          <Link to="/">
            <li className="hover:underline">Home</li>
          </Link>
          <ScrollLink
            className="hover:cursor-pointer"
            to="services"
            smooth={true}
            duration={500}
          >
            <li className="hover:underline">Services</li>
          </ScrollLink>
          <ScrollLink
            className="hover:cursor-pointer"
            to="about"
            smooth={true}
            duration={500}
          >
            <li className="hover:underline">About us</li>
          </ScrollLink>
        </ul>
      </div>
    </header>
  );
}
