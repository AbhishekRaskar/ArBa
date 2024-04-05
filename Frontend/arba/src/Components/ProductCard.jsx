import React from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
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
        <Button colorScheme="linkedin" variant="solid">
          Add To Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
