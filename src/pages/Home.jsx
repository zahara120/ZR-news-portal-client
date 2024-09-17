import { useState } from "react";
import Headline from "./Headline";
import { ListCategory } from "./ListCategory";
import { ListNews } from "./ListNews";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("-createdAt");
  return (
    <>
      {/* headline */}
      <Headline />

      {/* category */}
      <ListCategory
        setSearch={setSearch}
        setCategoryId={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {/* all news */}
      <ListNews search={search} category={category} sort={sort}/>
    </>
  );
};
