import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  Stack,
  useToast,
} from "@chakra-ui/react";

import LoginImage from "../Images/Login.avif";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://arba-be.onrender.com/users/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // success
      toast({
        title: "Login successful",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      // error
      toast({
        title: "Login failed",
        description: "Please check your credentials.",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p="8"
      bgImage={`url(${LoginImage})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      alignItems="center"
      height="100vh"
    >
      <Box
        bg="rgba(255, 255, 255, 0.8)"
        borderRadius="lg"
        width="30%"
        margin={"auto"}
        boxShadow="rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;"
      >
        <Heading mb="4" fontSize="4xl" color="black" textAlign="center">
          ARBA Solutions
        </Heading>
        <Text
          fontSize="lg"
          fontStyle="italic"
          color="gray"
          textAlign="center"
          mb="4"
        >
          Discover the convenience of ARBA Solutions. Sign in to access your
          account
        </Text>
        <Box p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel color="black">Email address</FormLabel>
              <Input
                type="email"
                variant="flushed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                _focus={{ borderColor: "#00AFF0" }}
                borderColor="#00AFF0"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color="black">Password</FormLabel>
              <Input
                type="password"
                variant="flushed"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                _focus={{ borderColor: "#00AFF0" }}
                borderColor="#00AFF0"
              />
            </FormControl>
            <br />
            <Stack spacing={10}>
              <Button
                onClick={handleLogin}
                size="lg"
                bg="#00AFF0"
                color="white"
                _hover={{
                  bg: "#00AFF0",
                }}
                width="100%"
                borderRadius={40}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
          <Text align="center" color="black" mt="4">
            Don't have an account?&nbsp;
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#00AFF0",
              }}
            >
              Sign Up
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
