// src/components/CardGrid.jsx
import React from "react";

const CardGrid = () => {
  const cards = [
    {
      title: "Card 1",
      text: "This is the description for card 1.",
      imgSrc: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      title: "Card 2",
      text: "This is the description for card 2.",
      imgSrc: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      title: "Card 3",
      text: "This is the description for card 3.",
      imgSrc: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      title: "Card 4",
      text: "This is the description for card 4.",
      imgSrc: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      title: "Card 5",
      text: "This is the description for card 5.",
      imgSrc: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      title: "Card 6",
      text: "This is the description for card 6.",
      imgSrc: "https://via.placeholder.com/150",
      link: "#",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {cards.map((card, index) => (
          <div className="col-md-4 mb-4 d-flex justify-content-center" key={index}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={card.imgSrc} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                <a href={card.link} className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
