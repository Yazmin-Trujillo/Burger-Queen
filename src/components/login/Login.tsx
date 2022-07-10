import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './Login.css';
import apiBurgerQueen from '../../AuthService';
import { Message } from 'primereact/message';

type Props = {
    setIsAuth: (value: boolean) => void
}

export default function Login({ setIsAuth }: Props) {
    const [invalidLogin, setInvalidLogin] = useState<boolean>(false)

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        const {email, password} = event.target.elements;
        if (email.value === '' || password.value === '') {
            return console.log('llene todos los campos')
        }
        
        if (await apiBurgerQueen.authenticate(email.value, password.value)) {
            setIsAuth(true)
        } else {
            setInvalidLogin(true)
        }
    }

    return (
        <main className='login'>
            <section className='presentation'>
                <h1>Burger Queen</h1>
            </section>

            <section className='welcome'>
                <div className='wrapper-login'>
                    <h1 data-testid='welcomeTitle'>Welcome</h1>
                    <p>Enter your data to continue</p>
                    {invalidLogin ? <Message data-testid='error-message' className='message' severity="error" text="Wrong email or password" /> : ''}
                    <form onSubmit={handleSubmit}>
                        <InputText data-testid='email' name='email' placeholder="Email address" />
                        <InputText data-testid='password' name='password' type="password" placeholder="Password" />
                        <Button data-testid='continue-button' label="CONTINUE" type="submit" />
                    </form>
                </div>

            </section>
        </main >
    );
}
