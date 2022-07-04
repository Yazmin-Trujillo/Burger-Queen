import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Product } from '../../../models/product';
import { useEffect, useState } from 'react';
import api from '../../../AuthService';

export default function ProductTable() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        readProducts()
    }, []);

    async function readProducts() {
        const products = await api.getProducts()
        setProducts(products)
        console.log('en Admin view, products es', products)
    }

    return (
        <div data-testid="product-table">
            <DataTable value={products} responsiveLayout="scroll">
                <Column field="name" header="NAME"></Column>
                <Column field="description" header="DESCRIPTION"></Column>
                <Column field="price" header="PRICE"></Column>
                <Column field="image" header="IMAGE"></Column>
                <Column field="type" header="TYPE"></Column>
                <Column field="category" header="CATEGORY"></Column>
            </DataTable>
        </div>
    )
}
