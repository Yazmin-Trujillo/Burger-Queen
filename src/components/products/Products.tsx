import { useEffect, useState } from "react"
import { Button } from 'primereact/button';
import './Button.css';
import { CreateProduct } from "../products/createProduct/CreateProduct";
import ProductTable from "../products/productTable/ProductTable";
import { Product } from '../../models/product';
import api from '../../AuthService';


export default function ProductsView() {
    const [products, setProducts] = useState<Product[]>([]);
    const [showCreateProduct, setShowCreateProduct] = useState<boolean>(false);

    useEffect(() => {
        readProducts()
    }, []);

    async function readProducts() {
        const products = await api.getProducts()
        setProducts(products)
    }

    async function addProduct() {
        const products = await api.getProducts()
        setProducts(products)
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
            <ProductTable products={products} />
            {showCreateProduct ? <CreateProduct onClose={onCreateClose} onSave={addProduct} /> : ''}
        </div>
    )
}