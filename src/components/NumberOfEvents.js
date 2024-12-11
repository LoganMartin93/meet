import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState(currentNOE || 32);

    const handleInputChanged = (event) => {
        const value = event.target.value;

        // If input is empty, show an error and reset local state
        if (value === '') {
            setErrorAlert('Enter a valid number greater than 0');
            setNumber('');
            return;
        }

        const numValue = parseInt(value, 10);

        // Validation for non-numeric or invalid values
        if (isNaN(numValue) || numValue <= 0) {
            setErrorAlert('Enter a valid number greater than 0');
        } else if (numValue > 32) {
            setErrorAlert('Only a maximum of 32 is allowed');
        } else {
            setErrorAlert(''); // Clear error if input is valid
            setCurrentNOE(numValue); // Update global state in App
        }

        // Update local state for display
        setNumber(value);
    };

    return (
        <div id="number-of-events">
            <label htmlFor="numberOfEventsInput">Number of Events:</label>
            <input
                id="numberOfEventsInput"
                type="number"
                value={number}
                onChange={handleInputChanged}
                data-testid="numberOfEventsInput"
                min="1"
                max="32"
            />
        </div>
    );
};

export default NumberOfEvents;
