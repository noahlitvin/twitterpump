import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import Fonts from "../lib/fonts"
import theme from "../lib/theme"
import '../lib/styles.css'

if (typeof window !== "undefined") {
  window.addEventListener('load', (event) => {
    document.body.classList.add("loaded");
  });
}

function MyApp({ Component, pageProps }) {
  return (
    <>
    <div id="scrim" />
    <ChakraProvider theme={theme}>
      <Fonts />
      <ColorModeScript initialColorMode="dark" />
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  )
}

export default MyApp
