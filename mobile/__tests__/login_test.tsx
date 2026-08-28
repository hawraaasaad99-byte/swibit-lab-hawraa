import React from 'react';
 import { render, fireEvent ,act} from '@testing-library/react-native'; 
 import LoginScreen from '../app/authScreens/login';
 import{ describe , it , expect} from '@jest/globals';
describe('LoginScreen Component Tests', () => 
    { it('should render email and password input fields and submit button',
        async () =>
         { const { getByPlaceholderText, getByText } = await render(<LoginScreen/>)
const emailInput = getByPlaceholderText(/email/i);
const passwordInput = getByPlaceholderText(/password/i);
const submitButton = getByText(/login/i);

expect(emailInput).toBeTruthy();
expect(passwordInput).toBeTruthy();
expect(submitButton).toBeTruthy();
});
it('should update input values when user types',
    async () => { const { getByPlaceholderText } = await render(<LoginScreen/>)
    const emailInput = getByPlaceholderText(/email/i);

    await act(async() => {

    fireEvent.changeText(emailInput, 'test@example.com');
    });

    expect(emailInput.props.value).toBe('test@example.com');
  }); 

});