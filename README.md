# SolarSim 🌌

SolarSim is an interactive solar system simulation that allows users to explore planets, edit their properties, and visualize their orbits. The project includes features like zooming, panning, responsive design, and real-world scaling of planetary data.

---

## Features 🚀

SolarSim includes the following core features:

1. **Central Star Visualization**: The Sun is displayed as the focal point of the simulation.
2. **Multiple Planets**: All 8 planets are rendered, each with unique colors, sizes, and orbits.
3. **Scaled Orbit Paths**: Elliptical or circular orbit paths are drawn with distances scaled proportionally according to their eccentricity.
4. **Animated Orbits**: Planets revolve smoothly around the Sun with realistic orbital speeds.
5. **Planet Details on Hover/Click**: Hover over or click on a planet to view its details, such as name, distance, radius, and orbital period.
6. **Zoom & Pan Functionality**: Use your mouse or touch gestures to zoom in/out and pan across the simulation area.
7. **Responsive Design**: The UI adapts gracefully to desktop, tablet, and mobile screens.
8. **Pause/Play Simulation**: Controls are provided to pause and resume the orbital animations.

### Bonus Features 🌟

1. **Add/Remove Planets**: Dynamically add or remove planets from the simulation using the Planet Manager.
2. **Custom Planet Editor**: Edit planet properties (e.g., color, size, orbital speed) live through an intuitive interface.
3. **Orbit Trail Effects**: Display trailing paths behind moving planets for a visually appealing effect.
4. **Accessibility Enhancements**: Improved keyboard navigation and ARIA support for better usability.

> **Note**: A dark/light theme toggle is not included, as it does not suit the solar system simulation's visual aesthetic.

---

## Setup Instructions 🛠️

Follow these steps to set up and run the project locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/solarsim.git
   cd solarsim
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
4. Open your browser and go to `http://localhost:3000` to view the simulation.

---

## Usage Guide 📚

Learn how to use SolarSim effectively:

1. **Exploring Planets**: Click on any planet to view its details and orbit.
2. **Editing Properties**: Use the controls to modify a planet's distance, radius, and orbital period. Default values are earth's values to get a reference
3. **Zooming and Panning**: Use your mouse or touch gestures to zoom in/out and pan across the simulation area.
4. **Responsive Interaction**: The interface adapts to your device, ensuring a seamless experience on desktop, tablet, or mobile.

---

## Contributing 🤝

We welcome contributions to SolarSim! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

### **Dependencies Section**
The **Dependencies** section lists the key libraries and tools used in the project. If you want to include specific versions, you can extract them from your [package.json](http://_vscodecontentref_/1) file.

For example:
```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1",
  "@mui/icons-material": "^5.11.0",
  "react-zoom-pan-pinch": "^2.1.3",
  "prop-types": "^15.8.1"
}
```

---

## Contact 📫

For questions, suggestions, or feedback, please contact:

- Atharv Tambekar - [atharvtambekar28@gmail.com](mailto:atharvtambekar28@gmail.com)
- GitHub: [Atharv-28](https://github.com/Atharv-28)

---

Enjoy exploring the wonders of the solar system with SolarSim! 🌟
