/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*html", "./dist/*html", "./dist/*js"],
  theme: {

    extend: {
      fontFamily: {
        "inter": "'Inter', serif",
        "robotoCondensed": "'Roboto Condensed', sans-serif"
      },
      backgroundImage: {
        headerimg: "url(../images/background.jpg)"
      },
      backgroundPosition: {
        headerImgPos: "0% 25%",
        headerImgPosMd: "0 80%"
      },
      dropShadow: {
        watchlist: "2px 2px #00000084",
      },
      gridTemplateColumns: {
        "four": "1fr 16px repeat(3, 1fr)",
        "posters": "repeat(auto-fit, minmax(50px, 50px)"
      },
      animation: {
        "upArrow": "upArrow .7s ease alternate infinite",
        "leftPreload": "leftPreload 1.2s linear alternate infinite",
        "rightPreload": "rightPreload 1.2s linear alternate infinite",
        "leftPreloadMd": "leftPreloadMd 1.2s linear alternate infinite",
        "rightPreloadMd": "rightPreloadMd 1.2s linear alternate infinite"
      },
      keyframes: {
        "upArrow": {
          "0%": {transform: 'translateY(0)'},
          "0%": {transform: 'translateY(4px)'},
        }, 
        "leftPreload": {
          "0%": {transform: 'translateX(0)'},
          "100%": {transform: 'translateX(40px)'}
        },
        "rightPreload": {
          "0%": {transform: 'translateX(0)'},
          "100%": {transform: 'translateX(-40px)'}
        },
        "leftPreloadMd": {
          "0%": {transform: 'translateX(0)'},
          "100%": {transform: 'translateX(80px)'}
        },
        "rightPreloadMd": {
          "0%": {transform: 'translateX(0)'},
          "100%": {transform: 'translateX(-80px)'}
        }
      }
    },
  },
  plugins: [],
}

