module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'sans': ['Roboto', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#37d662',
                },
                dark: {
                    DEFAULT: '#13171d',
                    foreground: '#232a3a',
                },
            },
        },
    },
    variants: {
        extend: {
            scale: ['group-hover'],
        },
    },
    plugins: [],
}
