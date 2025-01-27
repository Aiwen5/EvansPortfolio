import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: '#E5E1E6', // Pantone 663 C
				},
				primaryAccent: {
					DEFAULT: '#10312B', // Pantone 627 C
					card: 'rgba(16, 49, 43, 0.1)', // 10% opacity of primary accent
				},
				secondaryAccent: {
					DEFAULT: '#EFC2B3', // Pantone 489 C
				},
			},
			fontFamily: {
				bricolage: ['Bricolage Grotesque', 'sans-serif'],
				ptSans: ['PT Sans', 'sans-serif'],
			},
		},
	},

	plugins: [typography, forms, containerQueries],
} satisfies Config;