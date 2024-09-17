import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminListCategory() {
  const [category, setCategory] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "/categories",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl">Categories</h1>
      </div>
      {/* <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl">News</h1>
        <Button
          className="bg-black text-white"
          variant="flat"
          onPress={onOpen}
          startContent={<FontAwesomeIcon icon="fa-solid fa-plus" />}
        >
          Add News
        </Button>
      </div> */}
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>No</TableColumn>
          <TableColumn>NAME</TableColumn>
          {/* <TableColumn>ACTION</TableColumn> */}
        </TableHeader>
        {category.length ? (
          <TableBody>
            {category.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                {/* <TableCell className="flex gap-2">
                <div className="flex gap-2">
                  <Tooltip content="Edit news">
                    <Button
                      isIconOnly
                      variant="bordered"
                      color="error"
                      // onPress={() => handleEdit("edit", item.id)}
                      startContent={
                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                      }
                    ></Button>
                  </Tooltip>
                  <Tooltip content="Delete news">
                    <Button
                      isIconOnly
                      variant="bordered"
                      color="danger"
                      // onPress={() => handleDelete(item.id)}
                      startContent={
                        <FontAwesomeIcon icon="fa-regular fa-trash-can" />
                      }
                    ></Button>
                  </Tooltip>
                </div>
              </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No data to display."}>{[]}</TableBody>
        )}
      </Table>
    </>
  );
}
