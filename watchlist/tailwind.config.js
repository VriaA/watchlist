/** @type {import('tailwindcss').Config} */
export default{
  content: ["./*.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "leftPreload": "leftPreload .7s linear alternate infinite",
        "rightPreload": "rightPreload .7s linear alternate infinite",
        "leftPreloadMd": "leftPreloadMd .8s linear alternate infinite",
        "rightPreloadMd": "rightPreloadMd .8s linear alternate infinite"
      },

      backgroundImage: {
        homeImg: "url(./assets/images/background.webp)",
      },

      backgroundPosition: {
        wrapperImgPosition: "0% 25%",
        wrapperImgPositionMd: "0 80%",
        filmCntrImgPosition: "55% 50%",
        filmCntrImgPositionMd: "60% 28%",
        filmBackdropPosition: "50% 0%"
      },

      boxShadow: {
        addButton: "0 0 20px #991b1b",
        addButtonHover: "0 0 20px #232327e8"
      },

      dropShadow: {
        watchlist: "2px 2px #00000084",
        blackOutline: "-0px 0px 1px #000000"
      },

      fontFamily: {
        "inter": "'Inter', serif",
        "robotoCondensed": "'Roboto Condensed', sans-serif",
        "cormorantGaramond": "'Cormorant Garamond', serif"
      },
      
      keyframes: {
        "leftPreload": {
          "0%": {transform: 'translateX(-15px)', zIndex: '100'},
          "99%": {zIndex: '51'},
          "100%": {transform: 'translateX(50px)', zIndex: '51'}
        },
        "rightPreload": {
          "0%": {transform: 'translateX(15px)', zIndex: '52'},
          "99%": {zIndex: '100'},
          "100%": {transform: 'translateX(-50px)', zIndex: '100'}
        },
        "leftPreloadMd": {
          "0%": {transform: 'translateX(-30px)', zIndex: '100'},
          "99%": {zIndex: '51'},
          "100%": {transform: 'translateX(90px)', zIndex: '51'}
        },
        "rightPreloadMd": {
          "0%": {transform: 'translateX(30px)', zIndex: '52'},
          "99%": {zIndex: '100'},
          "100%": {transform: 'translateX(-90px)', zIndex: '100'}
        }
      }
    },
  },
  plugins: [],
  dev: `npx tailwindcss -i ./src/input.css -o ./src/output.css --watch`
}

