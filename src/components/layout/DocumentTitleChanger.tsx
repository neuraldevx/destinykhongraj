"use client";

import { useEffect } from "react";

const titles = [
  "Destiny Khongraj",
  "Portfolio",
  "Content Creator",
  "Digital Storyteller",
];

export default function DocumentTitleChanger() {
  useEffect(() => {
    let index = 0;
    
    const changeTitle = () => {
      document.title = titles[index];
      index = (index + 1) % titles.length;
    };

    changeTitle();
    const interval = setInterval(changeTitle, 3000);

    return () => clearInterval(interval);
  }, []);

  return null;
}