import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

export const ListCategory = ({ setSearch, setCategoryId, sort, setSort }) => {
  const [category, setCategory] = useState([]);
  const getData = async () => {
    let { data } = await axios({
      method: "get",
      url: "/pub/categories",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCategory(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Most Popular</h1>
        <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
          <div className="grid grid-cols-3 md:flex md:items-center gap-4">
            {category.map((el) => (
              <Button
                name="category"
                onClick={() => setCategoryId(el.id)}
                key={el.id}
                variant="bordered"
                className="rounded border-1 capitalize"
              >
                {el.name}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              }
              type="search"
              variant="bordered"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              name="sorting"
              className="px-4 py-2 rounded-lg text-default-500 border-2"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="createdAt">A-Z</option>
              <option value="-createdAt">Z-A</option>
            </select>
          </div>
        </div>
      </section>
    </>
  );
};
