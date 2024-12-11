import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppComponent;

    given('the user has not searched for a city', () => {
      AppComponent = render(<App />);
    });

    when('the user views the event list', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    then('the user should see upcoming events from all cities', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument(); // Ensure details are collapsed
    });

    then('the event details should be collapsed by default', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument(); // Event details should not be visible initially
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    let AppComponent;

    given('the user is viewing the event list', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    let EventComponent;
    let allEvents;

    when('the user clicks the "Show Details" button for an event', async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />);
      
        // Log the inner HTML to ensure the event is rendered correctly
        console.log(EventComponent.container.innerHTML);  // Check what is rendered
      
        // Fix the class selector by adding the dot for class selection
        const showDetailsButton = await waitFor(() =>
          EventComponent.container.querySelector('.show-details-btn')
        );
      
        expect(showDetailsButton).toBeInTheDocument();  // Assert button is found
        await userEvent.click(showDetailsButton);
      });
      

    then('the event details should be displayed', () => {
      const eventDetails = EventComponent.container.querySelector('button.show-details-btn');
      expect(eventDetails).toBeInTheDocument(); // Ensure event details are visible after clicking 'Show Details'
    });

    then('the "Show Details" button should change to "Hide Details"', () => {
      const hideDetailsButton = EventComponent.container.querySelector('button.show-details-btn');
      expect(hideDetailsButton).toHaveTextContent('Hide Details');
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;

    given('the user has expanded an event to see details', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      const showDetailsButton = EventComponent.queryByText('Show Details');
      await userEvent.click(showDetailsButton); // Expanding the event
    });

    when('the user clicks the "Hide Details" button for the event', async () => {
      const hideDetailsButton = EventComponent.queryByText('Hide Details');
      await userEvent.click(hideDetailsButton); // Collapsing the event details
    });

    then('the event details should be hidden', async () => {
        const showDetailsButton = EventComponent.queryByText('Show Details');
        expect(showDetailsButton).toBeInTheDocument();  // Check if it's in the DOM
        await userEvent.click(showDetailsButton);   
    });

    then('the "Hide Details" button should change to "Show Details"', () => {
      const showDetailsButton = EventComponent.container.querySelector('button.show-details-btn');
      expect(showDetailsButton).toHaveTextContent('Hide Details');
    });
  });
});
