import axios from 'axios';
import { Product } from './models/product';

let token = '';
const api = {

    authenticate: async function (email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.post('https://j-burguer-api.herokuapp.com/api/v1/auth',
                {
                    email: email,
                    password: password
                });
            token = response.data.token;
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    },

    geteProducts: async (): Promise<Product[]> => {
        try {
            const response = await axios.get('https://j-burguer-api.herokuapp.com/api/v1/products', { headers: { "Authorization": `Bearer ${token}` } });
            const products = response.data.products;
            return products
        } catch (error) {
            console.error(error);
            throw error
        }
    },
}

export default api