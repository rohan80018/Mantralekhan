import React from "react";
import { Text, Flex, Box,Spinner } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
// import { Chart } from "chart.js";
import Chart from "../components/Chart";

export default function MyPerformance() {
  let { perData,performance } = React.useContext(AuthContext);
  // let [perData, setPerData] = React.useState({});
  // let performance = async () => {
  //   let response = await fetch("http://127.0.0.1:8000/api/getPerformance", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "JWT " + String(authToken.access),
  //     },
  //   });
  //   let data = await response.json();
  //   setPerData(data);
  // };
  React.useEffect(() => {
    performance();
  }, []);

  

  // const eleChart = perData.month.map((per) =>{
  //         let performanceData = {

  //         }
  //     }
  // )
  // if (!Object.keys(perData).length) {
  //   return (
  //     <Flex w="100%" h="93.2vh" align="center" justify="center">
  //       <Spinner
  //         thickness='4px'
  //         speed='0.65s'
  //         emptyColor='gray.200'
  //         color='blue.500'
  //         size='xl'
  //       />
  //     </Flex>
  //   )
  // }
  if (!Object.keys(perData).length) {
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
    <Flex pt="10px" w="100%" h="93vh" align="center" direction="column">
      <Flex
        borderRadius="9px"
        pl="5px"
        mt="10px"
        bg="rgba(31, 40, 67,.5)"
        w="40%"
        h="20vh"
        align="center"
      >
        <Flex
          bg="#333"
          h="65%"
          align="center"
          direction="column"
          justify="center"
          // borderColor="red
          borderRadius="100px"
          border="1px"
          w={[0, 85, 95]}
        >
          {/* <Flex w={[0,50,50,70]} h={[0,50,50,70]} id="container" align="center" direction="column" justify="center"  borderColor="red" border="1px"> */}
          <Box fontSize={[0, 24, 24]} id="name">
            {perData.user.fname[0].toUpperCase()}{" "}
            {perData.user.lname[0].toUpperCase()}
          </Box>
          {/* </Flex> */}
        </Flex>
        <Flex  pl={[0, 3, 7, 9]} flex="1" direction="column">
          <Text fontSize={[14, 20, 24]} color="red">
            {perData.user.fname} {perData.user.lname}
          </Text>
          <Text fontSize={[10, 12, 14, 20]} color="white">
            This Week's Mantralekhan:{" "}
            <Text as="span" color="red">
              {perData.user.weekCount ? perData.user.weekCount : 0}
            </Text>
          </Text>
          <Text fontSize={[10, 12, 14, 20]} color="white">
            Total Mantralekhan:
            <Text as="span" color="red">
              {perData.user.totalCount ? perData.user.totalCount : 0}
            </Text>
          </Text>
        </Flex>
      </Flex>

      <Flex
        borderRadius="9px"
        id="scrol"
        // pt="px"
        mt="10px"
        // bg="rgba(255,255,255,.9)"
        bg="rgba(31, 40, 67,.5)"
        w={[370,450,750]}
        h="60vh"
        direction="column"
        align="center"
        justify="center"
        overflow="auto"
      >
        {perData.user.totalCount ? (
          <Box w="80%" h="60%">
            {perData.month.map((item) => (
              <Box key={item.mon}>
                <Box  borderRadius="9px" bg="rgba(255,255,255,.7)">
                  <Chart data={item} key={item.mon} />
                </Box>
                <br></br>
              </Box>
            ))}
          </Box>
        ) : (
          <Text fontWeight="600" fontSize={[14, 20, 28]} color="white">
            No Data Yet
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
