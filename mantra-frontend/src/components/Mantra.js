import React, { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Letter from "./Letter";
import {
  Text,
  Input,
  Flex,
  Box,
  Wrap,WrapItem
} from "@chakra-ui/react";


export default function Mantra() {

  const { postUserData, userData } = React.useContext(AuthContext);
  const [word, setWord] = React.useState(newLetter);
  const[wordCount, setWordCount] = React.useState([])
  const [ newCount, setNewCount] = React.useState(0)
  let [count, setCount] = React.useState(0);

  let [input, setInput] = React.useState({ mantra: "" });

  // console.log(input.mantra[2])
  // function handleChange(event) {
  //     const {name,value} = event.target
  //     // if (event.target.value ===)
  //     setWord((old)=>
  //     old.map((o)=> {
  //         return o.value === input.mantra[input.mantra.length] ? {...o, isTyped: !o.isTyped} : o
  //     }))
  //     setInput(prev => {
  //         return{...prev, [name]:value}
  //     })}
  //     // console.log("in",event.target.value)

  //     if (input.mantra == "mantra"){
  //         console.log("done")
  //         clearInput()
  //     }else{
  //     // setInput(prev => {
  //     //     return{...prev, [name]:value}
  //     // })}

  // }
  function clearInput() {
    setInput({ mantra: "" });
    console.log(input.mantra, "clear");
  }

  // function newLetter() {
  //   let arr = "mantra";

  //   let newArr = [];
  //   for (let i = 0; i < 6; i++) {
  //     newArr.push({
  //       value: arr[i],
  //       id: i,
  //       isTyped: false,
  //     });
  //   }
  //   return newArr;
  // }

  // 13
  function newLetter() {
    // let arr = ["Jai Shree Ram", "Jai Hanuman"];
    // let ranNum = Math.floor(Math.random() * arr.length)
    // setState(ranNum)

    // let item = arr[ranNum]
    let item = "Laxminarayan";
    let newArr = [];
    for (let i = 0; i < item.length; i++) {
      newArr.push({
        value: item[i],
        id: i,
        isTyped: false,
      });
    }
    return newArr;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    // let a = "mantra";
    // console.log(event.target.value);
    let a = "Laxminarayan".toLowerCase();
    if (a.startsWith(event.target.value)) {
      setInput((prev) => {
        return { ...prev, [name]: value };
      });
      // console.log(event.target.value)
      setWord((oldWord) =>
        oldWord.map((old) => {
          return old.value.toLowerCase() === event.target.value[input.mantra.length].toLowerCase() &&
            old.id === input.mantra.length
            ? { ...old, isTyped: !old.isTyped }
            : old;
        })
      );    
    }
    // console.log(input.mantra);
  }

  useEffect(() => {
    if (input.mantra === "Laxminarayan".toLowerCase()) {
      setWord((oldWord) =>
        oldWord.map((old) => {
          return { ...old, isTyped: !old.isTyped };
        })
      );
      setWordCount((word)=>([...word,"Laxminarayan"]))
      setNewCount((prev)=> prev+1)
      // if (newCount < 10){
      //   setNewCount((prev)=> prev+1)
      // }
      clearInput();
      setCount((prev) => prev + 1);
      if (count === 4) {
        console.log(count, "hhdjbh");
        setCount(0);
        postUserData();
      }
      if(newCount === 10) {
        setNewCount(0)
        setWordCount([])
      }
    }
  }, [input]);
  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      // 👇️ your logic here
      event.preventDefault();
    }
  };
  let eleword = wordCount.map((w)=>(
    <WrapItem>
      <Text color="orange" fontWeight="600" fontSize="14px">{w}</Text>
    </WrapItem>
  ))
  // const eleword = count.map((w) =>(
  //   <h1>Laxminarayan</h1>
  // // ))
  // let eleword = ""
  // console.log(count)
  // for (let i = 0; i < count; i++) {
  //   eleword=<Text color="red">Laxminarayan</Text>
  // }
  const letterElements = word.map((w) => (
    <Letter key={w.id} value={w.value} isTyped={w.isTyped} />
  ));
    // console.log(wordCount)
  return (
    <Box>
      <Flex  h="93vh"  justify="center">
        <Flex  direction="column" justify="center" align="center" w="50%">
        <Flex p="8px" borderRadius="12px" bg="rgba(31, 40, 67,.8)" w="90%" h="20vh" direction={'column'} align="center">
        <Flex >{letterElements}</Flex>
        <Input
          // width="0px"
          // height="0px"
          // bg="white"
          width="73%"
          h="6vh"
          color="white"
          onKeyDown={handleKeyDown}
          value={input.mantra}
          onChange={handleChange}
          type="text"
          // placeholder="mantra"
          name="mantra"
          autoComplete="off"
          autoFocus
        />
      </Flex>
      <Text color="white">Today <span id="userYear">{userData.today+count}</span></Text>
      <Text color="white">Total <span id="userYear">{userData.year+count}</span> and counting ...</Text>
      {/* <Flex wrap='flex'>{eleword}</Flex> */}
      <Wrap p="2px" borderRadius="9px" bg="rgba(31, 40, 67,.8)">
        {eleword}
      </Wrap>
      </Flex>
        
      </Flex>
      
    </Box>
  );
}
