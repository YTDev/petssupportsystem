import React from "react";
import styles from "./HeroButton.module.css";

const HeroButton = ({
  children = "ADOPT NOW",
  icon,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles.buttonHero} inline-block relative overflow-hidden ${className}`}
    >
      <span className="flex items-center justify-center relative overflow-hidden">
        {icon && <span className="mr-3 flex-shrink-0">{icon}</span>}
        <span className="block relative overflow-hidden text-xl">
          {children}
        </span>
      </span>
    </button>
  );
};

export default HeroButton;
