import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  useToast // Import useToast
} from "@chakra-ui/react";

const Store = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = localStorage.getItem("token");
  const toast = useToast(); // Initialize useToast

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [showCategories]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        showCategories
          ? "https://arba-be.onrender.com/category/"
          : "https://arba-be.onrender.com/products/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Show toast message for error
      toast({
        title: "Error fetching data",
        description: "An error occurred while fetching data.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://arba-be.onrender.com/category/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Show toast message for error
      toast({
        title: "Error fetching categories",
        description: "An error occurred while fetching categories.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        showCategories
          ? `https://arba-be.onrender.com/category/delete/${id}`
          : `https://arba-be.onrender.com/products/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      fetchData();
      // Show toast message for successful deletion
      toast({
        title: "Item deleted",
        description: "The item has been deleted successfully.",
        status: "warning",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      // Show toast message for error
      toast({
        title: "Error deleting item",
        description: "An error occurred while deleting the item.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (id) => {
    setEditingItemId(id);
  };

  const handleSave = async (id) => {
    const editedItem = data.find((item) => item._id === id);
    try {
      await axios.patch(
        showCategories
          ? `https://arba-be.onrender.com/category/update/${id}`
          : `https://arba-be.onrender.com/products/update/${id}`,
        editedItem,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      fetchData();
      setEditingItemId(null);
      // Show toast message for successful update
      toast({
        title: "Item updated",
        description: "The item has been updated successfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating data:", error);
      // Show toast message for error
      toast({
        title: "Error updating item",
        description: "An error occurred while updating the item.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post(
        "https://arba-be.onrender.com/category/add",
        {
          name: newItemName,
          image: "default_image.png",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setShowModal(false);
      fetchData();
      // Show toast message for successful addition
      toast({
        title: "Category added",
        description: "The category has been added successfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding category:", error);
      // Show toast message for error
      toast({
        title: "Error adding category",
        description: "An error occurred while adding the category.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post(
        "https://arba-be.onrender.com/products/add",
        {
          title: newItemName,
          description: newItemDescription,
          price: newItemPrice,
          category: selectedCategory,
          image: "default_image.png",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setShowModal(false);
      fetchData();
      // Show toast message for successful addition
      toast({
        title: "Product added",
        description: "The product has been added successfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      // Show toast message for error
      toast({
        title: "Error adding product",
        description: "An error occurred while adding the product.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };


  const handleChange = (e, id, field) => {
    const { value } = e.target;
    setData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      )
    );
  };
  return (
    <div>
      <Button
        onClick={() => setShowCategories(true)}
        colorScheme={showCategories ? "blue" : "gray"}
        mr={2}
      >
        All Categories
      </Button>
      <Button
        onClick={() => setShowCategories(false)}
        colorScheme={!showCategories ? "blue" : "gray"}
      >
        All Products
      </Button>
      <br />
      <br />
      <Button onClick={() => setShowModal(true)} colorScheme="green" ml={2}>
        Add {showCategories ? "Category" : "Product"}
      </Button>
      <br />
      <br />
      <Heading>{showCategories ? "Categories" : "Products"}</Heading>
      <br />
      <br />
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            {showCategories && <Th>Slug</Th>}
            {!showCategories && <Th>Description</Th>}
            {!showCategories && <Th>Price</Th>}
            <Th m={"auto"}>Operations</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>
                {editingItemId === item._id ? (
                  <Input
                    type="text"
                    value={showCategories ? item.name : item.title}
                    onChange={(e) =>
                      handleChange(
                        e,
                        item._id,
                        showCategories ? "name" : "title"
                      )
                    }
                  />
                ) : showCategories ? (
                  item.name
                ) : (
                  item.title
                )}
              </Td>
              {showCategories && (
                <>
                  <Td>
                    {editingItemId === item._id ? (
                      <Input
                        type="text"
                        value={item.slug}
                        onChange={(e) => handleChange(e, item._id, "slug")}
                      />
                    ) : (
                      item.slug
                    )}
                  </Td>
                </>
              )}
              {!showCategories && (
                <>
                  <Td>
                    {editingItemId === item._id ? (
                      <Input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleChange(e, item._id, "description")
                        }
                      />
                    ) : (
                      item.description
                    )}
                  </Td>
                  <Td>
                    {editingItemId === item._id ? (
                      <Input
                        type="text"
                        value={item.price}
                        onChange={(e) => handleChange(e, item._id, "price")}
                      />
                    ) : (
                      item.price
                    )}
                  </Td>
                  <Td>{item.category && item.category.name}</Td>
                </>
              )}
              <Td>
                {editingItemId === item._id ? (
                  <Button
                    colorScheme="teal"
                    variant={"outline"}
                    onClick={() => handleSave(item._id)}
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Add {showCategories ? "Category" : "Product"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
            </FormControl>
            {!showCategories && (
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                />
              </FormControl>
            )}
            {!showCategories && (
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                />
              </FormControl>
            )}
            {!showCategories && (
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={showCategories ? handleAddCategory : handleAddProduct}
            >
              Add
            </Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Store;
