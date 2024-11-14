import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { render } from '@testing-library/react';
import mockData from "../mock-data";

// Assuming 'event' is the first mock data object
const event = mockData[0];

describe('<Event /> component', () => {
    let EventComponent;

    beforeEach(() => {
        EventComponent = render(<Event event={event} />);
    });

    test('renders event title', () => {
        const eventTitle = EventComponent.queryByText(event.summary);
        expect(eventTitle).toBeInTheDocument();
    });

    test('renders event start time', () => {
        const eventTime = EventComponent.queryByText(new RegExp(event.created, 'i'));
        expect(eventTime).toBeInTheDocument();
    });

    test('renders event location', () => {
        const eventLocation = EventComponent.queryByText(new RegExp(event.location, 'i'));
        expect(eventLocation).toBeInTheDocument();
    });

    // Show Details button
    test('renders event details button', () => {
        const detailButton = EventComponent.queryByText('Show Details');
        expect(detailButton).toBeInTheDocument();
    });

    // Scenario 1: Event details are hidden by default
    test("event's details are hidden by default", () => {
        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).not.toBeInTheDocument();
    });

    // Scenario 2: Show details after clicking "Show Details"
    test('shows details after user clicks on "Show Details" button', async () => {
        const user = userEvent.setup();
        const showDetailButton = EventComponent.queryByText('Show Details');
        await user.click(showDetailButton);

        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).toBeInTheDocument();
    });

    // Scenario 3: Hide details after clicking "Hide Details"
    test('hides details after user clicks on "Hide Details" button', async () => {
        const user = userEvent.setup();
        
        const showDetailButton = EventComponent.queryByText('Show Details');
        await user.click(showDetailButton);

        const hideDetailButton = EventComponent.queryByText('Hide Details');
        await user.click(hideDetailButton);

        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).not.toBeInTheDocument();
    });
});
