import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const PageNotFound = () => {
  return (
    <Box
      textAlign="center"
      mt="20vh" // Adjust the top margin as needed
    >
      <Heading as="h1" size="xl" color="red" fontWeight="bold" mb={4}>
        404
      </Heading>
      <Heading as="h2" size="lg" mb={4}>
        Page Not Found
      </Heading>
      <Text as={"i"} color={"grey"} fontSize="lg" mb={4}>
        Sorry, the page you are looking for does not exist.
      </Text>
      <br />
      <br />
      <Button colorScheme="teal" variant="outline" size="lg" as={Link} to="/">
        Go to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
