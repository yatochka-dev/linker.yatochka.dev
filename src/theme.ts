
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "2px",
		"--theme-border-base": "0px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "var(--color-surface-900)",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #ededed
		"--color-primary-50": "252 252 252", // #fcfcfc
		"--color-primary-100": "251 251 251", // #fbfbfb
		"--color-primary-200": "251 251 251", // #fbfbfb
		"--color-primary-300": "248 248 248", // #f8f8f8
		"--color-primary-400": "242 242 242", // #f2f2f2
		"--color-primary-500": "237 237 237", // #ededed
		"--color-primary-600": "213 213 213", // #d5d5d5
		"--color-primary-700": "178 178 178", // #b2b2b2
		"--color-primary-800": "142 142 142", // #8e8e8e
		"--color-primary-900": "116 116 116", // #747474
		// secondary | #5dadd5
		"--color-secondary-50": "231 243 249", // #e7f3f9
		"--color-secondary-100": "223 239 247", // #dfeff7
		"--color-secondary-200": "215 235 245", // #d7ebf5
		"--color-secondary-300": "190 222 238", // #bedeee
		"--color-secondary-400": "142 198 226", // #8ec6e2
		"--color-secondary-500": "93 173 213", // #5dadd5
		"--color-secondary-600": "84 156 192", // #549cc0
		"--color-secondary-700": "70 130 160", // #4682a0
		"--color-secondary-800": "56 104 128", // #386880
		"--color-secondary-900": "46 85 104", // #2e5568
		// tertiary | #c65bc8
		"--color-tertiary-50": "246 230 247", // #f6e6f7
		"--color-tertiary-100": "244 222 244", // #f4def4
		"--color-tertiary-200": "241 214 241", // #f1d6f1
		"--color-tertiary-300": "232 189 233", // #e8bde9
		"--color-tertiary-400": "215 140 217", // #d78cd9
		"--color-tertiary-500": "198 91 200", // #c65bc8
		"--color-tertiary-600": "178 82 180", // #b252b4
		"--color-tertiary-700": "149 68 150", // #954496
		"--color-tertiary-800": "119 55 120", // #773778
		"--color-tertiary-900": "97 45 98", // #612d62
		// success | #34ea7a
		"--color-success-50": "225 252 235", // #e1fceb
		"--color-success-100": "214 251 228", // #d6fbe4
		"--color-success-200": "204 250 222", // #ccfade
		"--color-success-300": "174 247 202", // #aef7ca
		"--color-success-400": "113 240 162", // #71f0a2
		"--color-success-500": "52 234 122", // #34ea7a
		"--color-success-600": "47 211 110", // #2fd36e
		"--color-success-700": "39 176 92", // #27b05c
		"--color-success-800": "31 140 73", // #1f8c49
		"--color-success-900": "25 115 60", // #19733c
		// warning | #d0d22d
		"--color-warning-50": "248 248 224", // #f8f8e0
		"--color-warning-100": "246 246 213", // #f6f6d5
		"--color-warning-200": "243 244 203", // #f3f4cb
		"--color-warning-300": "236 237 171", // #ecedab
		"--color-warning-400": "222 224 108", // #dee06c
		"--color-warning-500": "208 210 45", // #d0d22d
		"--color-warning-600": "187 189 41", // #bbbd29
		"--color-warning-700": "156 158 34", // #9c9e22
		"--color-warning-800": "125 126 27", // #7d7e1b
		"--color-warning-900": "102 103 22", // #666716
		// error | #ff4529
		"--color-error-50": "255 227 223", // #ffe3df
		"--color-error-100": "255 218 212", // #ffdad4
		"--color-error-200": "255 209 202", // #ffd1ca
		"--color-error-300": "255 181 169", // #ffb5a9
		"--color-error-400": "255 125 105", // #ff7d69
		"--color-error-500": "255 69 41", // #ff4529
		"--color-error-600": "230 62 37", // #e63e25
		"--color-error-700": "191 52 31", // #bf341f
		"--color-error-800": "153 41 25", // #992919
		"--color-error-900": "125 34 20", // #7d2214
		// surface | #0d120c
		"--color-surface-50": "219 219 219", // #dbdbdb
		"--color-surface-100": "207 208 206", // #cfd0ce
		"--color-surface-200": "195 196 194", // #c3c4c2
		"--color-surface-300": "158 160 158", // #9ea09e
		"--color-surface-400": "86 89 85", // #565955
		"--color-surface-500": "13 18 12", // #0d120c
		"--color-surface-600": "12 16 11", // #0c100b
		"--color-surface-700": "10 14 9", // #0a0e09
		"--color-surface-800": "8 11 7", // #080b07
		"--color-surface-900": "6 9 6", // #060906

	}
}