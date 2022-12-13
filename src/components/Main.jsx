import { useContext, useEffect, useState } from "react";
import { ParamContext } from "../context/context";
import NewsCard from "./NewsCard";
import Loading from "./Loading";
const key = `${process.env.REACT_APP_NEWS_API_KEY}`;
const Main = () => {
  const params = useContext(ParamContext);
  const [result, setResult] = useState([]);
  const loc = params.location.toLowerCase();
  const cat = params.category.toLowerCase();
  const keyw = params.keyword.toLowerCase();
  var url = "https://newsapi.org/v2/top-headlines?";
  const [load, setLoad] = useState(true);

  if (keyw) {
    url = `https://newsapi.org/v2/everything?apiKey=${key}&q=${keyw}`;
  } else if (loc === "in") {
    if (cat)
      url = `https://newsapi.org/v2/top-headlines?apiKey=${key}&language=en&category=${cat}&country=${loc}`;
    else
      url = `https://newsapi.org/v2/top-headlines?apiKey=${key}&language=en&country=${loc}`;
  } else {
    if (cat)
      url = `https://newsapi.org/v2/top-headlines?apiKey=${key}&language=en&category=${cat}`;
    else url = `https://newsapi.org/v2/top-headlines?apiKey=${key}&language=en`;
  }
  useEffect(() => {
    setLoad(true);
    fetch(url)
      .then((res) => res.json())
      .then(
        (results) => {
          setResult(results.articles);
          setLoad(false);
        },
        (error) => console.log(error)
      );
  }, [url]);

  return (
    <>
      {load && <Loading />}
      <div className="flex-col justify-center items-center w-full mx-auto sm:flex sm:flex-row  sm:flex-wrap ">
        {result.map((news_item, idx) => {
          return (
            <div
              key={idx + "$"}
              className="my-4 mx-2  shadow-md shadow-gray-500 sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <NewsCard props={news_item} key={"&" + idx} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Main;
