import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Card from "../components/Card";
export const ListNews = ({ search, category, sort }) => {
  const [news, setNews] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  
  const getData = async () => {
    const { data } = await axios({
      method: "get",
      url: "/pub/news",
      params: {
        search,
        category,
        sort,
        "page[number]":page
      },
    });
    setNews(data.data);
    setTotalPage(+data.totalPage);
  };

  useEffect(() => {
    getData();
  }, [search, category, sort, page]);
  return (
    <>
      <section id="all" className="flex flex-col items-center gap-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {news.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
        <Pagination className="mb-4" loop showControls total={totalPage} page={1} onChange={(e) => setPage(e)}/>
      </section>
    </>
  );
};
