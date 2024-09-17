import { Image, Avatar } from "@nextui-org/react";
import { ListRelatedNews } from "./ListRecommendNews";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
export const NewsDetail = (props) => {
  const [data, setData] = useState({});
  let { id } = useParams();
  const getData = async () => {
    const { data } = await axios.get(`/pub/news/${id}`);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="md:col-span-3 flex flex-col">
        <div className="flex flex-col justify-center items-center">
          <Image
            width={500}
            src={data?.imgUrl}
            alt="NextUI Album Cover"
            className="my-12"
          />
        </div>
        <div className="flex flex-col gap-4 my-4">
          <h1 className="text-3xl">{data.title}</h1>
          <div className="flex justify-between items-center gap-2">
            <span className="flex items-center gap-2 bg-slate-200 px-3 py-2 rounded-xl">
              <Avatar src={data?.User?.imageUrl} />
              By: {data?.User?.username}
            </span>
            <span className="text-sm text-slate-500">{data?.createdAt}</span>
          </div>
          <p className="text-justify w-full">{data?.content}</p>
        </div>
      </div>
      {/* <ListRelatedNews className="col-span-1" /> */}
    </>
  );
};
