import { useState } from "react";
import "./styles.css";
import hslogo from "../assets/hslogo.png";

import Lottie from "react-lottie";
import astro from "../assets/astro";

import { Numbertap } from "./components/numbersTap/numberTap";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: astro,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const numbersPad = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    if (event.target.value.length < 11) {
      setInputValue(event.target.value);
    }
  };
  const buttonClick = (value) => {
    setInputValue((prev) => prev + value);
  };
  const deleteNumber = () => {
    setInputValue("");
  };
  return (
    <div className="main-container">
      <div className="items-container">
        <aside className="aside-container">
          <div className="logo-container">
            <img src={hslogo} alt="Hey Spanish Logo" width={208} />
          </div>
          <div className="kid-container">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </aside>
        <section className="section-container">
          <h1>📲Type your phone number to start</h1>
          <div className="input-phone">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="numbers-container">
            {numbersPad.map((number, index) => (
              <Numbertap buttonClick={buttonClick} key={index} value={number} />
            ))}
            <Numbertap buttonClick={buttonClick} key={"🏁"} value={"🏁"} />
            <Numbertap buttonClick={buttonClick} key={0} value={0} />
            <Numbertap buttonClick={deleteNumber} key={"⬅️"} value={"⬅️"} />
          </div>
        </section>
      </div>
    </div>
  );
};
