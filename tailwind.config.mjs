/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'white-light': 'var(--white-light)',
				'white-dark': 'var(--white-dark)',
				'black-light': 'var(--black-light)',
				'black-dark': 'var(--black-dark)',
				'black-dim': 'var(--black-dim)',
				green: 'var(--green)',
				red: 'var(--red)',
				yellow: 'var(--yellow)',
				'blue-light': 'var(--blue-light)',
				'blue-dark': 'var(--blue-dark)',
				'blue-dim': 'var(--blue-dim)',
				'gray-light': 'var(--gray-light)'
			},
			screens: {
				xs: '320px',
				sm: '425px',
				md: '768px',
				lg: '992px',
				xlg: '1200px',
				'2xlg': '1440px'
			},
			fontSize: {
				"sm":'0.75rem',//12px
				"sm-1":'0.875rem',//14px
				"base":'1rem',//16px
				"base-1":'1.125rem',//18px
				"base-2":'1.25rem',//20px
				"medium":'1.375rem',//22px
				"medium-1":'1.5rem',//24px
				"large":'2.25rem',//36px
				"xlarge":'3.75rem'//60px
			},
			boxShadow: {
				'base': '0px 0px 15px -5px var(--black-light)'
			}
		},
	},
	plugins: [],
}
