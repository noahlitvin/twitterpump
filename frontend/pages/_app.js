import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import Fonts from "./fonts"
import theme from "./theme"
import './transition.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <ColorModeScript initialColorMode="dark" />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
