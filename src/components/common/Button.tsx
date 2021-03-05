import React from "react";

type Props = {
  onClick: () => void;
};

const Button: React.FC<Props> = ({ onClick, children }) => (
  <button
    className="bg-green-300 hover:bg-green-400 px-6 py-3"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
