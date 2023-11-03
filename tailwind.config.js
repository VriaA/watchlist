/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
            "./*html",
            "./dist/*html",
            "./dist/*js",
            "./dist/components/*js", 
            "./dist/page-templates/*js",
            "./dist/utils/*js"
          ],
  theme: {

    extend: {
      animation: {
        "leftPreload": "leftPreload 1.2s linear alternate infinite",
        "rightPreload": "rightPreload 1.2s linear alternate infinite",
        "leftPreloadMd": "leftPreloadMd 1.2s linear alternate infinite",
        "rightPreloadMd": "rightPreloadMd 1.2s linear alternate infinite"
      },
      backgroundImage: {
        homeImg: "url(../images/background.webp)",
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
          "0%": {transform: 'translateX(-25px)', zIndex: '100'},
          "99%": {zIndex: '51'},
          "100%": {transform: 'translateX(25px)', zIndex: '51'}
        },
        "rightPreload": {
          "0%": {transform: 'translateX(25px)', zIndex: '52'},
          "99%": {zIndex: '100'},
          "100%": {transform: 'translateX(-25px)', zIndex: '100'}
        },
        "leftPreloadMd": {
          "0%": {transform: 'translateX(-45px)', zIndex: '100'},
          "99%": {zIndex: '51'},
          "100%": {transform: 'translateX(45px)', zIndex: '51'}
        },
        "rightPreloadMd": {
          "0%": {transform: 'translateX(45px)', zIndex: '52'},
          "99%": {zIndex: '100'},
          "100%": {transform: 'translateX(-45px)', zIndex: '100'}
        }
      }
    },
  },
  plugins: [],
}