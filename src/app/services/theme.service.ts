import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'employee_dashboard_theme';

    isDarkMode = signal<boolean>(this.loadTheme());

    constructor() {
        // Effect to apply theme changes to DOM
        effect(() => {
            const isDark = this.isDarkMode();
            document.documentElement.classList.toggle('dark-theme', isDark);
            localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
        });
    }

    private loadTheme(): boolean {
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    toggleTheme(): void {
        this.isDarkMode.update(current => !current);
    }
}
