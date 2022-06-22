import React from 'react';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import Login from './Login';
import api from '../../AuthService'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

// test('renders learn react link', () => {
//     render(<Login />);
//     const linkElement = screen.getByText(/learn react/i);
//     expect(linkElement).toBeInTheDocument();
//   });

jest.mock('../../AuthService', () => ({ authenticate: jest.fn() }))

describe('In the Login component', () => {

    const authenticateMock = api.authenticate as jest.MockedFunction<any>;

    it('welcome is render', () => {
        render(<Login />);

        const title = screen.getByTestId('welcomeTitle');

        expect(title).toBeInTheDocument();

    });

    it('authenticate is called when the button continue is clicked', async () => {
        render(<Login />);

        const button = screen.getByTestId('continue-button');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        userEvent.type(email, 'yastoy');
        userEvent.type(password, 'micontraseña');

        authenticateMock.mockResolvedValue(false);// or authenticateMock.mockImplementation(() => Promise.resolve(false));
        userEvent.click(button); // or act(() => button.click());
        
        expect(authenticateMock).toBeCalledTimes(1);
        expect(authenticateMock).toBeCalledWith('yastoy', 'micontraseña');
        const errorMessage = await screen.findByTestId('error-message');// see https://testing-library.com/docs/dom-testing-library/api-async
        expect(errorMessage).toBeInTheDocument();
    });

    // it('return false para error en authenticate', async() => {
    //     render(<Login/>);

    //     const button = screen.getByTestId('continueButton');
    //     const email = screen.getByTestId('email');
    //     const password = screen.getByTestId('password');
    //     userEvent.type(email, 'yastoy');
    //     userEvent.type(password, 'micontraseña');

    //     act(() =>  button.click());

    //    await expect(authenticateMock).resolves.toBe('false');
    // })

})
