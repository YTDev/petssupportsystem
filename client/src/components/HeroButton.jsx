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
      // Combine the module CSS classes with any extra Tailwind classes you need.
      className={`${styles.button} ${styles.buttonHero}  inline-block relative overflow-hidden
         ${className}`}
    >
      <span className="block relative overflow-hidden">
        <span className="block relative overflow-hidden text-xl">
          {children}
        </span>
      </span>
    </button>
  );
};

export default HeroButton;
