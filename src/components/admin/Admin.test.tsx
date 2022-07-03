 import { render, screen } from '@testing-library/react';
// import Admin from './Admin';
// import api from '../../AuthService'
// // import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';

// jest.mock('../../AuthService', () => ({ geteProducts: jest.fn() }))

// describe('Admin component', () => {
//     const ReadProductsMock = api.geteProducts as jest.MockedFunction<any>;

//     describe('on get products successfully', ()=>{
//         it('renders table', async () => {
//             const product = {
//                 id: "21650cba-0f7e-4cd1-a46d-1ae3b42f6545",
//                 name: "Café americano",
//                 description: "Rico café de los altos de Chiapas",
//                 price: 10.12,
//                 type: "Drink",
//                 category: "Breakfast",
//                 created: "2022-06-19T06:57:56.306+00:00"
//             };
//             ReadProductsMock.mockResolvedValue([product ]);
    
//             // eslint-disable-next-line testing-library/no-unnecessary-act
//             await act(async () => {
//                 render(<Admin />)
//             })
    
//             // expect(screen.getByText('NAME')).toBeInTheDocument();
//             expect(screen.getByText(product.name)).toBeInTheDocument();
//             expect(screen.getByText(product.description)).toBeInTheDocument();
//             expect(screen.getByText(product.price)).toBeInTheDocument();
//             expect(screen.getByText(product.type)).toBeInTheDocument();
//             expect(screen.getByText(product.category)).toBeInTheDocument();

//             expect(ReadProductsMock).toHaveBeenCalledTimes(1)
    
//             // await waitFor(() => expect(ReadProductsMock).toHaveBeenCalledTimes(1))
    
//         });

//     })

//     // describe('on add product button click', () =>{

//     // })

    

//     // it('renders', async () => {
//     //     const product = {
//     //         id: "21650cba-0f7e-4cd1-a46d-1ae3b42f6545",
//     //         name: "Café americano",
//     //         price: 10.12,
//     //         created: "2022-06-19T06:57:56.306+00:00"
//     //     };
//     //     ReadProductsMock.mockResolvedValue([]);

//     //     // eslint-disable-next-line testing-library/no-unnecessary-act
//     //     await act(async () => {
//     //         render(<Admin />)
//     //     })

//     //     expect(screen.getByText('NAME')).toBeInTheDocument();
//     //     expect(screen.getByText(product.name)).toBeInTheDocument();
//     //     expect(screen.getByText(product.price)).toBeInTheDocument();
//     //     expect(ReadProductsMock).toHaveBeenCalledTimes(1)

//     //     // await waitFor(() => expect(ReadProductsMock).toHaveBeenCalledTimes(1))

//     // });


// })