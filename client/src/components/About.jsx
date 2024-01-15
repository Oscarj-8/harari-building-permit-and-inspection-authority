import { about } from "../data/constants";

export default function About() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-[1500px] gap-4 md:flex-row ">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className=" font-medium text-customBlue text-5xl">About Us</h1>
          <p className="text-slate-600">{about.text}</p>
        </div>
        <div className=" flex-1 max-w-lg flex items-center justify-end">
          <img
            className="rounded-md w-full"
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWJvdXQlMjB1c3xlbnwwfHwwfHx8MA%3D%3D"
            alt="about us image"
          />
        </div>
      </div>
    </div>
  );
}
