import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState(currentNOE);

    const handleInputChanged = (event) => {
        const value = parseInt(event.target.value, 10);

        if (isNaN(value) || value <= 0) {
            setErrorAlert('Enter a valid number greater than 0');
        } else if (value > 32) {
            setErrorAlert('Only a maximum of 32 is allowed');
        } else {
            setErrorAlert('');
            setCurrentNOE(value); // Update the event count in App
        }

        // Update the local state for display
        setNumber(event.target.value);
    };

    return (
        <div id="number-of-events">
            <label>
                Number of Events:
                <input
                    type="text"
                    value={number}
                    onChange={handleInputChanged}
                    data-testid="numberOfEventsInput"
                />
            </label>
        </div>
    );
};

export default NumberOfEvents;
