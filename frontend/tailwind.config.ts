import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#104674',
                    light: '#1a5a96',
                    dark:  '#0b3055',
                },
                secondary: {
                    DEFAULT: '#d8202a',
                    light: '#e8404a',
                    dark:  '#b01820',
                },
            },
        },
    },
    plugins: [],
}
export default config
