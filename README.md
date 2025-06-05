I’ve created a custom tab system. It employs encapsulation via Shadow DOM, dynamic slotting of content, and rich interactivity through custom HTML elements: <my-tabs> and <my-tab>.
Technologies
For this project I’ve used following technologies:
- HTML5
- JavaScript
- CSS Variables and Transitions

Structure of the project
_index.html_
The entry point of the application showcasing usage of the custom tab component.
**Key Features:**
- Includes the custom element <my-tabs>, which wraps multiple <my-tab> elements.
- Each <my-tab> includes:
  -	A label attribute to display the tab title.
  -	An icon attribute for tab icons.
  -	Content inside the tag that will be shown when the tab is active.

Code example:
```
<my-tabs style="--active-color: #60af4c;">
    <my-tab label="Home" icon="icons/home.svg">
      <h2>Welcome Home</h2>
      <p>This is the home page with some text.</p>
    </my-tab>
</my-tabs>
```

_my-tabs.js_
This file defines two custom elements:
- <my-tabs>: The container for tab buttons and tab content.
- <my-tab>: The slotted content for each tab.
The <my-tabs> component creates a tabbed interface using the Shadow DOM to encapsulate its
internal structure and styles. Tab buttons are generated dynamically based on the nested <my-tab>
elements provided in the HTML. When a tab is clicked, the corresponding content is shown, 
and the rest are hidden. The component uses CSS variables for customizable styling and slot elements
to allow external content to be inserted inside each tab. This makes the component reusable, modular, and easy to integrate into any web page.

**Core Logic:**
- Dynamically creates tab buttons based on child <my-tab> elements.
- Handles active tab switching via JavaScript.
- Applies styling using Shadow DOM and CSS variables.
Code example:
Manages class toggling for content visibility
```
  selectTab(index) {
    const buttons = this.shadowRoot.querySelectorAll('.tab-button');
    buttons.forEach((btn) => btn.classList.remove('active'));
    buttons[index].classList.add('active');

    this.tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });
  }
```

**Styling**
Main Style Features:
- Responsive tab header with flexbox.
- Smooth transitions and animations.
- Uses CSS custom properties for theme customization.
You can customize tab appearance using CSS variables:
- --active-color: Accent color for the active tab.
- --active-bg: Background color of the active tab.
- --tab-bg: Background color of inactive tabs.
Code example:
```
<my-tabs style="--active-color: #60af4c;">
```

This custom tab system offers a reusable and flexible way to display any type of content
in a clean, interactive layout. Its use of Web Components ensures encapsulation, customization, and ease of integration into any web page.


