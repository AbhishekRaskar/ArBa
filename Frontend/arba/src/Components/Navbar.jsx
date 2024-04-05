import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, useToast, Button, Text } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { LiaUser } from "react-icons/lia";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
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

  return (
    <Box
      bg="#ECEFF1"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
      p={7}
      position="sticky"
      top="0"
      zIndex="1000"
      borderBottom="1px solid #ddd"
      backgroundColor="#fff"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxWidth="90%"
        mx="auto"
      >
        <NavLink to={"/"} style={{ textDecoration: "none" }}>
          <Heading color="#00AFF0" margin="0">
            ARBA
          </Heading>{" "}
        </NavLink>
        <Flex alignItems="center">
          <NavLink
            to={"/tasks"}
            style={({ isActive }) => ({
              color: isActive ? "#00AFF0" : "black",
              fontSize: "18px",
              marginRight: "20px",
              textDecoration: "none",
            })}
            activeStyle={{ color: "#00AFF0" }}
          >
            Products
          </NavLink>
          <NavLink
            to={"/contact"}
            style={({ isActive }) => ({
              color: isActive ? "#00AFF0" : "black",
              fontSize: "18px",
              marginRight: "20px",
              textDecoration: "none",
            })}
            activeStyle={{ color: "#00AFF0" }}
          >
            Contact
          </NavLink>
          <NavLink
            to={"/about"}
            style={({ isActive }) => ({
              color: isActive ? "#00AFF0" : "black",
              fontSize: "18px",
              marginRight: "20px",
              textDecoration: "none",
            })}
            activeStyle={{ color: "#00AFF0" }}
          >
            Cart
          </NavLink>
          {userData && (
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LiaUser
                onClick={() => setMenuOpen(!menuOpen)}
                fontSize="24px"
                color="#00AFF0"
                aria-label="User Profile"
                style={{ cursor: "pointer" }}
              />
              <Text ml={2} fontWeight="bold">
                {userData.fullName}
              </Text>
              {menuOpen && (
                <Box
                  bg="white"
                  position="absolute"
                  top="50px"
                  right="0"
                  boxShadow="md"
                  borderRadius="md"
                  p={2}
                  zIndex={10}
                >
                  <NavLink
                    to={"/store"}
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    <Button variant="ghost" fontSize="14px" mb={2}>
                      My Store
                    </Button>
                  </NavLink>
                  <NavLink
                    to={"/profile"}
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    <Button variant="ghost" fontSize="14px" mb={2}>
                      Profile
                    </Button>
                  </NavLink>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    fontSize="14px"
                    color="red.500"
                  >
                    Logout
                  </Button>
                </Box>
              )}
            </div>
          )}
          {!userData && (
            <NavLink
              to={"/login"}
              style={{
                color: "black",
                fontSize: "18px",
                textDecoration: "none",
              }}
              activeStyle={{ color: "#00AFF0" }}
            >
              Login
            </NavLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
