import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {
        let AppComponent;

        given('the user has not specified the number of events to display', () => {
            AppComponent = render(<App />);
        });

        when('the event list is displayed', async () => {
            // Wait for the events to be rendered
            await waitFor(() => {
                const eventListItems = screen.getAllByRole('listitem');
                expect(eventListItems.length).toBe(32); // Check if the default number of events is 32
            });
        });

        then(/^the event list should show a default of (\d+) events$/, (arg0) => {
            const eventListItems = screen.getAllByRole('listitem');
            expect(eventListItems.length).toBe(parseInt(arg0, 10)); // Validate the default number of events
        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
        let AppComponent;

        given('the user wants to change the number of events displayed', () => {
            AppComponent = render(<App />);
        });

        when('the user enters a specific number of events to display', async () => {
            const inputField = screen.getByTestId('numberOfEventsInput'); // Locate the input field
            userEvent.clear(inputField); // Clear existing value
            userEvent.type(inputField, '10'); // Type in the new value (e.g., 10)
            fireEvent.submit(inputField); // Submit the input if required (optional based on implementation)
        });

        then('the event list should update to show the specified number of events', async () => {
            await waitFor(() => {
                const eventListItems = screen.getAllByRole('listitem');
                expect(eventListItems.length).toBe(10); // Check if the event list updates to show the specified number of events
            });
        });
    });
});
