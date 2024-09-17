import {
  Button,
  Input,
  Textarea,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function AdminAddUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [users, setUser] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const getData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "/users",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: "post",
        url: "/add-user",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      });
      setIsLoading(false);
      toast.success(`Add ${data.username} success`);
      getData();
      onOpenChange();
      setFormData({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
    } catch (error) {
      setIsLoading(false);
      if (
        Array.isArray(error.response.data.message) &&
        error.response.data.message.length > 1
      ) {
        error.response.data.message.forEach((e) => {
          toast.error(e);
        });
      } else {
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl">Users</h1>
        <Button
          className="bg-black text-white"
          variant="flat"
          onPress={onOpen}
          startContent={<FontAwesomeIcon icon="fa-solid fa-plus" />}
        >
          Add User
        </Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NO</TableColumn>
          <TableColumn>USERNAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>IMAGE</TableColumn>
        </TableHeader>
        {users.length ? (
          <TableBody isLoading={isLoading}>
            {users.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Avatar src={item.imageUrl} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No data to display."}>{[]}</TableBody>
        )}
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                add user
              </ModalHeader>

              <ModalBody>
                <Input
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                  variant="bordered"
                  name="username"
                  onChange={handleChange}
                  value={formData.title}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <Input
                  isRequired
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <FontAwesomeIcon
                          icon="fa-solid fa-eye"
                          className="text-default-400"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon="fa-solid fa-eye-slash"
                          className="text-default-400"
                        />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xl"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Input
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  type="number"
                  variant="bordered"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={formData?.phoneNumber}
                />
                <Textarea
                  isRequired
                  variant="bordered"
                  label="Address"
                  placeholder="Enter your address"
                  name="address"
                  onChange={handleChange}
                  value={formData?.address}
                />
              </ModalBody>
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
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
