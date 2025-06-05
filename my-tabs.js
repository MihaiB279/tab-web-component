const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: sans-serif;
    }
    .tab-header {
      display: flex;
      border-bottom: 2px solid #ccc;
      cursor: pointer;
    }
    .tab-button {
      padding: 10px 20px;
      background: var(--tab-bg, hsl(0, 0%, 100%));
      border: none;
      border-right: 1px solid #ddd;
      transition: background-color 0.3s ease, color 0.3s ease,
                  border-bottom-color 0.3s ease, box-shadow 0.3s ease,
                  transform 0.3s ease;
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5em;
    }
    .tab-button.active {
      background: var(--active-bg, #fff);
      font-weight: bold;
      border-bottom: 2px solid var(--active-color, #007BFF);
      color: var(--active-color, #007BFF);
      box-shadow: inset 0 -4px 8px -4px var(--active-color, #007BFF);
      transform: scale(1.05);
    }
    .tab-button img {
      height: 16px;
      width: 16px;
    }
    ::slotted(my-tab) {
      display: none;
      padding: 1em;
      border: 1px solid #ccc;
      border-top: none;
      animation: fadeIn 0.3s ease;
      box-sizing: border-box;
      display: block; /* needed for some browsers */
    }
    ::slotted(my-tab:not(.active)) {
      display: none;
    }
    ::slotted(my-tab.active) {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>

  <div class="tab-header"></div>
  <slot></slot>
`;

class MyTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.tabs = Array.from(this.children).filter(
      (el) => el.tagName.toLowerCase() === 'my-tab'
    );
    this.header = this.shadowRoot.querySelector('.tab-header');

    this.tabs.forEach((tab, index) => {
      const label = tab.getAttribute('label') || `Tab ${index + 1}`;
      const iconSrc = tab.getAttribute('icon');

      const btn = document.createElement('button');
      btn.classList.add('tab-button');
      btn.setAttribute('type', 'button');

      if (iconSrc) {
        const icon = document.createElement('img');
        icon.src = iconSrc;
        icon.alt = label;
        btn.appendChild(icon);
      }

      const span = document.createElement('span');
      span.textContent = label;
      btn.appendChild(span);

      btn.addEventListener('click', () => this.selectTab(index));
      this.header.appendChild(btn);
    });

    this.selectTab(0);
  }

  selectTab(index) {
    const buttons = this.shadowRoot.querySelectorAll('.tab-button');
    buttons.forEach((btn) => btn.classList.remove('active'));
    buttons[index].classList.add('active');

    this.tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });
  }
}

class MyTab extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('my-tabs', MyTabs);
customElements.define('my-tab', MyTab);
