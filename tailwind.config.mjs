/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
        'charade': {
					'50': '#f5f7fa',
					'100': '#ebeef3',
					'200': '#d2dae5',
					'300': '#aab8cf',
					'400': '#7c93b4',
					'500': '#5b769c',
					'600': '#485e81',
					'700': '#3b4c69',
					'800': '#344258',
					'900': '#2f394b',
					'950': '#1f2532',
				},
      },
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
}


