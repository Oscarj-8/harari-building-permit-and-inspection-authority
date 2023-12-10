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
          <Link to="/service-one">
            <li className="hover:underline">ServiceOne</li>
          </Link>
          <Link to="/service-two">
            <li className="hover:underline">ServiceTwo</li>
          </Link>
          <Link to="/service-three">
            <li className="hover:underline">ServiceThree</li>
          </Link>
          <Link to="/service-four">
            <li className="hover:underline">ServiceFour</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
