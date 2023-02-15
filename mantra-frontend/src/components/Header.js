import React, {useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {Text, Switch ,Input, Flex, Box, Grid, Button} from "@chakra-ui/react"


export default function Header() {
    let {user, logoutUser} = useContext(AuthContext)
    
    return (
        <Box>
            
        
            {/* {auth &&<Link to='/'>Home</Link>} */}
            {/* {user ? (<div><Link to='/'>Home</Link>
            <span>|</span>
            <Link to="/topUser">TopUsers</Link>
            <span>|</span>
            <Link onClick={logoutUser}>Logout</Link></div>): */}
            {/* // (<div><Link to="/login">Login</Link><span>|</span> */}
            {/* <Link to="/register">Register</Link></div>)} */}
        
        </Box>
    )
}