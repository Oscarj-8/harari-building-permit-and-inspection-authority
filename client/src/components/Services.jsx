import styled from "styled-components";
import { services } from "../data/constants";
import { useEffect, useState } from "react";

const Card = styled.div``;
Card.Header = styled.div``;
Card.Description = styled.div``;
Card.Bottom = styled.div``;

const AnimatedCard = styled(Card)`
  opacity: 0;
  transform: translateY(500px);
  transition: opacity 3s ease-out, transform 3s ease-out;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function Services() {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleScroll = () => {
    const element = document.querySelector(".element");
    if (element) {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      setIsAnimated(isVisible);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className={` flex flex-col gap-24 items-center `}>
      <h1 className="text-5xl font-medium text-customBlue">Services</h1>
      <div className="flex w-full flex-wrap items-stretch justify-center gap-8">
        {services.map((service) => (
          <AnimatedCard
            key={service.id}
            className={`${
              isAnimated ? "fade-in" : ""
            } bg-white flex flex-col cursor-pointer justify-center items-center text-center w-full sm:w-3/4 md:w-1/4 rounded-lg p-4 gap-6 shadow-xl hover:translate-y-[-20px]`}
          >
            <Card.Header>
              <img className="w-24" src={service.image} alt="service image" />
            </Card.Header>
            <Card.Description className="text-slate-600">
              <p>{service.description}</p>
            </Card.Description>
            <Card.Bottom className="rounded-full p-3 w-10 h-10 flex items-center justify-center bg-slate-200 text-customBlue">
              {service.footer}
            </Card.Bottom>
          </AnimatedCard>
        ))}
      </div>
    </main>
  );
}
