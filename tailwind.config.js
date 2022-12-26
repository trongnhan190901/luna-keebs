/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        fontFamily: {
            primary: 'Nunito, sans-serif',
            secondary: 'League Spartan, sans-serif',
            tertiary: 'Spectral, san-serif',
            title: 'Dancing Script, san-serif',
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
