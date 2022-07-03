import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Product } from '../../models/product';


type Props = {
    products: Product[]
}

export default function ProductTable({ products }: Props) {
    
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
