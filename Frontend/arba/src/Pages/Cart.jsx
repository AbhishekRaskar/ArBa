import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Image,
  Flex,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      // Set initial quantity to 1 for each item if not already set
      const updatedCart = storedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCart(updatedCart);
    }
  }, []);

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Your Cart
      </Text>
      {cart && cart.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
          {cart.map((item, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              boxShadow={
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
              }
              position="relative"
              textAlign="center"
            >
              <IconButton
                icon={<IoIosRemoveCircleOutline />}
                onClick={() => removeFromCart(index)}
                position="absolute"
                fontSize={"20px"}
                top={2}
                right={2}
                variant="ghost"
                colorScheme="red"
                aria-label="Remove Item"
              />
              <Image
                m={"auto"}
                w={"80%"}
                h={"200px"}
                objectFit="cover"
                src={item.image}
                alt={item.title}
              />
              <br />
              <Box p="4">
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {item.title}
                </Text>
                <Text fontSize="md" color="gray.600" mb={2}>
                  Price: ${item.price}
                </Text>
                <Flex alignItems="center" justifyContent="center">
                  <Button
                    size="sm"
                    onClick={() => decreaseQuantity(index)}
                    colorScheme="teal"
                    mr={2}
                  >
                    -
                  </Button>
                  <Text fontSize="md" fontWeight="bold">
                    {item.quantity}
                  </Text>
                  <Button
                    size="sm"
                    onClick={() => increaseQuantity(index)}
                    colorScheme="teal"
                    ml={2}
                  >
                    +
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>Your cart is empty.</Text>
      )}
    </Box>
  );
};

export default Cart;