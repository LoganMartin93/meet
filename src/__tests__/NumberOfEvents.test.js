
import NumberOfEvents from '../components/NumberOfEvents';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';

describe('<NumberOfEvents /> Component', () => {
    let NumberOfEventsComponent;

    beforeEach(() => {
        NumberOfEventsComponent = render(
            <NumberOfEvents
                currentNOE={32} 
                setCurrentNOE={() => {}}
                setErrorAlert={() => {}}
            />
        );
    });

    test('component contains input textbox', () => {
        const input = NumberOfEventsComponent.getByTestId('numberOfEventsInput');
        expect(input).toBeInTheDocument();
    });
    
    test('ensures the default value of textbox is 32', () => {
        const input = NumberOfEventsComponent.getByTestId('numberOfEventsInput');
        expect(input).toHaveValue(32); // Ensure the default state passes correctly
    });
    

    test('textbox value changes when user updates input', async () => {
        const input = NumberOfEventsComponent.getByTestId('numberOfEventsInput');
        const user = userEvent.setup();
        await user.type(input, '{backspace}{backspace}10');
        expect(input).toHaveValue(10);
    });
});
