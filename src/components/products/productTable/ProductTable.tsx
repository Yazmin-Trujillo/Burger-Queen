import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Product } from '../../../models/product';
import { Button } from 'primereact/button';
import apiBurgerQueen from '../../../AuthService';

type Props = {
    products: Product[]
}

export default function ProductTable({ products }: Props) {

    const actionBody = (product: Product) => {
        return (
            <>
                {/* <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct()} /> */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deleteProduct(product.id)} />
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

    async function deleteProduct(id: string) {
        console.log('delete', id)
        await apiBurgerQueen.deleteProduct(id)
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
        </div>
    )
}
