import axios from 'axios';

// TODO: sugerencias

// 1. renombrar este archivo a authService/loginService/userService o algo similar
// 2. cambiar a exportar un objeto con funciones internas en vez de exportar funciones sueltas
// 3. fetchData renombrar a login/authenticate o similar
// 4. fetchData debe regresar más informacion en caso de errores que solo un boolean
// 5. commits pequeños
// 6. unit test!

export const fetchData = async (email: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post('https://j-burguer-api.herokuapp.com/api/v1/auth',
            {
                email: email,
                password: password
            });
        console.log(response, 'respuesta');
        return true
    } catch (error) {
        console.error(error);
        return false
    }
}