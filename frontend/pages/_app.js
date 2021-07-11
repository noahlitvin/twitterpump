import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "../lib/theme"
import "@fontsource/inter"
import '../lib/styles.css'
import '../public/fonts/index.css'

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
      <ColorModeScript initialColorMode="dark" />
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  )
}

export default MyApp
