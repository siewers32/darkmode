class DarkMode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    // 1. Haal de externe CSS op via een standaard fetch
    // Tip: Gebruik import.meta.url om het pad relatief te maken aan DIT script
    const cssPath = new URL('./dark-mode.css', import.meta.url).href;
    
    try {
      const response = await fetch(cssPath);
      const cssText = await response.text();

      // 2. Maak een CSSStyleSheet aan en koppel het aan de Shadow DOM
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(cssText);
      this.shadowRoot.adoptedStyleSheets = [sheet];
    } catch (error) {
      console.error("Kan CSS niet laden:", error);
    }


    // 3. Bouw hierna pas je HTML op
    this.render();

    const rootElement = document.documentElement;
    const button = this.shadowRoot.querySelector('#theme-toggle');
    const savedTheme = localStorage.getItem('theme');
     
    if (savedTheme === 'dark') {
      rootElement.classList.add('dark-mode');
      button.classList.add('dark-mode');
    }

    button.addEventListener('click', () => {
      rootElement.classList.toggle('dark-mode');
      button.classList.toggle('dark-mode');
    //   button.style.border = '10px solid blue';
      localStorage.setItem('theme', rootElement.classList.contains('dark-mode') ? 'dark' : 'light');
    });


  }

  render() {
    const button = document.createElement('button');
    button.id = 'theme-toggle';

    button.innerHTML = `
      <svg id="theme-icon" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <circle id="sun-moon-core" class="sun-moon-core" cx="12" cy="12" r="5" />
        
        <g id="sun-beams" class="sun-beams" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
        
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle id="moon-bite" class="moon-bite" cx="24" cy="4" r="5" fill="black" />
        </mask>
      </svg>
    `;

    this.shadowRoot.appendChild(button);
  }

}

customElements.define('dark-mode', DarkMode);