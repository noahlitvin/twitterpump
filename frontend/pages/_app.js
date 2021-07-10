import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import Fonts from "../lib/fonts"
import theme from "../lib/theme"
import '../lib/transition.css'

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
