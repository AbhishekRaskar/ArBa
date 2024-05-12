import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  useToast,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedToken && storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("acceptedTerms");
    setUserData(null);
    showToast("Logged out successfully");
    navigate("/login");
  };

  const showToast = (message) => {
    toast({
      title: message,
      status: "warning",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  // Determine if the menu toggle icon should be displayed based on screen size
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg="#06B6D4"
      p={4}
      position="sticky"
      top="0"
      zIndex="1000"
      borderBottom="1px solid #ddd"
      color="white"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxWidth="90%"
        mx="auto"
      >
        <Flex alignItems="center">
          <NavLink to={"/"}>
            <Heading as="h1" fontSize="4xl" fontWeight="bold" color="white">
              ARBA
            </Heading>
          </NavLink>
        </Flex>
        <Flex alignItems="center">
          {isMobile && (
            <IconButton
              icon={
                isOpen ? <FaTimes color="white" /> : <FaBars color="white" />
              }
              aria-label="Menu"
              onClick={onToggle}
              variant="outline"
              color="white"
              bg="#06B6D4"
              _hover={{ bg: "#06B6D4" }}
              mr={4}
            />
          )}
          <Flex
            alignItems="center"
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-end" }}
            width={{ base: "full", md: "auto" }}
            mt={{ base: 4, md: 0 }}
            flexGrow={1}
            display={{ base: isOpen ? "flex" : "none", md: "flex" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <NavLink
              to={"/tasks"}
              style={({ isActive }) => ({
                color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
                fontSize: "18px",
                marginRight: "20px",
                textDecoration: "none",
              })}
              activeStyle={{ color: "white" }}
            >
              Products
            </NavLink>
            <NavLink
              to={"/contact"}
              style={({ isActive }) => ({
                color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
                fontSize: "18px",
                marginRight: "20px",
                textDecoration: "none",
              })}
              activeStyle={{ color: "white" }}
            >
              Contact
            </NavLink>
            <NavLink
              to={"/cart"}
              style={({ isActive }) => ({
                color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
                fontSize: "18px",
                marginRight: "20px",
                textDecoration: "none",
              })}
              activeStyle={{ color: "white" }}
            >
              Cart
            </NavLink>
            {userData ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FaUser />}
                  variant="outline"
                  bg="white"
                  color="#00AFF0"
                  _hover={{ bg: "white", color: "#00AFF0" }}
                >
                  {userData.fullName}
                </MenuButton>
                <MenuList bg="white" color="black">
                  <MenuItem>
                    <NavLink
                      to={"/store"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      My Store
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to={"/profile"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Profile
                    </NavLink>
                  </MenuItem>
                  <Button
                    onClick={handleLogout}
                    bg="red.500"
                    _hover={{
                      bg: "red.500",
                    }}
                    color="white"
                  >
                    Logout
                  </Button>
                </MenuList>
              </Menu>
            ) : (
              <NavLink
                to={"/login"}
                style={{
                  color: "white",
                  fontSize: "18px",
                  textDecoration: "none",
                }}
                activeStyle={{ color: "white" }}
              >
                Login
              </NavLink>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
