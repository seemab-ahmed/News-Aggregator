import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import News from "../news/news";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <News />
      <Footer />
    </>
  );
};
