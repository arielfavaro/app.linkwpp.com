module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'sans': ['Poppins', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#37d662',
                    dark: '#2eb352',
                },
                dark: {
                    DEFAULT: '#13171d',
                    foreground: '#232a3a',
                },
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '.75rem',
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
