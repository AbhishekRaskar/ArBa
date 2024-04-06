import React, { useState } from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";

const ProductCard = ({ product, addToCart, updateQuantity }) => {
  const [isInCart, setIsInCart] = useState(product.quantity > 0);
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsInCart(true);
    if (updateQuantity) {
      updateQuantity([{ ...product, quantity }]);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    if (updateQuantity) {
      updateQuantity([{ ...product, quantity: quantity + 1 }]);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (updateQuantity) {
        updateQuantity([{ ...product, quantity: quantity - 1 }]);
      }
    }
  };

  return (
    <Box
      boxShadow={
        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
      }
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image m={"auto"} w={"50%"} src={product.image} alt={product.title} />
      <br />
      <Box p="6">
        <Flex alignItems="baseline">
          <Text m={"auto"} fontSize="sm" color="gray.500">
            ID : {product.category}
          </Text>
        </Flex>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          Title : {product.title}
        </Box>

        <Box>
          <Text mt="1" fontSize="lg" fontWeight="bold" color="gray.900">
            Price : ${product.price}
          </Text>
        </Box>
        <br />
        {isInCart ? (
          <Flex margin="auto" alignItems="center" justifyContent="center">
            <Button
              colorScheme="teal"
              variant="solid"
              size="sm"
              onClick={decreaseQuantity}
            >
              -
            </Button>
            <Text mx="2">{quantity}</Text>
            <Button
              colorScheme="teal"
              variant="solid"
              size="sm"
              onClick={increaseQuantity}
            >
              +
            </Button>
          </Flex>
        ) : (
          <Button
            colorScheme="linkedin"
            variant="solid"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
