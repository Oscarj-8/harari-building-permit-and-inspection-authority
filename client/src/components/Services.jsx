import styled from "styled-components";
import { services } from "../data/constants";

const Card = styled.div``;
Card.Header = styled.div``;
Card.Description = styled.div``;
Card.Bottom = styled.div``;

export default function Services() {
  return (
    <main className=" bg-slate-400 flex flex-col gap-8 items-center">
      <h1 className="text-3xl">Services</h1>
      <div className="flex w-full flex-wrap items-strech justify-center gap-8">
        {services.map((service) => (
          <Card key={service.id}>
            <Card.Header>
              <img src={service.image} alt="service image" />
            </Card.Header>
            <Card.Description>
              <p>{service.description}</p>
            </Card.Description>
            <Card.Bottom>{service.footer}</Card.Bottom>
          </Card>
        ))}
      </div>
    </main>
  );
}
