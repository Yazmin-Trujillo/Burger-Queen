import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Product } from '../../../models/product';
import { Button } from 'primereact/button';
import apiBurgerQueen from '../../../AuthService';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { EditProduct } from '../editProduct/EditProduct';

type Props = {
    products: Product[],
    onDelete: () => void,
    onEdit: () => void
}

export default function ProductTable({ products, onDelete, onEdit }: Props) {
    const [showEditProduct, setShowEditProduct] = useState<boolean>(false);
    const [position, setPosition] = useState('center');
    const [productToEdit, setProductToEdit] = useState<Product>()
    const toast = useRef<Toast>(null);
    const actionBody = (product: Product) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => showEdit(product)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => showConfirmDelete(product)} />
            </>
        );
    }

    async function editProduct(product: Product) {
        console.log('edit')
        // await apiBurgerQueen.editProduct(product.id, product.name, product.description, product.price, product.type, product.category);
        onEdit()
    }

    function showEdit(product: Product) {
        setProductToEdit(product)
        setShowEditProduct(true)
        if (position) {
            setPosition(position);
        }
    };

    function onEditClose() {
        console.log('cerrar')
        setShowEditProduct(false)
    };

    const showConfirmDelete = (product: Product) => {
        confirmDialog({
            message: 'Do you want to delete this product?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteProduct(product.id),
        });
    };

    async function deleteProduct(id: string) {
        await apiBurgerQueen.deleteProduct(id)
        onDelete()
        toast.current?.show({ severity: 'success', summary: 'Confirmed', detail: 'Your product was removed', life: 3000 });
    }

    return (
        <div className={`${showEditProduct ? "invisible" : ""}`}>
            <div data-testid="product-table">
                <DataTable value={products} responsiveLayout="scroll">
                    <Column field="name" header="NAME"></Column>
                    <Column field="image" header="IMAGE"></Column>
                    <Column field="description" header="DESCRIPTION"></Column>
                    <Column field="price" header="PRICE"></Column>
                    <Column field="type" header="TYPE"></Column>
                    <Column field="category" header="CATEGORY"></Column>
                    <Column body={actionBody} style={{ minWidth: '8rem' }} header="ACTIONS"></Column>
                </DataTable>
                <ConfirmDialog />
                <Toast ref={toast} />
            </div>
            {showEditProduct ? <EditProduct onClose={onEditClose} display={showEditProduct} product={productToEdit!} /> : ''}

            {/* {products.map((product) => {
                    return <EditProduct key={product.id} product={product} onClose={onEditClose} />
                })} */}
        </div>
    )
}
