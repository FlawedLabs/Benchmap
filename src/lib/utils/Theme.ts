// WIP
export const setTheme = (theme: 'light' | 'dark' | 'system') => {
	if (theme === 'system') {
		localStorage.removeItem('theme');
	} else {
		localStorage.theme = theme;
	}

	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const effectiveTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

	document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
};
