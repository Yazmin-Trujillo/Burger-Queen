import { render, screen, waitFor } from '@testing-library/react';
import Login from './Login';
import api from '../../AuthService'
import userEvent from '@testing-library/user-event';

jest.mock('../../AuthService', () => ({ authenticate: jest.fn() }))

describe('In the Login component', () => {

    const authenticateMock = api.authenticate as jest.MockedFunction<any>;

    it('welcome is render', () => {
        const setIsAuthMock = jest.fn();
        render(<Login setIsAuth={setIsAuthMock} />);

        const title = screen.getByTestId('welcomeTitle');

        expect(title).toBeInTheDocument();

    });

    it('authenticate is called when the button continue is clicked', async () => {
        const setIsAuthMock = jest.fn();
        render(<Login setIsAuth={setIsAuthMock} />);

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
        expect(setIsAuthMock).not.toBeCalled();
    });

    it('return true para login en authenticate', async () => {
        const setIsAuthMock = jest.fn();
        render(<Login setIsAuth={setIsAuthMock} />);

        const button = screen.getByTestId('continue-button');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        userEvent.type(email, 'admin@admin.com');
        userEvent.type(password, 'test456');

        authenticateMock.mockResolvedValue(true);
        userEvent.click(button);

        await waitFor(() => expect(setIsAuthMock).toHaveBeenCalledTimes(1)) // see https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
    })

})
