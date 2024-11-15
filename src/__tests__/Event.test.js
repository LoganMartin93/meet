import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { render } from '@testing-library/react';
import mockData from "../mock-data";
import { loadFeature, defineFeature } from 'jest-cucumber';

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

    test('renders event start date', () => {
        // Format date the same way it is in the component
        const formattedDate = new Date(event.created).toLocaleDateString();
        const eventTime = EventComponent.queryByText(formattedDate);
        expect(eventTime).toBeInTheDocument();
    });

    test('renders event location', () => {
        const eventLocation = EventComponent.queryByText(new RegExp(event.location, 'i'));
        expect(eventLocation).toBeInTheDocument();
    });

    test('renders event details button', () => {
        const detailButton = EventComponent.queryByText('Show Details');
        expect(detailButton).toBeInTheDocument();
    });

    test("event's details are hidden by default", () => {
        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).not.toBeInTheDocument();
    });

    test('shows details after user clicks on "Show Details" button', async () => {
        const user = userEvent.setup();
        const showDetailButton = EventComponent.queryByText('Show Details');
        await user.click(showDetailButton);

        const eventDetails = EventComponent.container.querySelector('.eventDetails');
        expect(eventDetails).toBeInTheDocument();
    });

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
