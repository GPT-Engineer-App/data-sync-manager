import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, useToast, Container, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const API_BASE_URL = "https://backengine-x8it.fly.dev";

const Index = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Set the accessToken in localStorage or context for authenticated requests
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Signup Successful",
          description: "You have successfully signed up. Please log in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg={useColorModeValue("white", "gray.700")}>
        <VStack spacing={4}>
          <Heading as="h1" size="xl">
            Welcome to Interactive API
          </Heading>
          <Text>Sign up or log in to get started.</Text>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Stack direction={["column", "row"]} spacing={4} align="center">
            <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
            <Button leftIcon={<FaUserPlus />} colorScheme="green" onClick={handleSignup}>
              Signup
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
