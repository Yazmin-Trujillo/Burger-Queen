import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Product } from '../../../models/product';
import { Button } from 'primereact/button';
import apiBurgerQueen from '../../../AuthService';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
// import { useRef } from 'react';

type Props = {
    products: Product[],
    onDelete: () => void
}

export default function ProductTable({ products, onDelete }: Props) {
    const toast = useRef<Toast>(null);
    const actionBody = (product: Product) => {
        return (
            <>
                {/* <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct()} /> */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => showConfirmDelete(product)} />
            </>
        );
    }

    // const editProduct = () => {
    //     console.log('edit')
    //     // setProduct({...product});
    //     // setProductDialog(true);
    // }

    // const deleteProduct = async (id: string) => {
    //     console.log('delete')
    //     await apiBurgerQueen.deleteProduct(id)
    //     // setProduct(product);
    //     // setDeleteProductDialog(true);
    // }

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
    )
}
