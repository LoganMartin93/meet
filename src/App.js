import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert} from './components/Alert';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState('');
 
  

  // Add a state to track the visibility of each event's details
  const [eventDetailsVisible, setEventDetailsVisible] = useState({});

  useEffect(() => {
    // Check if the user is online and set a warning alert if offline
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are offline. Data may be outdated.");
    }


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
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
      </div>
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
        setInfoAlert={setInfoAlert} />
      <NumberOfEvents 
        setErrorAlert={setErrorAlert}
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
      />  
      <CityEventsChart allLocations={allLocations} events={events} />
      <EventList 
        events={events} 
        toggleEventDetails={toggleEventDetails} // Pass the function to EventList
        eventDetailsVisible={eventDetailsVisible} // Pass the visibility state to EventList
      />

      <div className="alerts-container">
          {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
          {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
          {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
    </div>       
  );
}

export default App;
