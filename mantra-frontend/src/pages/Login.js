import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  Text,
  Image,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import krishna from "../images/krishna.jpg";
import { Link } from "react-router-dom";

export default function Login() {
  let { userLogin, loginErr } = useContext(AuthContext);

  function userLog(event) {
    event.preventDefault()
    userLogin(event.target.username.value,event.target.password.value)
  }

  return (
    <Box w="100%">
      <Flex minHeight="100vh">
        <Box w={[0, 0, 280, 397]}>
          <Image w={[0, 0, 390, 397]} h="100%" src={krishna} />
        </Box>
        <Box flex="1" bg="#fff5e0">
          <Flex align="center" mt="20vh" direction="column">
            <Box
              bg="#ffecc2"
              boxShadow="dark-lg"
              p="6"
              rounded="md"
              pl="4vh"
              w="70%"
            >
              <Box mb="10px" w="70%">
                <Text mb="15px" fontWeight="400" fontSize="28px">
                  Welcome Back
                </Text>
                <Text fontSize="12px" color="grey">
                  Welcome back! Please enter your details.
                </Text>
              </Box>
              <Box w="70%">
                <form onSubmit={userLog}>
                  <Flex direction="column">
                    <FormControl isInvalid={loginErr}>
                      <Flex direction="column">
                        {loginErr && (
                          <FormErrorMessage>
                            Username/ Password invalid
                          </FormErrorMessage>
                        )}
                        <FormLabel fontSize="14px">Username</FormLabel>
                        <Input
                          bg="#f0f0f0"
                          type="text"
                          name="username"
                          id="username"
                        //   w={[100, 300, 400]}
                        w="120%"
                        />
                        <FormLabel fontSize="14px">Password</FormLabel>
                        <Input
                          //   bg="#fae0de"
                          bg="#f0f0f0"
                          type="password"
                          name="password"
                          id="password"
                        //   w={[100, 300, 400]}
                            w="120%"
                        />
                      </Flex>
                    </FormControl>
                    <br></br>
                    <Button
                      mb="5px"
                      type="submit"
                      bg="#d8e3e8"
                    //   w={[100, 300, 400]}
                    w="120%"
                    >
                      Login
                    </Button>
                  </Flex>
                </form>
                <Text fontSize="12px">
                  Don't have an account?
                  <Link to="/register">
                    <span style={{ color: "blue" }}>Sign Up</span>
                  </Link>
                </Text>
              </Box>
            </Box>
          </Flex>
          {/* <form onSubmit={userLogin}>
                {loginErr && <p>{loginErr}</p>}
                <input type="text" placeholder="Enter Username" name="username"/>
                <input type="password" placeholder="Enter Password" name="password" />
                <br></br>
                <input type="submit" />
            </form> */}
        </Box>
        {/* <Center w={[0, 0, 300, 400]} bg="green">
          <Text fontSize={[0, 0, 24, 24]}>Welcome to Mantrlekhan</Text>
        </Center> */}
      </Flex>
    </Box>
  );
}

// {loginErr && <p>{loginErr}</p>}
// <input type="text" placeholder="Enter Username" name="username"/>
// <input type="password" placeholder="Enter Password" name="password" />
// <br></br>
// <input type="submit" />
// </form>

// const [inputData, setInputData] = React.useState({
//     "username" : "",
//     "password" : "",
// })

// function changeHandler(event) {
//     const {name,value} = event.target
//     setInputData(prevText => {
//         return {
//             ...prevText,
//             [name] : value
//         }
//     })
// }

// function submitHandler(event) {
//     event.preventDefault()
//     fetch("http://127.0.0.1:8000/login", {
//         method: "POST",
//         headers:{
//             'Content-Type': "application/json"
//         },
//         body:JSON.stringify(inputData)
//     })
// }

//     return (
//         <div>
//             <form onSubmit={userLogin}>
//                 <input onChange={changeHandler} value={inputData.username} type="text" placeholder="Enter Username" name="username"/>
//                 <input onChange={changeHandler} value={inputData.password} type="password" placeholder="Enter Password" name="password" />
//                 <br></br>
//                 <input type="submit" />
//             </form>
//         </div>
//         )
