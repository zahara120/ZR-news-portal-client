import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Tooltip,
  Image,
  User,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewsModal from "./NewsModal";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminListNews() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: openEdit,
    onOpen: onEdit,
    onOpenChange: onOpenEdit,
  } = useDisclosure();
  const {
    isOpen: openUpload,
    onOpen: onUpload,
    onOpenChange: onOpenUpload,
  } = useDisclosure();

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleEdit = (action, id) => {
    setSelectedId(id);
    action === "edit" ? onOpenEdit() : onOpenUpload();
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        url: `/news/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getData();
      toast.success(`Delete ${data.title} success`);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: "get",
        url: "/news",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNews(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl">News</h1>
        <Button
          className="bg-black text-white"
          variant="flat"
          onPress={onOpen}
          startContent={<FontAwesomeIcon icon="fa-solid fa-plus" />}
        >
          Add News
        </Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>AUTHOR</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        {news.length ? (
          <TableBody isLoading={isLoading}>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Image
                    isZoomed
                    className="w-[100px] h-[63px]"
                    src={item.imgUrl}
                    alt={item.title}
                  />
                </TableCell>
                <TableCell>{item?.Category?.name}</TableCell>
                <TableCell>
                  <User
                    name={item?.User?.username}
                    description={item?.User?.email}
                    avatarProps={{
                      src: item?.User?.imageUrl,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip content="Edit news">
                      <Button
                        isIconOnly
                        variant="bordered"
                        color="error"
                        onPress={() => handleEdit("edit", item.id)}
                        startContent={
                          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                        }
                      ></Button>
                    </Tooltip>
                    <Tooltip content="Upload image news">
                      <Button
                        isIconOnly
                        variant="bordered"
                        color="error"
                        onPress={() => handleEdit("upload", item.id)}
                        startContent={
                          <FontAwesomeIcon icon="fa-solid fa-image" />
                        }
                      ></Button>
                    </Tooltip>
                    <Tooltip content="Delete news">
                      <Button
                        isIconOnly
                        variant="bordered"
                        color="danger"
                        onPress={() => handleDelete(item.id)}
                        startContent={
                          <FontAwesomeIcon icon="fa-regular fa-trash-can" />
                        }
                      ></Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No data to display."}>{[]}</TableBody>
        )}
      </Table>

      <NewsModal
        action="add"
        isOpen={isOpen}
        onClose={onOpenChange}
        handleData={getData}
      />
      <NewsModal
        action="edit"
        isOpen={openEdit}
        onClose={onOpenEdit}
        newsId={selectedId}
        handleData={getData}
      />
      <NewsModal
        action="upload"
        isOpen={openUpload}
        onClose={onOpenUpload}
        newsId={selectedId}
        handleData={getData}
      />
    </>
  );
}
