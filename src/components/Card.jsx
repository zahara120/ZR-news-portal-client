import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
export default function Card({item}) {
  return (
    <Link to={`/detail/${item.id}`}>
      <div className="flex flex-col justify-between gap-4">
        <Image
          isZoomed
          width={370}
          height={200}
          alt="NextUI Fruit Image with Zoom"
          src={item.imgUrl}
        />
        <div className="flex flex-col gap-1 h-[100px] overflow-hidden max-w-full">
          <p>{item.title}</p>
          <p className="text-sm font-bold text-slate-500 capitalize">
            {item.Category.name}
          </p>
          <p className="text-sm text-slate-500 overflow-hidden whitespace-nowrap text-ellipsis">
            {item.content}
          </p>
        </div>
      </div>
    </Link>
  );
}
