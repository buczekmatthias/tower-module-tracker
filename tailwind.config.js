/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts}'],
	theme: {
		extend: {
			minHeight: { screen: ['100vh', '100dvh'] }
		}
	},
	plugins: [],
};