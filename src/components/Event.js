import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Format date for better readability
  const formattedDate = new Date(event.created).toLocaleDateString();

  return (
    <li className="event">
      <div className="eventSummary">
        <h2>{event.summary}</h2>
        <p>{event.location}</p>
        <p>{formattedDate}</p>
      </div>
      {showDetails && (
        <div className="eventDetails">
          <p>{event.description}</p>
        </div>
      )}
      <button
        className="show-details-btn"
        onClick={() => setShowDetails(!showDetails)}
        aria-expanded={showDetails}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
};

export default Event;
