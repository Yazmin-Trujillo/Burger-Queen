import { render, screen, waitFor } from '@testing-library/react';
import Login from './Login';
import api from '../../AuthService'
import userEvent from '@testing-library/user-event';

jest.mock('../../AuthService', () => ({ authenticate: jest.fn() }))

describe('Login component', () => {
    const authenticateMock = api.authenticate as jest.MockedFunction<any>;
    let setIsAuthMock: jest.Mock;

    beforeEach(() => {
        setIsAuthMock = jest.fn();
    })

    it('renders Welcome', () => {
        render(<Login setIsAuth={setIsAuthMock} />);

        const title = screen.getByTestId('welcomeTitle');

        expect(title).toBeInTheDocument();

    });

    describe('given user enters credentials', () => {
        it('and authentication fails', async () => {
            render(<Login setIsAuth={setIsAuthMock} />);
            userEnterCredentials();

            authenticateMock.mockResolvedValue(false);// or authenticateMock.mockImplementation(() => Promise.resolve(false));
            userClickContinue();

            expect(authenticateMock).toBeCalledTimes(1);
            expect(authenticateMock).toBeCalledWith('yastoy', 'micontraseña');
            const errorMessage = await screen.findByTestId('error-message');// see https://testing-library.com/docs/dom-testing-library/api-async
            expect(errorMessage).toBeInTheDocument();
            expect(setIsAuthMock).not.toBeCalled();
        });

        it('and authentication succeed', async () => {
            render(<Login setIsAuth={setIsAuthMock} />);
            userEnterCredentials();

            authenticateMock.mockResolvedValue(true);
            userClickContinue();

            await waitFor(() => expect(setIsAuthMock).toHaveBeenCalledTimes(1))
        })
        function userEnterCredentials() {
            const email = screen.getByTestId('email');
            const password = screen.getByTestId('password');
            userEvent.type(email, 'yastoy');
            userEvent.type(password, 'micontraseña');
        }
        function userClickContinue() {
            const button = screen.getByTestId('continue-button');
            userEvent.click(button);// or act(() => button.click());
        }
    });

})


