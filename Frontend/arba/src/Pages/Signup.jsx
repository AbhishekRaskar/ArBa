import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  VStack,
  Box,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import SignupImage from "../Images/Signup.avif";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    userName: "",
    age: "",
    avatar: "", // Change to empty string for URL input
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://arba-be.onrender.com/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log("Signup successful:", data);
      toast({
        title: "Signup Successful",
        description: "You have successfully signed up.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while signing up. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="flex-end"
      alignItems="center"
      bgImage={`url(${SignupImage})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box
        bg="rgba(255, 255, 255, 0.8)"
        width="35%"
        margin={"auto"}
        p={"20px"}
        borderRadius={"10px"}
      >
        <Heading mb="4" fontSize="4xl" color="black" textAlign="center">
          ARBA Solutions
        </Heading>
        <Text
          fontSize="lg"
          fontStyle="italic"
          color="gray.600"
          textAlign="center"
          mb="4"
        >
          Create Your Account and Unlock Exclusive Benefits
        </Text>
        <br />
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="fullName" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                variant="flushed"
                borderColor="#00AFF0"
              />
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                variant="flushed"
                borderColor="#00AFF0"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="flushed"
                borderColor="#00AFF0"
              />
            </FormControl>
            <FormControl id="age" isRequired>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                variant="flushed"
                borderColor="#00AFF0"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="flushed"
                borderColor="#00AFF0"
              />
            </FormControl>
            <FormControl id="avatar" isRequired>
              <FormLabel>Avatar (URL)</FormLabel>
              <Input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                variant="flushed"
                borderColor="#00AFF0"
              />
            </FormControl>
          </VStack>
          <br />
          <Stack spacing={4} direction="row" justify="center">
            <Button
              type="submit"
              size={"lg"}
              w={"50%"}
              bg={"#00AFF0"}
              color={"white"}
              _hover={{
                bg: "#00AFF0",
              }}
              borderRadius={40}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <br />
        <Text textAlign="center">
          Already have an account?&nbsp;
          <Link
            style={{
              textDecoration: "none",
              textDecorationColor: "#00AFF0",
              color: "#00AFF0",
            }}
            to="/login"
          >
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Signup;
