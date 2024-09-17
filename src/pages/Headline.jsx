import { useEffect, useState } from "react";
import { ListAuthor } from "./ListAuthor";
import { Image } from "@nextui-org/react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Headline() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios({
      method: "get",
      url: "/pub/news",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setData(data?.data?.slice(0, 3));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <section className="grid md:grid-cols-3 md:grid-rows-1 justify-items-end gap-12 mt-10">
        <div className="col-span-2 flex flex-col md:flex-row gap-12 h-full">
          <Link to={`/detail/${data[0]?.id}`}>
            <div className="flex flex-col justify-between gap-4">
              <Image
                isZoomed
                width={500}
                height={500}
                alt="NextUI Fruit Image with Zoom"
                src={data[0]?.imgUrl}
              />
              <div className="flex flex-col gap-1 w-[400px] h-[100px] overflow-hidden">
                <p>{data[0]?.title}</p>
                <p className="text-sm text-slate-500 overflow-hidden whitespace-nowrap text-ellipsis">
                  {data[0]?.content}
                </p>
              </div>
            </div>
          </Link>
          <div className="flex flex-col gap-4">
            <Link to={`/detail/${data[1]?.id}`}>
              <div className="flex flex-col justify-between gap-4">
                <Image
                  isZoomed
                  width={370}
                  height={200}
                  alt="NextUI Fruit Image with Zoom"
                  src={data[1]?.imgUrl}
                />
                <div className="flex flex-col gap-1 w-[350px] h-[80px] overflow-hidden">
                  <p>{data[1]?.title}</p>
                  <p className="text-sm text-slate-500 overflow-hidden whitespace-nowrap text-ellipsis">
                    {data[1]?.content}
                  </p>
                </div>
              </div>
            </Link>
            <Link to={`/detail/${data[2]?.id}`}>
              <div className="flex flex-col justify-between gap-4">
                <Image
                  isZoomed
                  width={370}
                  height={200}
                  alt="NextUI Fruit Image with Zoom"
                  src={data[2]?.imgUrl}
                />
                <div className="flex flex-col gap-1 w-[350px] h-[80px] overflow-hidden">
                  <p>{data[2]?.title}</p>
                  <p className="text-sm text-slate-500 overflow-hidden whitespace-nowrap text-ellipsis">
                    {data[2]?.content}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <ListAuthor/>
      </section>
    </>
  );
}
