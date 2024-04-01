import { Navbar } from "../../features/navbar/navbar";
import { Footer } from "../../features/footer/footer";
import News from "../../features/news/news";

export const HomePage = () => {  
  return (
    <>
      <Navbar />
      <News />
      <Footer />
    </>
  );
};
