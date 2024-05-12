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
import LoginImage from "../Images/Login.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    userName: "",
    age: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "25% 1fr" }}
      gap={6}
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <img src={LoginImage} alt="Login" style={{ width: "100%" }} />
      <Box bg="rgba(255, 255, 255, 0.8)" borderRadius={"10px"}>
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
        <form onSubmit={handleSubmit}>
          <VStack spacing={1} align="stretch" p={4}>
            <FormControl id="fullName" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                variant="flushed"
                borderColor="#06B6D4"
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
                borderColor="#06B6D4"
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
                borderColor="#06B6D4"
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
                borderColor="#06B6D4"
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
                borderColor="#06B6D4"
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
                borderColor="#06B6D4"
              />
            </FormControl>
          </VStack>
          <Stack spacing={4} direction="row" justify="center" p={4}>
            <Button
              type="submit"
              size={"lg"}
              w={"50%"}
              bg={"#06B6D4"}
              color={"white"}
              _hover={{
                bg: "#06B6D4",
              }}
              borderRadius={40}
              isLoading={isLoading}
              loadingText="Signing up"
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <Text textAlign="center" mt={4}>
          Already have an account?&nbsp;
          <Link
            style={{
              textDecoration: "none",
              textDecorationColor: "#06B6D4",
              color: "#06B6D4",
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
