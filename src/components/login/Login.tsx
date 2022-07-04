import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './Login.css';
import api from '../../AuthService';
import { Message } from 'primereact/message';

type Props = {
    setIsAuth: (value: boolean) => void
}

export default function Login({ setIsAuth }: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalidLogin, setInvalidLogin] = useState<boolean>(false)

    async function login() {
        setInvalidLogin(false);
        if (email === '' || password === '') {
            return console.log('llene todos los campos')
        }

        if (await api.authenticate(email, password)) {
            setIsAuth(true)
        } else {
            setInvalidLogin(true)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                        <InputText data-testid='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                        <InputText data-testid='password' value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <Button data-testid='continue-button' label="CONTINUE" onClick={login} type="submit" />
                    </form>
                </div>

            </section>
        </main >
    );
}
