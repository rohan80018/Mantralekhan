import React from "react";
import AuthContext from "../context/AuthContext";
import {Button, Flex, Text, Spinner} from "@chakra-ui/react"
import Profile from "../components/Profile";


export default function TopUser(props) {
    const{topUserData,topUser} = React.useContext(AuthContext)
    const [type, setType] = React.useState("today")
    React.useEffect(()=>{
        topUser()
    },[])
    
    // if (!Object.keys(topUserData).length) {
    //     return <div>loading</div>;
    // }
    if (!Object.keys(topUserData).length) {
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
    
    
    
    function toog(mode) {
        if(mode === "week"){
            setType(mode)
            
        }else if(mode === "month"){
            setType(mode)
            
        }else if(mode === "year"){
            setType(mode)
            
        }else{setType("today")
        }
    }
    
    return (
        <Flex pt="10px" w="100%" h="93vh" align="center" direction="column">
            <Flex w="40%"  bg="rgba(31, 40, 67,.5)" h="5Vh" justify="space-around" align="center">
                <Text fontSize={[12,14,16]} className={type === "today"? "mode active":"mode"} onClick={()=>toog("today")}>Today</Text>
                <Text fontSize={[12,14,16]} className={type === "week"? "mode active":"mode"} onClick={()=>toog("week")}>Week</Text>
                <Text fontSize={[12,14,16]} className={type === "month"? "mode active":"mode"} onClick={()=>toog("month")}>Month</Text>
                <Text fontSize={[12,14,16]} className={type === "year"? "mode active":"mode"} onClick={()=>toog("year")}>Year</Text>
            </Flex>
            <Flex id="scrol" pt="15px" mt="10px" bg="rgba(31, 40, 67,.5)" w="60%" h="70vh" direction="column" align="center" >
            <Profile mantra={props} data={topUserData[type]}/>
            </Flex>
            <br></br>
            <Button colorScheme='teal' variant='ghost' onClick={()=>props.link("home")}>Start Mantralekhan</Button>

        </Flex>
    )
}