import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: {
        100: '#FFFBE6',
        200: '#FFF6CC',
        300: '#FFED99',
        400: '#FFE361',
        500: '#FFD200',
        600: '#CCA800',
        700: '#997E00',
        800: '#665400',
        900: '#4D3F00'
      },
      secondary: {
        100: '#EAEDFF',
        200: '#D5DBFF',
        300: '#C0C9FF',
        400: '#8193FF',
        500: '#2D4BFF',
        600: '#243CCC',
        700: '#1B2D99',
        800: '#121E66',
        900: '#090F33'
      },
      tertiary: {
        100: '#E8E0F8',
        200: '#D5CCE9',
        300: '#C3B7D9',
        400: '#B0A3CA',
        500: '#9D8EBB',
        600: '#78669C',
        700: '#523D7E',
        800: '#2D145F',
        900: '#1A0B36'
      },
      neutral: {
        100: '#FFFFFF',
        125: '#FAFAFA',
        150: '#F6F6F6',
        200: '#F3F3F3',
        300: '#E7E7E7',
        400: '#DCDCDC',
        500: '#C4C4C4',
        600: '#919191',
        700: '#4E4E4E',
        900: '#000000'
      },
      warning: {
        100: '#FCE7E9',
        200: '#F8CFD3',
        300: '#F1A0A7',
        400: '#EB707A',
        500: '#DD1122',
        600: '#B10E1B',
        700: '#850A14'
      },
      success: {
        100: '#EEFAF0',
        500: '#53CC67',
        800: '#193D1F'
      },
      alert: {
        500: '#F5CB2F'
      },
      statistics: {
        0: '#2D4BFF',
        1: '#5A41A5',
        2: '#FFD200',
        3: '#EC813A',
        4: '#BFD63C',
        5: '#9C54B7',
        6: '#C17E8A',
        7: '#918D7F',
        8: '#D7BD2D',
        9: '#35D1CF',
        10: '#D1A078',
        11: '#7EB3E8',
        12: '#57DF9C',
        13: '#D19C96',
        14: '#9F96C5'
      }
    },
    extend: {
      fontFamily: {
        sans: '"Helvetica Neue", helvetica, arial, "Lucida Grande", sans-serif'
      },
      dropShadow: {
        xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        sm: ['0px 1px 3px rgba(16, 24, 40, 0.1)', '0px 1px 2px -1px rgba(16, 24, 40, 0.1)'],
        md: ['0px 4px 6px -1px rgba(16, 24, 40, 0.1)', '0px 2px 4px -2px rgba(16, 24, 40, 0.1)'],
        lg: ['0px 10px 15px -3px rgba(16, 24, 40, 0.1)', '0px 4px 6px -4px rgba(16, 24, 40, 0.1)'],
        xl: ['0px 20px 25px -5px rgba(16, 24, 40, 0.1)', '0px 8px 10px -6px rgba(16, 24, 40, 0.1)'],
        '2xl': '0px 25px 50px -12px rgba(16, 24, 40, 0.25)'
      },
      keyframes: {
        makeVisible: {
          '0%': {
            visibility: 'hidden'
          },
          '100%': {
            visibility: 'visible'
          }
        }
      },
      animation: {
        appear: 'makeVisible 0ms linear 200ms forwards'
      },
      borderColor: {
        DEFAULT: '#DCDCDC'
      }
    }
  },
  plugins: []
};

export default config;