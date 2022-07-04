import { useState } from "react"
import { Button } from 'primereact/button';
import './Button.css';
import { CreateProduct } from "../products/createProduct/CreateProduct";
import ProductTable from "../products/productTable/ProductTable";

export default function Product() {
    const [showCreateProduct, setShowCreateProduct] = useState<boolean>(false);

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
            <ProductTable />
            {showCreateProduct ? <CreateProduct onClose={onCreateClose} /> : ''}
        </div>
    )
}