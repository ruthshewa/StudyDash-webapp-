import { Button, Center, Flex, Box, Text, IconButton, Icon, Slider,} from "@chakra-ui/react"
import { IoSettingsSharp } from "react-icons/io5";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import {useState } from "react";
import { DashboardPresenter } from "../react.js/dashboardPresenter";
import {login} from "/src/spotifyOAuth.js"


    export function timerFunction(props) {

      const [isLoggedIn,setIsLoggedIn] = useState(false);
       
        const { isOpen, onOpen, onClose } = useDisclosure()
        function startACB(){
            props.onStart()
        }
        function pauseACB(){
            props.onPause()
        }
        function resetACB(){
            props.onReset()
        }
        
        function changeBreak(){
            props.onBreak()
        }

        const handleLogInClickACB = () =>{
         
          login();
           
        }
        return(
            <Flex
            direction= "column"
            align = "center"
            justify="center"
            height = "100vh"
            backgroundColor = "#131826"
            >  
            <Box
            bg = " #1b2537"
            height = "600px"
            width= "600px"
            align = "center"
            justify="center"
            flexDirection="column"
            position="relative"
            display="flex"
            >
            <Text
            fontSize = "110px"
            fontWeight = "bold"
            color = "white"
            mt = "160px"
            > {props.onFormat()} 
            </Text>
            <Icon
            position = "absolute"
            top = "40px"
            right = "50px"
            boxSize = "60px"
            cursor = "pointer"
            color = "white  "
            onClick={onOpen}
            >
            <IoSettingsSharp />
            </Icon>
            <Flex gap = "40px" align = "center"
              flexDirection="row"
              justify="center"
              mt = "0px"
            >
            <Button   borderRadius="7px" _hover={{ backgroundColor: "#2c3e50" }} backgroundColor="#2c3e50" color = "white" onClick={startACB} disabled= {!props.isPaused} _disabled={{backgroundColor: "blue.950"}} cursor = "pointer">
            Start
            </Button>
            <Button  borderRadius="7px" onClick={pauseACB} _hover={{ backgroundColor: "#2c3e50" }}  backgroundColor="#2c3e50" color = "white" disabled={props.isPaused} _disabled={{ backgroundColor: "#2c3e50"}} cursor = "pointer">
            Pause
            </Button>
            <Button borderRadius="7px" onClick={resetACB} _hover={{ backgroundColor: "#2c3e50" }}  backgroundColor="#2c3e50" color = "white" cursor = "pointer">
            Reset
            </Button>
            </Flex>
            <Flex  direction= "column"
            align = "center"
            justify="center">  
              <div className="spotify">
                  <div>
                    {!isLoggedIn &&(
                      <button className="spotify-login" onClick = {handleLogInClickACB}>Log in with Spotify</button>

                      

                    )}
                    
                      
                      
                  </div>  
                </div>


            </Flex>
            </Box>

            <DashboardPresenter setIsLoggedIn={setIsLoggedIn}/>
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW= "400px" h = "350px">
          <ModalHeader>Settings</ModalHeader>
          <ModalBody>
            <Flex gap = "60px" direction = "column" align = "center" justify = "center" height = "90%">
          <Select placeholder='Choose study time' onChange = {(e) => props.onWork(parseInt(e.target.value))}>
          <option value='25'>25</option>
        <option value='30'>30</option>
        <option value='35'>35</option>
        <option value='40'>40</option>
        <option value='45'>45</option>
        <option value='50'>50</option>
        <option value='55'>55</option>
            </Select>   
            
          <Select placeholder= 'Choose break time' onChange = {(e) => props.onBreak(parseInt(e.target.value))}>
          <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='15'>15</option>
        <option value='20'>20</option>

            </Select>
            </Flex>
            </ModalBody>
          <ModalCloseButton />
          <ModalFooter>
            <Button  onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
            </Flex>
        )
    }

