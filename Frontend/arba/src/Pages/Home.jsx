import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  useToast, // Import useToast hook
} from "@chakra-ui/react";
import Slider from "../Components/Slider";
import ProductCard from "../Components/ProductCard";



const Home = () => {
  const [showDialog, setShowDialog] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem("acceptedTerms");
    if (hasAcceptedTerms) {
      setShowDialog(false);
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://arba-be.onrender.com/products", {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const isProductInCart = cart.some((item) => item._id === product._id);

    if (!isProductInCart) {
      // If the product is not already in the cart, add it
      const newCart = [...cart, product];
      setCart(newCart);
      // Save updated cart data to local storage
      localStorage.setItem("cart", JSON.stringify(newCart));
      // Display success toast message
      toast({
        title: "Product added to cart",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // If the product is already in the cart, display warning toast message
      toast({
        title: "Product already in cart",
        status: "warning",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

 

  return (
    <Box>
      <Modal isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms & Conditions</ModalHeader>
          <ModalBody>
            <p>Please read and accept our terms and conditions.</p>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="linkedin"
              mr={3}
              onClick={() => {
                localStorage.setItem("acceptedTerms", "true");
                setShowDialog(false);
              }}
            >
              Accept
            </Button>
            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Slider />
      <br />
      <br />
      <br />
      <br />
      <SimpleGrid
        w={"80%"}
        margin={"auto"}
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
      >
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
