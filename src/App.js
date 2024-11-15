import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState("");

  // Add a state to track the visibility of each event's details
  const [eventDetailsVisible, setEventDetailsVisible] = useState({});

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents : allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  // Toggle the visibility of event details
  const toggleEventDetails = (eventId) => {
    setEventDetailsVisible(prevState => ({
      ...prevState,
      [eventId]: !prevState[eventId]  // Toggle visibility for the specific event
    }));
  };

  return (
    <div className="App">
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
      />
      <EventList 
        events={events} 
        toggleEventDetails={toggleEventDetails} // Pass the function to EventList
        eventDetailsVisible={eventDetailsVisible} // Pass the visibility state to EventList
      />
      <NumberOfEvents 
        setErrorAlert={setErrorAlert}
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
      />
    </div>
  );
}

export default App;
