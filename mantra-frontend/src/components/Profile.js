import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";

export default function Profile(props) {
    
  let {userN} = React.useContext(AuthContext)
  // console.log(data)
  if(!props.data.length ){
    return(
      <Flex direction="column" align="center">
        <Text color="white">No Mantarlekhans</Text>
        <Button colorScheme='teal' variant='ghost' onClick={()=>props.mantra.link("home")}>Start Mantralekhan</Button>
      </Flex>
      
    )
  }
  
  const result = props.data.map((item) => 
    (<Box w="80%" key={item.username}>
      <Box borderRadius="24px" h={[20,90,120,140]} bg={userN ===item.username ? "rgba(247, 238, 109,.3)":"rgba(214, 214, 214,.2)"} w="100%"  >
        <Flex align='center' h="100%" pl={[5,4,15,45]}>

          <Flex w={[50,50,95]} h={[50,50,95]} id="container" align="center" direction="column" justify="center"  borderColor="red" border="1px">
            <Box fontSize={[14,16,20,18]} id="name">{item.fname[0].toUpperCase()} {item.lname[0].toUpperCase()}</Box>
          </Flex>

          <Flex pl={[2,8,12]} w="80%" direction="column">
            <Text fontSize={[14,20,24]} fontWeight="700" color="red">{item.fname} {item.lname}</Text>
            <Text fontSize={[10,18,20]} fontWeight="500" color="#d6d6d6">Today's Mantralekhan <Text as="span" color="red" fontSize={[12,20,24]}>{item.count}</Text></Text>
          </Flex>

        </Flex>
        
      </Box>
      <br></br>
    </Box>) 
  );

  return (
        
        result
    
  );
}
