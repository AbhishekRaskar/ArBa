import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image m={"auto"} w={"50%"} src={product.image} alt={product.title} />

      <Box p="6">
        <Flex alignItems="baseline">
          <Text m={"auto"} fontSize="sm" color="gray.500">
            {product.category}
          </Text>
        </Flex>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {product.title}
        </Box>

        <Box>
          <Text mt="1" fontSize="lg" fontWeight="bold" color="gray.900">
            ${product.price}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
