"use client";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSwitcher() {
  const [isdark, setIsdark] = useState(false);
  useEffect(function () {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsdark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsdark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function toggleTheme() {
    const newTheme = isdark ? "light" : "dark";
    setIsdark((prev) => !prev);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  }
  return (
    <Button onClick={toggleTheme} className="rounded-full">
      {isdark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
    </Button>
  );
}
