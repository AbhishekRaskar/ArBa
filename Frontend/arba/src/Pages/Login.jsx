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
  SimpleGrid,
} from "@chakra-ui/react";

import Login from "../Images/Login.png";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      p="8"
      alignItems="center"
      height="100vh"
      display="flex"
      justifyContent="center"
    >
      <SimpleGrid columns={{ sm: 1, md: 2 }} gap={2} alignItems="center">
        <img src={Login} alt="Login" style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }} />
        <Box
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius="lg"
          width="100%"
          boxShadow="rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;"
        >
          <Stack spacing={4} p={8}>
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
            <Box>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel color="black">Email address</FormLabel>
                  <Input
                    type="email"
                    variant="flushed"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    _focus={{ borderColor: "#06B6D4" }}
                    borderColor="#06B6D4"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color="black">Password</FormLabel>
                  <Input
                    type="password"
                    variant="flushed"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    _focus={{ borderColor: "#06B6D4" }}
                    borderColor="#06B6D4"
                  />
                </FormControl>
                <Button
                  isLoading={isLoading}
                  loadingText="Loading..."
                  color="white"
                  variant="outline"
                  spinnerPlacement="start"
                  size="lg"
                  borderRadius={40}
                  onClick={handleLogin}
                  bg="#06B6D4"
                  _hover={{
                    bg: "#06B6D4",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
              <Text align="center" color="black" mt="4">
                Don't have an account?&nbsp;
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "#06B6D4",
                  }}
                >
                  Sign Up
                </Link>
              </Text>
            </Box>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default LoginForm;
