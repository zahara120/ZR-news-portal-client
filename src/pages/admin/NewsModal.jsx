import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Image,
} from "@nextui-org/react";
import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewsModal({
  action,
  isOpen,
  onClose,
  newsId,
  handleData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imgUrl: "",
    CategoryId: "",
    imgFile: null, 
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    });

    if (name === "imgFile" && files.length) {
      setFormData({
        ...formData,
        imgFile: files[0],
        imgUrl: URL.createObjectURL(files[0]),
      });
    }
  };

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

  const getDetailData = async (id) => {
    const { data } = await axios({
      method: "get",
      url: `/news/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setFormData({
      title: data.title,
      content: data.content,
      imgUrl: data.imgUrl,
      CategoryId: data.CategoryId,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (newsId) {
      getDetailData(newsId);
    }
  }, [newsId]);

  const uploadData = async (formData) => {
    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append("img", formData.imgFile);
      setIsLoading(true);
      await axios({
        method: "patch",
        url: `/news/${newsId}/img`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formDataToUpload,
      });
      setIsLoading(false);
      toast.success("Upload image success");
      onClose();
      handleData();
      getDetailData(newsId);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const addData = async (formData) => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: "post",
        url: `/news`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      });
      setIsLoading(false);
      toast.success(`Add ${data.title} success`);
      onClose();
      handleData();
      setFormData({
        title: "",
        content: "",
        imgUrl: "",
        CategoryId: "",
      });
    } catch (error) {
      setIsLoading(false);
      if (Array.isArray(error.response.data.message) && error.response.data.message.length > 1) {
        error.response.data.message.forEach(e => {
          toast.error(e);
        });
      } else {
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  const updateData = async (formData) => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: "put",
        url: `/news/${newsId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: formData,
      });
      setIsLoading(false);
      toast.success(`Update ${data.title} success`);
      onClose();
      handleData();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (action) {
      case "upload":
        await uploadData(formData);
        break;
      case "add":
        await addData(formData);
        break;
      case "edit":
        await updateData(formData);
        break;
      default:
        toast.error("Unknown action");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
                {
                  action === 'upload' ? `${action} image news` : `${action} news`
                }
            </ModalHeader>

            {action === "upload" ? (
              <ModalBody>
                <Input
                  disabled
                  label="Title"
                  placeholder="Enter your title"
                  type="text"
                  variant="bordered"
                  value={formData.title}
                />
                <Image required alt="NextUI hero Image" src={formData.imgUrl} />
                <Input
                  label="Image"
                  placeholder="Select your image"
                  type="file"
                  variant="bordered"
                  accept="image/*"
                  name="imgFile"
                  onChange={handleChange}
                />
              </ModalBody>
            ) : (
              <ModalBody>
                <Input
                  isRequired
                  label="Title"
                  placeholder="Enter your title"
                  type="text"
                  variant="bordered"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                />
                <Textarea
                  isRequired
                  variant="bordered"
                  label="Content"
                  placeholder="Enter your content"
                  name="content"
                  onChange={handleChange}
                  value={formData?.content}
                />
                <Input
                  label="Image URL"
                  placeholder="Enter your image URL"
                  type="text"
                  variant="bordered"
                  name="imgUrl"
                  onChange={handleChange}
                  value={formData?.imgUrl}
                />
                <select
                  name="CategoryId"
                  value={formData.CategoryId}
                  onChange={handleChange}
                  className="p-2 border-2 border-gray-200 rounded-xl"
                >
                  {category.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className="capitalize"
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </ModalBody>
            )}
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                className="bg-black text-white"
                variant="flat"
                onClick={(e) => handleSubmit(e)}
                isLoading={isLoading}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
