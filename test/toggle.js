const toggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement; // Dit is de <html> tag

// Check of de gebruiker al eerder dark mode heeft gekozen
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  rootElement.classList.add('dark-mode');
}

toggleBtn.addEventListener('click', () => {
  // Toggle de class
  rootElement.classList.toggle('dark-mode');
  
  // Sla de keuze op in localStorage
  if (rootElement.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});