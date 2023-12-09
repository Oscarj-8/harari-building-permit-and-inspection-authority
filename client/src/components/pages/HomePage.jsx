import background from "../../assets/images/Background.jpg";

export default function HomePage() {
  const textStyle = {
    fontFamily: "Montserrat, sans-serif",
  };

  return (
    <main
      className="flex items-center text-slate-700 p-5 "
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "calc(100vh - 5rem)",
      }}
    >
      <div className="absolute inset-0 bg-blue-950 opacity-40 filter blur-lg"></div>
      <div className=" z-10 flex flex-col items-center max-w-6xl mx-auto gap-5 ">
        <span className="text-4xl text-center text-white " style={textStyle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          consequatur molestias, tenetur unde repudiandae fugiat id cum deserunt
          ut q
        </span>
        <button className="p-3 bg-blue-700 text-white rounded-lg shadow-lg border border-blue-700 hover:shadow-none hover:border hover:border-blue-700 hover:bg-white hover:text-blue-700 font-medium px-5 ">
          Lets get Started
        </button>
      </div>
    </main>
  );
}
