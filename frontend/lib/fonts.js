import "@fontsource/inter"
import { Global } from "@emotion/react"

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Bergen Mono';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/BergenMono-Bold.otf') format('otf');
      }
      /* latin */
      @font-face {
        font-family: 'Bergen Mono';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/BergenMono-Regular.otf') format('otf');
      }
      `}
  />
)

export default Fonts