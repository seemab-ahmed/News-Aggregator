import React from "react";
import { Navbar } from "../../components/navbar/navbar";
import { SportNews } from "../../components/sportNews/sportNews";
import { Footer } from "../../components/footer/footer";
import News from "../news/news";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <News />
      <SportNews />
      <Footer />
    </div>
  );
};
