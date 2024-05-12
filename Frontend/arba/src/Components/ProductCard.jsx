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
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
      maxW="md"
      bg="white"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
    >
      <Box position="relative" w="100%" h="200px">
        {" "}
        <Image
          src={product.image}
          alt={product.title}
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Text fontSize="sm" color="gray.500">
            ID: {product.category}
          </Text>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          Title : {product.title}
        </Box>

        <Text color="gray.600" mt="2">
          Description : {product.description}
        </Text>

        <Box>
          <Text mt="1" fontSize="lg" fontWeight="bold" color="gray.900">
            Price : ${product.price}
          </Text>
        </Box>
        <br />
        {isInCart ? (
          <Flex margin="auto" alignItems="center" justifyContent="center">
            <Button
              bg="#EF4444"
              _hover={{
                bg: "#EF4444",
              }}
              onClick={decreaseQuantity}
              size="sm"
              mr="2"
            >
              -
            </Button>
            <Text>{quantity}</Text>
            <Button
              bg="#22C55E"
              _hover={{
                bg: "#22C55E",
              }}
              onClick={increaseQuantity}
              size="sm"
              ml="2"
            >
              +
            </Button>
          </Flex>
        ) : (
          <Button
            mt="2"
            color={"white"}
            bg="#06B6D4"
            _hover={{
              bg: "#06B6D4",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
