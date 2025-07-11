/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: '#8B5A2B',
                secondary: '#D2B48C',
                board: '#DEB887',
                black: '#000000',
                white: '#FFFFFF',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
};
