import { useState, useEffect } from "react";
import {
  alternateCase1,
  alternateCase2,
  camelCase,
  constantCase,
  dotCase,
  invertCase,
  kebabCase,
  lowerCase,
  noCase,
  pascalCase,
  pascalSnakeCase,
  pathCase,
  reverseTitleCase,
  sentenceCase,
  snakeCase,
  spongeCase,
  titleCase,
  toggleCase,
  trainCase,
  upperCase,
} from "case-string";

function App() {
  const [originalText, setOriginalText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true"; // Default to false if not set
  });

  const methods = [
    { name: "Alternate Case 1", method: alternateCase1 },
    { name: "Alternate Case 2", method: alternateCase2 },
    { name: "Camel Case", method: camelCase },
    { name: "Constant Case", method: constantCase },
    { name: "Dot Case", method: dotCase },
    { name: "Invert Case", method: invertCase },
    { name: "Kebab Case", method: kebabCase },
    { name: "Lower Case", method: lowerCase },
    { name: "No Case", method: noCase },
    { name: "Pascal Case", method: pascalCase },
    { name: "Pascal Snake Case", method: pascalSnakeCase },
    { name: "Path Case", method: pathCase },
    { name: "Reverse Title Case", method: reverseTitleCase },
    { name: "Sentence Case", method: sentenceCase },
    { name: "Snake Case", method: snakeCase },
    { name: "Sponge Case", method: spongeCase },
    { name: "Title Case", method: titleCase },
    { name: "Toggle Case", method: toggleCase },
    { name: "Train Case", method: trainCase },
    { name: "Upper Case", method: upperCase },
  ];

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setOriginalText(newText);
    if (selectedMethod) {
      try {
        setConvertedText(selectedMethod.method(newText));
      } catch (error) {
        console.error("Error processing text:", error);
        setConvertedText("Error processing text.");
      }
    }
  };

  const handleButtonClick = (method) => {
    setSelectedMethod(method);
    try {
      setConvertedText(method.method(originalText));
    } catch (error) {
      console.error("Error processing text:", error);
      setConvertedText("Error processing text.");
    }
  };

  const handleReset = () => {
    setOriginalText("");
    setConvertedText("");
    setSelectedMethod(null);
  };

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-colors duration-500 ease-in-out ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-100 to-blue-300"
      }`}
    >
      <div
        className={`p-6 max-w-4xl w-full bg-${
          darkMode ? "gray-800" : "white"
        } rounded-lg shadow-lg ${
          darkMode ? "text-white" : "text-gray-800"
        } transition-colors duration-500 ease-in-out`}
      >
        <h1 className="text-4xl font-extrabold text-center mb-4">
          Case Converter Magic
        </h1>
        <p className="text-lg text-center mb-6">
          Transform your text into various cases with just a click!
        </p>
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center cursor-pointer">
            <span className="mr-3 text-sm font-medium">Dark Mode</span>
            <div
              className={`relative inline-block w-14 h-8 transition duration-300 ease-in-out rounded-full ${
                darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
              onClick={toggleDarkMode}
              role="switch"
              aria-checked={darkMode}
              aria-label="Toggle Dark Mode"
              tabIndex="0"
              onKeyPress={(e) => e.key === "Enter" && toggleDarkMode()}
            >
              <div
                className={`absolute w-7 h-7 bg-white rounded-full transition-transform duration-300 ease-in-out transform ${
                  darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <input
            type="text"
            value={originalText}
            onChange={handleInputChange}
            className={`border-2 border-${
              darkMode ? "gray-600" : "gray-400"
            } rounded-lg p-3 flex-1 ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter text here"
            aria-label="Original text input"
          />
          <input
            type="text"
            value={convertedText}
            readOnly
            className={`border-2 border-${
              darkMode ? "gray-600" : "gray-400"
            } rounded-lg p-3 flex-1 ${
              darkMode ? "bg-gray-600 text-white" : "bg-gray-100 text-black"
            } focus:outline-none`}
            placeholder="Converted text"
            aria-label="Converted text output"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {methods.map((method) => (
            <button
              key={method.name}
              className={`border-2 rounded-lg p-1 transition duration-300 ease-in-out ${
                darkMode
                  ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                  : "border-blue-400 bg-blue-500 text-white hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() => handleButtonClick(method)}
              aria-label={`Apply ${method.name}`}
              type="button"
            >
              {method.name}
            </button>
          ))}
        </div>
        <button
          onClick={handleReset}
          className={`border-2 rounded-lg p-3 transition duration-300 ease-in-out ${
            darkMode
              ? "border-red-600 bg-red-600 text-white hover:bg-red-700"
              : "border-red-400 bg-red-500 text-white hover:bg-red-600"
          } focus:outline-none focus:ring-2 focus:ring-red-500`}
          aria-label="Reset text fields"
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
