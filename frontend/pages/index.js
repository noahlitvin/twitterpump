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

const sfcInterface = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
// TODO: Switch address based on ENV https://docs.chain.link/docs/link-token-contracts/
const sfcAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"

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
      web3 = new Web3(provider)
    })
  }

  const handleSubmit = event => {
    event.preventDefault();

    // TODO: Remove me
    alert('Pumping has not been fully implemented yet. Check back soon.')
    return

    if(!web3){
      connect().then(()=>{
        handleSubmit(event)
      })
      return
    }
    const sfcContract = new web3.eth.Contract(sfcInterface, sfcAddress)

    //TODO: Add deployed contract address
    sfcContract.methods.transfer("DEPLOYEDCONTRACTADDRESS", amount).send().then((err) => { 
      alert('Submitted!')
    })
  }

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box borderBottom={borderStyle}>
        <Container maxW="container.lg">
        <Flex py={3}>
          <Heading fontSize="2xl" transform={'translateY(2px)'}>
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
              <p>If a stock is on a bull run, tweet about it.</p>
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
          <Text fontSize="xl" mb={8}>Fund the pool with LINK to power tweets about tech stock bull runs</Text>
          <form onSubmit={handleSubmit}>
            <Flex justifyContent="center" mb={6}>
              <NumberInput size="lg" maxW={48} defaultValue={.1} min={0} step={.1}>
                <NumberInputField onChange={event => setAmount(event.currentTarget.value)} />
                <InputRightElement children={<Text pr={4}>LINK</Text>} />
              </NumberInput>
              <LightMode>
                <Button colorScheme="brand" size="lg" type="submit" ml={4}>
                  Pump
                </Button>
              </LightMode>
            </Flex>
          </form>
          <Text onClick={() => setShowExplainer(!showExplainer) } d="inline" fontSize="sm" textDecoration="underline" opacity={0.66} pb={1} transition="opacity 0.3s" _hover={{opacity: 0.5, cursor: 'pointer'}}>
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
