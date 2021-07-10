import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "Bergen Mono",
    body: "Inter",
  },
  colors: {
    brand: {
      500: "#1DA1F2",
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "Bergen Mono",
        fontWeight: "normal",
        textTransform: "uppercase",
      }
    },
    Button: {
      baseStyle: {
        fontFamily: "Bergen Mono",
        fontWeight: "normal",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
      }
    }
  }
})

export default theme