import React from "react";
import { Button, Text, Flex, FormControl,Spinner, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";

export default function MyProfile() {
    const  {authToken, userN, user} = React.useContext(AuthContext)
    const [ proData, setProData] = React.useState({
        username:"",
        firstName:"",
        lastName:""
    })
    const[sucess,setSucess] = React.useState(null)
    

    let profileData = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/getProfileData/${user.user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + String(authToken.access),
          },
        });
        let data = await response.json();
        setProData(data);
      };
      
    React.useEffect(()=>{
        profileData()
    },[])
    // const [inputData, setInputData] =React.useState({
    //     firstName : proData.firstName,
    //     lastName : proData.lastName
    // })
    // console.log(inputData)
    
    
    function handleChange(event) {
        const {name,value} = event.target
        setProData(prevText => {
            return({
                ...prevText,
                [name]: value
            })
        })
    }
    async function handleSubmit(event) {
        event.preventDefault()
        let response = await fetch(`http://127.0.0.1:8000/api/getProfileData/${user.user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "JWT " + String(authToken.access),
              },
            body: JSON.stringify({
            first_name: event.target.firstName.value,
            last_name: event.target.lastName.value,
            })
        })
        let data = await response.json();
        if(response.status=== 200){
            setProData({
                firstName:data.firstName,
                lastName:data.lastName
            })
            setSucess("Your Name Updated")
        }
    }
    // console.log(inputData)
    
    // console.log(userData)

    if (!Object.keys(proData).length) {
        return (
          <Flex w="100%" h="93vh" align="center" justify="center">
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Flex>
        )
      }
    return (
        <Flex pt="10px" w="100%" h="93vh" align="center" direction="column" justify="center">
            <Flex
            borderRadius="9px"
            // id="scrol"
            pt="15px"
            // bg="rgba(255,255,255,.9)"
            bg="rgba(31, 40, 67,.5)"
            w="70%"
            h="60vh"
            direction="column"
            align="center"
            // justify="center"
            overflow="auto" id="scrol"
            >
               <Flex  w="80%" direction="column">
                <Text color="red" fontSize={[24,28,30]}>{userN}</Text>
                <form onSubmit={handleSubmit}>
                <FormControl isInvalid="">
                {/* Object.keys(err).length */}
                        <Flex direction="column">
                            
                           {sucess && (
                            <Text color="#57f518">
                             {sucess}
                            </Text>
                          )} 
                          
                          <FormLabel color="white" fontSize="18px">First Name</FormLabel>
                          <Input
                            bg="#f0f0f0"
                            type="text"
                            name="firstName"
                            h="35px"
                            w="60%"
                            value={proData.firstName}
                            onChange={handleChange}
                          />
                          <br></br>
                            <FormLabel color="white" fontSize="16px">Last Name</FormLabel>
                            <Input
                            bg="#f0f0f0"
                            type="text"
                            name="lastName"
                            h="35px"
                            w="60%"
                            value={proData.lastName}
                            onChange={handleChange}
                          />
                          <br></br>
                          <Button colorScheme='blue' variant='solid' w="90px" h="35px" type="submit">Submit</Button>
                          </Flex>
                </FormControl>
                </form>

                </Flex>
                
            </Flex>
            
        </Flex>    
    )
}