/* eslint-disable react/prop-types */
import "./numbers.css";

export const Numbertap = ({ value, buttonClick }) => {
  return (
    <button onClick={() => buttonClick(value)} key={value} className="numbers">
      {value}
    </button>
  );
};
