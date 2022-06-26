import { useState } from 'react';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export default function Router() {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <>
            {
                isAuth ?
                    <PrivateRoutes /> :
                    <PublicRoutes setIsAuth={setIsAuth} />
            }
        </>
    )
}
