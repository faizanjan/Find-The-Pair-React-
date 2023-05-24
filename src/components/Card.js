import { useEffect, useState } from "react";

let Card = ({ id, value, gameStarted, handleCardClick, doFlip, paired }) => {
  let [isActive, setIsActive] = useState(true);
  let [triggerFlip, setFlip] = useState(false);
  let [triggerFlipBack, setFlipBack] = useState(false);

  useEffect(() => {
    setTimeout(() => {
        setIsActive(false);
      setFlip(true);
      console.log("Initial Flip")
      setTimeout(() => {
        setFlip(false);
      console.log("Initial Flip reset to false")
      }, 350);
    }, 2000);
  }, []);

  useEffect(() => {
    if (doFlip) {
      setFlip(true);
      console.log("mismatch Flip")
      setTimeout(() => {
        setFlip(false);
        console.log("mismatch Flip reset")
    }, 350);
      setIsActive(false);
    }
  }, [doFlip]);

  let handleClick = () => {
    if (!isActive && gameStarted) {
      setFlipBack(true);
      console.log("click Flip")
      setTimeout(() => {
        setFlipBack(false);
        console.log("click Flip reset")
    }, 350);
    setIsActive(true);
    handleCardClick(id, value);
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
      paired ? "linear-gradient(transparent, rgb(0, 0, 0, 0.3))" : ""
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
