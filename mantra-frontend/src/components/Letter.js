import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function Letter(props) {
    
    const styles ={
        color: props.isTyped ? "rgba(10, 240, 36,.7)" : "rgba(255, 71, 71,.5)",
        width:props.value ===" "? "4px": ""
    }
    return (
        <Box style={styles}>
            <Text fontWeight="700" fontSize={[24,24,24,28,30]}>{props.value}</Text>
        </Box>
    )
} 