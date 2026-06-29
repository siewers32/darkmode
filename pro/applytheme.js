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

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'system';
    darkIcon = document.getElementById('svg-dark');
    lightIcon = document.getElementById('svg-light');

    let newTheme;


    if (currentTheme === 'light') {
        newTheme = 'dark';
        console.log('Switching to dark theme');
        lightIcon.classList.add('svg-icon-hidden');
        darkIcon.classList.remove('svg-icon-hidden');
        darkIcon.classList.add('svg-icon-visible');
    } else if (currentTheme === 'dark') {
        newTheme = 'light';
        darkIcon.classList.add('svg-icon-hidden');
        lightIcon.classList.remove('svg-icon-hidden');
        lightIcon.classList.add('svg-icon-visible');
    } else {
        // Als het systeemthema wordt gebruikt, schakelen we naar donker als voorbeeld
        newTheme = 'dark';
    }

    setTheme(newTheme);
}

// Voer dit uit zodra de pagina laadt
applyTheme();