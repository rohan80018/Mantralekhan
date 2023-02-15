import React from "react";
import Mantra from "../components/Mantra";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import bg from "../images/bg.jpg"
import {
  Spinner,
  Center,
  Flex,
  Box,
  Text
} from "@chakra-ui/react";
import TopUser from "./TopUser";
import MyPerformance from "./MyPerformance";
import MyProfile from "./MyProfile";

export default function HomePage() {
  // let [userData, setUserData] = React.useState({})
  let {logoutUser, getUserData, userData } = React.useContext(AuthContext);
  let [state, setState] = React.useState("home")

  React.useEffect(() => {
    getUserData();
    // console.log('123')
  }, []);

  
  if (!Object.keys(userData).length) {
    return (
      <Flex bgImg={bg} w="100%" h="100vh" align="center" justify="center">
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
  function toogle(mode) {
    if (mode ==="topUser"){
      setState(mode)
    }else if (mode === "myPerformance"){
      setState(mode)
    }else if(mode === "profile"){
      setState(mode)
    }else{setState("home")}
  }
  return (
    // <div>
    //   <Link onClick={logoutUser}>Logout</Link>
    //   This is Home Page
    //   <p>
    //     {userData.userName}
    //     {userData.month}
    //   </p>
    //   <p>
    //     Today mantralekhan {userData.TotalMantra[0]} by{" "}
    //     {userData.TotalMantra[1]} registered user
    //   </p>
    //   <Mantra />
    //   {/* <input value={input.mantra} onChange={handleChange} type="text" placeholder="mantra" name="mantra" /> */}
    // </div>
    <Flex direction="column" bgImg={bg} bgPosition="center"
    bgRepeat="no-repeat">
      <Box>
        <Flex  h="7vh" justify="space-between" align="center">
          <Box  w={[300,500,600]}>
            <Flex justify="space-evenly">
              <Center  className={state ==="home"? "mode active":"mode"}  h="5vh" w="10vh"  onClick={()=>toogle("home")}>
                <Text fontSize={[12,14,18]}>Home</Text>
              </Center>
            
              <Center  className={state ==="topUser"? "mode active":"mode"} h="5vh" w="16vh"  onClick={()=>toogle("topUser")}>
                <Text fontSize={[12,14,18]}>Top Users</Text>
              </Center>

              <Center  className={state ==="myPerformance"? "mode active":"mode"} h="5vh" w="20vh"  onClick={()=>toogle("myPerformance")}>
                <Text fontSize={[12,14,18]}>My Performance</Text>
              </Center>

              <Center  className={state ==="profile"? "mode active":"mode"} h="5vh" w="16vh" onClick={()=>toogle("profile")}>
                <Text fontSize={[12,14,18]}>My Profile</Text>
              </Center>
            </Flex>
          </Box>
          <Center pr="8px">
          <Link onClick={logoutUser}><span fontSize={[12,14,18]} style={{color:"red"}}>LogOut</span></Link>
          </Center>
        </Flex>
        {/* <hr style={{borderColor:"rgb(129, 129, 130)"}}></hr> */}
      </Box>

      <Box>
        {state === "home"?
        <Mantra/>: state === "topUser"?
        <TopUser link={toogle}/>: state === "myPerformance"?
        <MyPerformance />:
        <MyProfile/>}
      </Box>
    </Flex>
  );
}
// {
//     "userName": "some thing",
//     "today": "No Data",
//     "week": 15,
//     "month": 15,
//     "year": 15
// }
