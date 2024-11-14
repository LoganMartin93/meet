import NumberOfEvents from '../components/NumberOfEvents';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
        const input = NumberOfEventsComponent.queryByRole('textbox');
        expect(input).toBeInTheDocument();
    });
    
    test('ensures the default value of textbox is 32', () => {
        const input = NumberOfEventsComponent.queryByRole('textbox');
        expect(input).toHaveValue('32');
    });

    test('textbox value changes when user updates input', async () => {
        const input = NumberOfEventsComponent.getByTestId('numberOfEventsInput');
        const user = userEvent.setup();
        await user.type(input, '{backspace}{backspace}10');
        expect(input).toHaveValue('10');
    });
});