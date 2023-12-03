import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowButton(scrollPosition > 100);
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      id="to-top-button"
      title="Go To Top"
      style={{ backgroundColor: "rgb(215 86 66)" }}
      className={`fixed z-50 bottom-10 left-10 p-6 border-0 rounded-3xl shadow-md hover:bg-orange-400 text-white text-lg font-semibold transition-colors duration-300 ${
        showButton ? "visible" : "invisible"
      }`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
      </svg>
    </button>
  );
};

export default BackToTop;
