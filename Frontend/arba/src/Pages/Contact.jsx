import React from "react";
import {
  Box,
  Text,
  VStack,
  Divider,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

const Contact = () => {
  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Contact Us
      </Text>
      <VStack align="start" spacing={4} mb={6}>
        <Text fontSize="lg">Address: Pune, India</Text>
        <Text fontSize="lg">Phone: +91-1234567890</Text>
        <Text fontSize="lg">Email: contact@arba.com</Text>
        <Text fontSize="lg">Hours: Mon - Fri: 9am - 5pm</Text>
        {/* Add more contact information as needed */}
      </VStack>
      <Divider my={6} />
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Send us a message
      </Text>
      <form>
        <VStack align="start" spacing={4}>
          <Box w="100%">
            <Text fontSize="lg" mb={2}>
              Name
            </Text>
            <Input type="text" placeholder="Your name" size="lg" required />
          </Box>
          <Box w="100%">
            <Text fontSize="lg" mb={2}>
              Email
            </Text>
            <Input type="email" placeholder="Your email" size="lg" required />
          </Box>
          <Box w="100%">
            <Text fontSize="lg" mb={2}>
              Message
            </Text>
            <Textarea placeholder="Your message" rows={6} size="lg" required />
          </Box>
          <Button type="submit" m={"auto"} size="lg" colorScheme="blue">
            Send
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Contact;
