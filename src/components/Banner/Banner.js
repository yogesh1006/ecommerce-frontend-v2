import React from "react";
import { Button, Carousel, Figure, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="text-center">
      <Carousel>
        <Carousel.Item>
          <Image
            className="d-block w-90 m-auto"
            src="https://cdn.static-zoutons.com/images/originals/blog/1_2_1607080286.png"
            alt="First slide"
            fluid
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-90 m-auto"
            src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/395-mckinsey-21a7540-teddy-kwan_1.jpg?bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&q=65&usm=15&vib=3&w=1200&s=e680144286fe5ec85b56838206f5d7d2"
            alt="third slide"
            fluid
          />
        </Carousel.Item>
      </Carousel>
      <div>
        <Button as={Link} to="/ushopweship/home" className="mt-5">
          Explore
        </Button>
      </div>
      <h3 className="text-center mt-3">Featured Products</h3>
      <Figure className="m-5">
        <Figure.Image
          width={200}
          height={180}
          style={{ border: "1px solid black" }}
          alt="171x180"
          src="https://i.pinimg.com/474x/dd/50/d6/dd50d6db2c697ddc8c05625df18e059b.jpg"
        />
        <Figure.Caption as="h5">Adidas</Figure.Caption>
      </Figure>
      <Figure className="m-5">
        <Figure.Image
          width={200}
          height={180}
          alt="171x180"
          style={{ border: "1px solid black" }}
          src="https://lh3.googleusercontent.com/FK8EcHV1SJGHeTUJCsUhCQl0hmQu-QbC4wG6bM59S0v-rLv-jQl16YC3LQ4x-ZpPwS1cUs_4Idap57kYgcTCOQFB"
        />
        <Figure.Caption>Puma</Figure.Caption>
      </Figure>
      <Figure className="m-5">
        <Figure.Image
          width={200}
          height={180}
          alt="171x180"
          style={{ border: "1px solid black" }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEpZGaGTfqT4YBxMh0jF9uxJE9t4jJuDw0Dw&usqp=CAU"
        />
        <Figure.Caption>Fila</Figure.Caption>
      </Figure>
    </div>
  );
};

export default Banner;
