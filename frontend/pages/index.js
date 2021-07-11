import React, { useState } from 'react';
import {CSSTransition} from 'react-transition-group';
import { Github } from '@icons-pack/react-simple-icons';

import {
  Container,
  Flex,
  Box,
  Heading,
  Button,
  useColorMode,
  useColorModeValue,
  Text,
  NumberInput,
  NumberInputField,
  InputRightElement,
  LightMode,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ArrowBackIcon } from '@chakra-ui/icons'
import Image from 'next/image'

import Web3 from "web3";

import Web3Modal from "web3modal";
const providerOptions = {};

const sfcInterface = [
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
];
const sfcAddress = "0xdd6FDBD6EdDE62C30aFB599A12C72B64c1DB495e"

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const borderStyle = useColorModeValue("1px solid rgba(0,0,0,0.1)", "1px solid rgba(255,255,255,0.1)");

  const [showExplainer, setShowExplainer] = useState(false);
  const [amount, setAmount] = useState(0);

  let web3;

  function connect(){
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });
    
    return web3Modal.connect().then((provider)=>{
      web3 = new Web3(provider);
      //console.log(web3.eth.getBalance())
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    alert('Pumping has not been fully implemented yet. Check back soon.')
    /*
    if(!web3){
      connect().then(()=>{
        handleSubmit()
      })
      return
    }
    const sfcContract = new web3.eth.Contract(sfcInterface, sfcAddress);
    */
  }

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box borderBottom={borderStyle}>
        <Container maxW="container.lg">
        <Flex py={3}>
          <Heading fontSize="2xl" mt={1}>
            <Text d="inline" color="brand.500">Twitter</Text>pump
          </Heading>

          <Box ml="auto">
            <Button size="sm" onClick={toggleColorMode} display={['none','inline-block']}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <LightMode>
              <Button onClick={connect} size="sm" colorScheme="brand" ml={4}>
                Connect Wallet
              </Button>
            </LightMode>
          </Box>
          </Flex>
        </Container>
      </Box>
      <Flex grow="1" flexDirection="column" justifyContent="center" background={colorMode === "dark" && "radial-gradient(80% 20% at bottom, rgb(11.4, 63.1, 94.9, 0.5) 2%, transparent 30%)"} position="relative">


<CSSTransition in={showExplainer} timeout={1000} classNames="transitioner">
<div className="transitioner-inner explainer">
        <Container maxW="container.sm" py={8}>
          <Text display="inline-block" onClick={() => setShowExplainer(!showExplainer)} textDecoration="underline" fontSize="sm" fontWeight="600" mb={8} transition="opacity 0.3s" _hover={{opacity: 0.8, cursor: 'pointer'}}>
            <ArrowBackIcon />Back
          </Text>
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"]} gap={8}>
            <Box>
            <Box sx={{filter: colorMode === "light" && "invert(48%) sepia(79%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%)"}} float={["left", "none"]} mr={[8,0]}>
              <Image src="/images/Step1.svg" alt="twitterpump" width="80" height="80" />
              </Box>
              <Heading fontSize="lg" fontWeight="bold" letterSpacing="1px" mb={1} mt={[1,4]}>Check Stocks</Heading>
              <p>Monitor $AAPL, $TSLA, and $GOOGL prices.</p>
            </Box>
            <Box pl={[0,0,1]} >
            <Box sx={{filter: colorMode === "light" && "invert(48%) sepia(79%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%)"}}  float={["left", "none"]} mr={[8,0]}>
              <Image src="/images/Step2.svg" alt="twitterpump" width="80" height="80" />
              </Box>
              <Heading fontSize="lg" fontWeight="bold" letterSpacing="1px" mb={1} mt={[1,4]}>Pump Them</Heading>
              <p>If a stock is on a bull run, we tweet about it.</p>
            </Box>
            <Box><Box sx={{filter: colorMode === "light" && "invert(48%) sepia(79%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%)"}}  float={["left", "none"]} mr={[8,0]}>
              <Image src="/images/Step3.svg" alt="twitterpump" width="80" height="80" />
              </Box>
              <Heading fontSize="lg" fontWeight="bold" letterSpacing="1px" mb={1} mt={[1,4]}>Trigger Trades</Heading>
              <p>Traders and algorithms pick up the signal.</p>
            </Box>
          </Grid>
        </Container>
</div>
</CSSTransition>


<CSSTransition in={!showExplainer} timeout={1000} classNames="transitioner">
<div className="transitioner-inner feature">
        <Container maxW="container.lg" textAlign="center">
          <Box mb={4}>
          {colorMode === "light" ? <Image src="/images/image_filled.svg" alt="twitterpump" width="123" height="90" /> : <Image src="/images/image.svg" alt="twitterpump" width="123" height="90" />}
          </Box>
          <Heading mb={3}>Pump tech stocks with twitter bots</Heading>
          <Text fontSize="xl" mb={8}>Fund the pool with ETH to power tweets about tech stock bull runs</Text>
          <form onSubmit={handleSubmit}>
            <Flex justifyContent="center" mb={6}>
              <NumberInput size="lg" maxW={48} defaultValue={.0001} min={0} step={.0001}>
                <NumberInputField onChange={event => setAmount(event.currentTarget.value)} />
                <InputRightElement children={<Text pr={4}>ETH</Text>} />
              </NumberInput>
              <LightMode>
                <Button colorScheme="brand" size="lg" type="submit" ml={4}>
                  Pump
                </Button>
              </LightMode>
            </Flex>
          </form>
          <Text onClick={() => setShowExplainer(!showExplainer) } fontSize="sm" textDecoration="underline" opacity={0.66} pb={1} transition="opacity 0.3s" _hover={{opacity: 0.5, cursor: 'pointer'}}>
            How does it work?
          </Text>
        </Container>
</div>
</CSSTransition>
      </Flex>
      <Box borderTop={borderStyle}>
        <Container maxW="container.lg" fontSize="xs" >
          <Flex flexDirection={['column', 'column', 'column', 'row']} py={2} opacity={0.5}>
            This is a proof of concept. It is unlikely to have significant impact on stock prices.
            <Box ml={[0, 0, 0, "auto"]} as="a" href="https://github.com/noahlitvin/twitterpump" transition="opacity 0.3s" _hover={{opacity: 0.8}}>
              <Github size={14} style={{display: "inline-block", marginRight: 6, marginTop: -2.5}} />View Source
            </Box>
          </Flex>
        </Container>
      </Box>
    </Flex>
  )
}
