import { useEffect, useState } from "react";

let Card = ({ id, value, gameStarted, handleCardClick, doFlip}) => {
  let [isActive, setIsActive] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if(doFlip) setIsActive(false);
  }, [doFlip]);

  let handleClick = () => {
    if (!isActive && gameStarted) {
      setIsActive(true);
      handleCardClick(id, value);
    }
  };

  return (
    <div
      className="card"
      id={id}
      onClick={handleClick}
      //   style={{ background: `${isActive ? "none" : ""}` }}
    >
      {isActive && (
        <span className="card-value" style={{ position: "absolute" }}>
          {value}
        </span>
      )}
    </div>
  );
};

export default Card;