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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../Components/ProductCard";

const StyledSlider = ({ children }) => {
  return (
    <Box width="90%" mx="auto" mt="5">
      {children}
    </Box>
  );
};

const Home = () => {
  const [showDialog, setShowDialog] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const toast = useToast(); // Initialize useToast hook

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <Box
          bg="black"
          height="8px"
          width="8px"
          borderRadius="50%"
          display="inline-block"
        />
      );
    },
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
              colorScheme="blue"
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

      <StyledSlider>
        <Slider {...sliderSettings}>
          <div>
            <Box
              width="100%"
              height="70vh"
              bgImage="url('https://images.pexels.com/photos/459203/pexels-photo-459203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
              bgSize="cover"
              bgPosition="center"
              p={4}
              color="white"
              borderRadius="md"
            ></Box>
          </div>
          <div>
            <Box
              width="100%"
              height="70vh"
              bgImage="url('https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
              bgSize="cover"
              bgPosition="center"
              p={4}
              color="white"
              borderRadius="md"
            ></Box>
          </div>
          <div>
            <Box
              width="100%"
              height="70vh"
              bgImage="url('https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
              bgSize="cover"
              bgPosition="center"
              p={4}
              color="white"
              borderRadius="md"
            ></Box>
          </div>
        </Slider>
      </StyledSlider>
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
