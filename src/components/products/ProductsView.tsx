import { useEffect, useState } from "react"
import { Button } from 'primereact/button';
import './Button.css';
import { CreateProduct } from "./createProduct/CreateProduct";
import ProductTable from "./productTable/ProductTable";
import { Product } from '../../models/product';
import apiBurgerQueen from '../../AuthService';


export default function ProductsView() {
    const [products, setProducts] = useState<Product[]>([]);
    const [showCreateProduct, setShowCreateProduct] = useState<boolean>(false);

    useEffect(() => {
        readProducts()
    }, []);

    async function readProducts() {
        const products = await apiBurgerQueen.getProducts();
        const orderedProducts = products.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });
        setProducts(orderedProducts)
    }

    function onCreateClose() {
        setShowCreateProduct(false)
    };

    function onCreateOpen() {
        setShowCreateProduct(true)
    };
    return (
        <div className={`${showCreateProduct ? "invisible" : ""}`}>
            <div className="button-add">
                <Button icon="pi pi-plus" className="p-button-rounded" aria-label="User" onClick={onCreateOpen} />
            </div>
            <ProductTable products={products} onDelete={readProducts} onEdit={readProducts} />
            {showCreateProduct ? <CreateProduct onClose={onCreateClose} onSave={readProducts} /> : ''}
        </div>
    )
}