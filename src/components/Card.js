import { useEffect, useState } from "react";

let Card = ({ id, value, onCardClick, doFlip, isPaired }) => {
  let [isActive, setIsActive] = useState(true);
  let [triggerFlip, setFlip] = useState(false);
  let [triggerFlipBack, setFlipBack] = useState(false);

  function displayCard(bool){
    if(!bool){
      setIsActive(false);
      setFlip(true);
      setTimeout(() => {
        setFlip(false);
      }, 350);
    }
    else{
      setFlipBack(true);
      setTimeout(() => {
        setFlipBack(false);
      }, 350);
      setIsActive(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      displayCard(false)
    }, 2000);
  }, []);

  useEffect(() => {
    if (doFlip) displayCard(false);
  }, [doFlip]);

  let handleClick = () => {
    if (!isActive) {
      displayCard(true);
      onCardClick(id, value);
    }
  };

  const cardStyles = {
    animation: `${
      triggerFlip
        ? "flip 0.3s linear"
        : triggerFlipBack
        ? "flipBack 0.3s linear"
        : "none"
    }`,
    background: `${
      isPaired ? "linear-gradient(transparent, rgb(0, 0, 0, 0.3))" : ""
    }`,
  };

  return (
    <div className="card" id={id} onClick={handleClick} style={cardStyles}>
      {isActive && (
        <span className="card-value" style={{ position: "absolute" }}>
          {value}
        </span>
      )}
    </div>
  );
};

export default Card;
