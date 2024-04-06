import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [avatarURL, setAvatarURL] = useState("");
  const toast = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    setAvatarURL(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...user, avatar: avatarURL };
      const response = await axios.put(
        `https://arba-be.onrender.com/users/update/${user._id}`,
        updatedUser
      );
      console.log(response.data);
      // Update local storage with updated user data
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsEditing(false);
      toast({
        title: "Profile updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.put(
        `https://arba-be.onrender.com/users/update/${user._id}`,
        {
          currentPassword,
          newPassword,
        }
      );
      console.log(response.data);
      // Update local storage with updated user data
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setNewPassword("");
      setCurrentPassword("");
      setIsAlertOpen(false);
      toast({
        title: "Password changed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Error changing password. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      boxShadow="rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;"
      p={4}
      w="70%"
      m={"auto"}
    >
      <VStack w={"100%"} spacing={6} align="stretch">
        <Avatar m={"auto"} size="xl" src={user.avatar} />
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl id="avatar">
            <FormLabel>Avatar URL</FormLabel>
            <Input
              defaultValue={user.avatar}
              name="avatar"
              onChange={handleAvatarChange}
            />
          </FormControl>
          <FormControl id="fullName">
            <FormLabel>Full Name</FormLabel>
            <Input
              defaultValue={user.fullName}
              name="fullName"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              defaultValue={user.userName}
              name="userName"
              onChange={handleInputChange}
              disabled
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              defaultValue={user.email}
              name="email"
              onChange={handleInputChange}
              disabled
            />
          </FormControl>
          <FormControl id="age">
            <FormLabel>Age</FormLabel>
            <Input
              defaultValue={user.age.toString()}
              name="age"
              disabled
              onChange={handleInputChange}
            />
          </FormControl>
          <Button m={"auto"} w={"30%"} mt={6} colorScheme="blue" type="submit">
            Update Profile
          </Button>
        </form>
        <Button
          m={"auto"}
          w={"30%"}
          colorScheme="red"
          onClick={() => setIsAlertOpen(true)}
        >
          Change Password
        </Button>
      </VStack>
      <AlertDialog isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Change Password
            </AlertDialogHeader>
            <AlertDialogBody>
              <FormControl id="currentPassword">
                <FormLabel>Current Password</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="newPassword">
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsAlertOpen(false)}>Cancel</Button>
              <Button colorScheme="red" onClick={handlePasswordChange} ml={3}>
                Change
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Profile;
