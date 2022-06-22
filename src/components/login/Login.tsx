import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './Login.css';
import api from '../../AuthService';
import { Message } from 'primereact/message';

export default function Login() {
    const toast = useRef(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalidLogin, setInvalidLogin] = useState<boolean>(false)

    async function login() {
        setInvalidLogin(false);
        if (email === '' || password === '') {
            return console.log('llene todos los campos')
        }
        console.log(email, password)

        if (await api.authenticate(email, password)) {
            console.log('mandar a otra vista')
        } else {
            setInvalidLogin(true)
        }

        // if (await api.authenticate(email, password)) {
        //     const current: any = toast.current
        //     current?.show({ severity: 'success', summary: 'Success login', detail: 'Your login credentials were accepted', life: 3000 });
        // } else {
        //     const current: any = toast.current
        //     current?.show({ severity: 'error', summary: 'Invalid login', detail: 'We couldn\'t log you in', life: 3000 });
        // }
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

                    <InputText data-testid='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                    <InputText data-testid='password' value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <Button data-testid='continue-button' label="CONTINUE" onClick={login} />
                    {/* <Button label="Forgot password?" className="p-button-link" />
                    <Button label="I forgot my password" className="p-button-link" /> */}
                </div>

            </section>
            <Toast ref={toast} />
        </main>
    );
}
