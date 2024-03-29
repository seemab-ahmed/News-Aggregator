import React from "react";
import { NewsApiResponse } from "../../queries/newsApiQuery";
import { truncateText } from "../../utils";

export const NewsCard = ({
  imageUrl,
  title,
  description,
  url,
}: NewsApiResponse) => {
  return (
    <div className="h-72 md:h-96 w-full md:w-1/2 lg:w-1/3 mb-4 lg:mb-0">
      <div className="h-72 md:h-96 block group relative mx-2 overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          className="absolute z-0 object-cover w-full h-72 md:h-96"
          alt="News"
        />
        <div className="absolute gradient transition duration-300 group-hover:bg-black group-hover:opacity-90 w-full h-72 md:h-96 z-100"></div>
        <div className="absolute left-0 right-0 bottom-0 p-6 z-30 transform translate-y-1/2 transition duration-300 h-full group-hover:translate-y-0 delay-100">
          <div className="h-1/2 relative">
            <div className="absolute bottom-0">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-white leading-tight transition duration-300 text-xl pb-6 group-hover:underline cursor-pointer"
              >
                {truncateText(title, 10)}
              </a>
            </div>
          </div>
          <div className="h-1/2">
            <p className="text-white pb-4 opacity-0 transition duration-300 group-hover:opacity-100">
              {truncateText(description, 20)}
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black text-sm px-3 py-1 font-semibold opacity-0 transition duration-300 group-hover:opacity-100 border-2 border-white focus:border-black focus:bg-gray-300 cursor-pointer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
