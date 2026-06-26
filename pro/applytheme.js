// 1. Functie om het juiste thema toe te passen
function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'system';
    const htmlElement = document.documentElement;

    if (savedTheme === 'system') {
        // Verwijder handmatige override, CSS prefers-color-scheme neemt het over
        htmlElement.removeAttribute('data-theme');
    } else {
        // Dwing 'light' of 'dark' af
        htmlElement.setAttribute('data-theme', savedTheme);
    }
}

// 2. Functie om te schakelen (bijvoorbeeld gekoppeld aan je knop)
function setTheme(newTheme) {
    // newTheme kan zijn: 'light', 'dark' of 'system'
    localStorage.setItem('theme', newTheme);
    applyTheme();
}

// Voer dit uit zodra de pagina laadt
applyTheme();