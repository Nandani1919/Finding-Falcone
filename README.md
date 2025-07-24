# Finding Falcone

A web application to help King Shan find Queen Al Falcone in the distant galaxy of Tara B. This project is a solution to the Geektrust coding challenge.

## 📖 Problem Statement

Queen Al Falcone is in hiding after the war with planet Falicornia. King Shan has intelligence that she's hiding in one of 6 planets: **DonLon**, **Enchai**, **Jebing**, **Sapir**, **Lerbin**, and **Pingasor**. However, he can only send his army to search 4 planets at a time due to limited resources.

Your mission: Help King Shan select 4 planets and appropriate vehicles to find Queen Al Falcone!

---

## 🚀 Live Preview

👉 https://chimerical-gingersnap-ebd9f9.netlify.app/

---

## 🚀 Features

- **Planet Selection**: Choose 4 out of 6 available planets to search
- **Vehicle Assignment**: Select appropriate vehicles based on distance and availability
- **Time Calculation**: Calculate total mission time based on distance and vehicle speed
- **Mission Results**: Get success/failure results from the FindFalcone API
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Proper validation and error messages

## 🛠️ Technologies Used

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: HTML5 & CSS3
- **API Calls**: Fetch API
- **No Build Tools**: Pure web technologies, no frameworks or bundlers required

## 🌐 API Endpoints

The application uses the following Geektrust APIs:

- **Planets API**: `GET https://findfalcone.geektrust.com/planets`
- **Vehicles API**: `GET https://findfalcone.geektrust.com/vehicles`  
- **Token API**: `POST https://findfalcone.geektrust.com/token`
- **Find Falcone API**: `POST https://findfalcone.geektrust.com/find`

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/finding-falcone.git
   cd finding-falcone
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have it installed)
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the application**
   ```
   http://localhost:8000
   ```

**No build process required!** This is a pure HTML/CSS/JavaScript application.

## 🎮 How to Play

1. **Select Destinations**: Choose 4 different planets from the available options
2. **Choose Vehicles**: For each selected planet, pick a vehicle that can reach the destination
3. **Review Mission**: Check the total time required for the mission
4. **Launch Mission**: Submit your selection and see if you found Queen Al Falcone!

## 📋 Game Rules

- You must select exactly 4 planets
- Each vehicle can only be used once
- Vehicles have maximum range limits - they can't travel to planets beyond their range
- Mission time = Distance ÷ Vehicle Speed (for each planet-vehicle combination)
- Success depends on whether Al Falcone is hiding in one of your selected planets

## 🏗️ Project Structure

```
finding-falcone/
├── index.html          # Main HTML file
├── css/
│   ├── style.css       # Main stylesheet
│   └── responsive.css  # Media queries (if separate)
├── js/
│   ├── app.js          # Main application logic
│   ├── api.js          # API service functions
│   └── utils.js        # Utility functions
├── images/             # Image assets (if any)
├── README.md
└── .gitignore
```

## 🧪 Testing

Since this is a vanilla JavaScript project, testing can be done by:
- Manual testing in different browsers
- Testing API integrations with browser developer tools
- Validating responsive design across devices

For unit testing, you could integrate testing frameworks like Jest or Mocha if needed.

## 📱 Screenshots

<img width="375" alt="Falcon" src="https://github.com/Nandani1919/Finding-Falcone/blob/3b384cee3f21bcd2a94433d3229633dc230acc25/Screenshot%202025-07-02%20121353.png">

## 🌟 Key Implementation Highlights

- **Pure JavaScript**: No frameworks or libraries - demonstrates strong vanilla JS skills
- **Modern ES6+ Features**: Arrow functions, async/await, destructuring, template literals
- **DOM Manipulation**: Efficient and clean DOM interactions
- **API Integration**: Proper error handling and loading states with Fetch API
- **Validation Logic**: Client-side validation for planet-vehicle combinations
- **Responsive Design**: CSS Grid/Flexbox for mobile-friendly layout
- **Clean Code Structure**: Well-organized, readable, and maintainable vanilla JavaScript

## 🚀 Deployment

The application can be easily deployed to any static hosting service since it's pure HTML/CSS/JavaScript:

**Easy deployment options:**
- **GitHub Pages**: Automatic deployment from your repository
- **Netlify**: Drag and drop your project folder
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Surge.sh**: Simple command-line deployment

**To deploy:**
1. Simply upload all your files to any web server
2. Ensure `index.html` is in the root directory
3. No build process required!

Live demo: [Add your deployment URL here]

## 🤝 Contributing

This is a coding challenge solution, but feel free to fork and experiment!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Geektrust** for the interesting coding challenge
- **King Shan** for trusting us with this important mission
- The galaxy of **Tara B** for the adventure!

---

*Built with ❤️ for the Geektrust coding challenge*
