import { Avatar } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
export const ListAuthor = () => {
  const [users, setUser] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get("/pub/users");
      setUser(data);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <aside className="col-span-2 md:col-span-1 w-full gap-4 flex flex-col md:border-l md:pl-12">
        <h1 className="text-xl">Authors</h1>
        {users.map((e) => {
          return (
            <Card key={e.id}>
              <CardBody>
                <div className="flex items-center gap-4">
                  <Avatar src={e.imageUrl}/>
                  <div className="flex flex-col gap-1">
                    <span>{e.username}</span>
                    <span className="text-xs underline text-slate-500">{e.email}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </aside>
    </>
  );
};
