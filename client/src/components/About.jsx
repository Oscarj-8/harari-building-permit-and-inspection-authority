export default function About() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex  max-w-[1500px] gap-12 ">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-slate-700 font-semibold text-5xl">About Us</h1>
          <p className="text-slate-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Necessitatibus id quidem ut saepe nam, maiores ducimus deserunt
            blanditiis illo numquam exercitationem sequi, mollitia officiis
            error minus dolorum cupiditate eius velit? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Necessitatibus id quidem ut
            saepe nam, maiores ducimus deserunt blanditiis illo numquam
            exercitationem sequi, mollitia officiis error minus dolorum
            cupiditate eius velit? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Necessitatibus id quidem ut saepe nam, maiores
            ducimus deserunt blanditiis illo numquam exercitationem sequi,
            mollitia us dolorum cupiditate eius velit? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Necessitatibus id quidem ut
            saepe nam, maiores ducimus deserunt blanditiis illo numquam
            exercitationem sequi, mollitia officiis error minus dolorum
            cupiditate eius velit? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Necessitatibus id quidem ut saepe nam, maiores
            ducimus deserunt blanditiis illo numquam exercitationem sequi,
            officiis error minus dolorum cupiditate eius velit?
          </p>
        </div>
        <div className=" flex-1 max-w-lg flex items-center justify-end">
          <img
            className="rounded-2xl w-full"
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWJvdXQlMjB1c3xlbnwwfHwwfHx8MA%3D%3D"
            alt="about us image"
          />
        </div>
      </div>
    </div>
  );
}
