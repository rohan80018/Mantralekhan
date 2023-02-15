import React from "react";
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
import feather from "../images/feather1.jpg"
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";



export default function Register() {
  // let da = async() =>{
  //     let res = await fetch("http://127.0.0.1:8000/getuser")
  //     let d = await res.json()
  //     console.log(d)
  // }
  // da()

  // const [inputData, setInputData] = React.useState({
  //     "username": "",
  //     "email": "",
  //     "firstName" : "",
  //     "lastName" : "",
  //     "password" : "",
  //     "confirmPassword": "",

  //     })

  // function handler(event) {
  //     const {name,value} = event.target

  //     setInputData(prevText => {
  //         return({
  //             ...prevText,
  //             [name]: value

  //         })
  //     })
  // }
  // let [username, setUsername] = React.useState[null]
    const {userLogin} =React.useContext(AuthContext)
    // const navigate = useNavigate()
    let [err, setErr] = React.useState({});
    let [pass, setPass] = React.useState(null);
    async function handleSubmit(event) {
        event.preventDefault();
        if (event.target.password.value === event.target.confirmPassword.value) {
        let response = await fetch("http://127.0.0.1:8000/auth/users/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            first_name: event.target.firstName.value,
            last_name: event.target.lastName.value,
            }),
        });
        console.log(response);
        let data = await response.json();
      // console.log(data)
      // console.log(data.username)
            if (response.status === 400) {
                setErr(data);
            }else if (response.status === 201){
                setErr({})
                userLogin(event.target.username.value, event.target.password.value)
                // navigate("/login")
            }
    } else {
        setPass("Password don't match");
    }
    // console.log(JSON.stringify(inputData))
    }


    return (
        // <div>
        //     <form className="form" onSubmit={handleSubmit}>
        //         {err.username && <p>{err.username}</p>}
        //         <input type="text" placeholder="Enter Username" name="username" /><br></br>
        //         {err.email && <p>{err.email}</p>}
        //         <input type="email" placeholder="Enter Email" name="email" /><br></br>
        //         {err.first_name && <p>{err.first_name}</p>}
        //         <input type="text" placeholder="First Name" name="firstName" /><br></br>
        //         {err.last_name && <p>{err.last_name}</p>}
        //         <input type="text" placeholder="Last Name" name="lastName" /><br></br>
        //         {err.password && <p>{err.password}</p>}
        //         <input type="password" placeholder="password" name="password" /><br></br>
        //         {pass && <p>{pass}</p>}
        //         <input type="password" placeholder="Confirm Password" name="confirmPassword"
        //         />
        //         <br></br>
        //         {/* <button onClick={handleSubmit}>Sign up</button> */}
        //         <input type="submit" />
        //     </form>
        // </div>
        <Box w="100%">
        <Flex minHeight="100vh">
          <Box position="relative" w={[0, 0, 397, 397]} >
            <Image h="100vh" w={[0, 0, 397, 397]}  src={feather} />
          </Box>
          <Box flex="1" bg="#c5fcd4" >
            <Flex mt="10vh" align="center"   direction="column">
              <Flex 
              id="scrol"
                direction="column"
                bg="#5de887"
                boxShadow="dark-lg"
                p="6"
                rounded="md"
                h="80vh"
                pl="4vh"
                w="70%"
                overflow="auto"
                justify="center"
              >
                <Box mb="10px" w="70%">
                  <Text mb="15px" fontWeight="400" fontSize="28px">
                    Hello
                  </Text>
                  <Text fontSize="12px" color="grey">
                    Welcome! Please enter your details.
                  </Text>
                </Box>
                <Box w="70%">
                  <form onSubmit={handleSubmit}>
                    <Flex direction="column">
                      <FormControl isInvalid={Object.keys(err).length}>
                        <Flex direction="column">
                          {err.username && (
                            <FormErrorMessage>
                              {err.username}
                            </FormErrorMessage>
                          )}
                          <FormLabel fontSize="14px">Username</FormLabel>
                          <Input
                            id="username"
                            bg="#f0f0f0"
                            type="text"
                            name="username"
                            h="24px"
                            w="120%"
                          />
                          {err.email && (
                            <FormErrorMessage>
                              {err.email}
                            </FormErrorMessage>
                          )}
                          <FormLabel fontSize="14px">Email</FormLabel>
                          <Input
                            //   bg="#fae0de"
                            id="email"
                            bg="#f0f0f0"
                            type="email"
                            name="email"
                            h="24px"
                            w="120%"
                          />
                          {err.first_name && (
                            <FormErrorMessage>
                              {err.first_name}
                            </FormErrorMessage>
                          )}
                        <FormLabel fontSize="14px">First Name</FormLabel>
                        <Input
                            //   bg="#fae0de"
                            id="firstName"
                            bg="#f0f0f0"
                            type="text"
                            name="firstName"
                            h="24px"
                            w="120%"
                          />
                          {err.last_name && (
                            <FormErrorMessage>
                              {err.last_name}
                            </FormErrorMessage>
                          )}
                        <FormLabel fontSize="14px">Last Name</FormLabel>
                        <Input
                            //   bg="#fae0de"
                            id="lastName"
                            bg="#f0f0f0"
                            type="text"
                            name="lastName"
                            h="24px"
                            w="120%"
                          />
                          {err.password && (
                            <FormErrorMessage>
                              {err.password}
                            </FormErrorMessage>
                          )}
                        <FormLabel fontSize="14px">Password</FormLabel>
                        <Input
                            //   bg="#fae0de"
                            id="password"
                            bg="#f0f0f0"
                            type="password"
                            name="password"
                            h="24px"
                            w="120%"
                          />
                          {pass && (
                            <FormErrorMessage>
                              {pass}
                            </FormErrorMessage>
                          )}
                        <FormLabel fontSize="14px">Confirm Password</FormLabel>
                        <Input
                            //   bg="#fae0de"
                            id="confirmPassword"
                            bg="#f0f0f0"
                            type="text"
                            name="confirmPassword"
                            h="24px"
                            w="120%"
                          />
                        </Flex>
                      </FormControl>
                      <br></br>
                      <Button
                        mb="5px"
                        type="submit"
                        bg="#d8e3e8"
                        h="24px"
                        // w={[100, 300, 300]}
                        w="120%"
                      >
                        Submit
                      </Button>
                    </Flex>
                  </form>
                  <Text fontSize="12px">
                    Have an account?
                    <Link to="/login">
                      <span style={{ color: "blue" }}>Sign in</span>
                    </Link>
                  </Text>
                </Box>
              </Flex>
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
