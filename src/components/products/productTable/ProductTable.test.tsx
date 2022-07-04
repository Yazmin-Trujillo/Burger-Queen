import { render, screen } from '@testing-library/react';
import { Product } from '../../../models/product';
import ProductTable from './ProductTable';

describe('ProductTable component', () => {

        it('table rendering', () => {
            const products: Product[] = [{
                id: "21650cba-0f7e-4cd1-a46d-1ae3b42f6545",
                name: "Café americano",
                description: "Rico café de los altos de Chiapas",
                price: 10.12,
                type: "Drink",
                category: "Breakfast",
                createDate: new Date('July 02, 2022 22:27:00')
            }];

            render(<ProductTable products={products}/>)

            expect(screen.getByText(products[0].name)).toBeInTheDocument();
            expect(screen.getByText(products[0].description!)).toBeInTheDocument();
            expect(screen.getByText(products[0].price)).toBeInTheDocument();
            expect(screen.getByText(products[0].type!)).toBeInTheDocument();
            expect(screen.getByText(products[0].category!)).toBeInTheDocument();
        });
    })
