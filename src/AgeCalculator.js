import React, { useState } from "react";
import "./AgeCalculator.css";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState(""); // Stores the user's input birthdate
  const [age, setAge] = useState(null); // Stores the calculated age
  const [message, setMessage] = useState(null); // Stores the pop-up message data

  // Function to calculate age based on the birthdate
  const calculateAge = () => {
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let calculatedAge = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      // Adjust age if the current date is before the birth date in the current year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        calculatedAge--;
      }

      setAge(calculatedAge); // Update the age state
      setMessage({ text: "Age calculated successfully!", type: "success" }); // Show success message
    } else {
      // Show error message if no date is entered
      setMessage({ text: "Please enter a valid date!", type: "error" });
    }
  };

  // Function to reset fields
  const resetFields = () => {
    setBirthDate(""); // Clear the birthdate input
    setAge(null); // Reset the calculated age
    setMessage({ text: "Fields have been reset.", type: "info" }); // Show reset info message
  };

  // Function to close the pop-up message manually
  const closeMessage = () => setMessage(null);

  return (
    <div className="age-calculator-container">
      <h1 className="title">🎉 Age Calculator 🎂</h1>
      <div className="input-container">
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="date-input"
        />
        <div className="button-container">
          <button onClick={calculateAge} className="calculate-button">
            Calculate Age
          </button>
          <button onClick={resetFields} className="reset-button">
            Reset
          </button>
        </div>
      </div>
      {age !== null && (
        <div className="result">
          <h2>Your Age:</h2>
          <p>{age} years</p>
        </div>
      )}
      {message && (
        <div className={`popup-message ${message.type}`}>
          <span>{message.text}</span>
          <button onClick={closeMessage} className="close-button">✖</button>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
