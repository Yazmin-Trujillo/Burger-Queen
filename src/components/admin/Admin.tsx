import { useEffect, useState } from "react"
import api from "../../AuthService";
import { Product } from "../../models/product";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './Button.css';
import { CreateProduct } from "../createProduct/CreateProduct";


export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showCreateProduct, setShowCreateProduct] = useState<boolean>(false);

  useEffect(() => {
    readProducts()
  }, []);

  async function readProducts() {
    const products = await api.geteProducts()
    setProducts(products)
    console.log('en Admin view, products es', products)
  }

  function onCreateClose() {
    setShowCreateProduct(false)
  };

  function onCreateOpen() {
    setShowCreateProduct(true)
  };

  return (
    <>
      {/* <div>
        {product.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div> */}
      <div className={`${showCreateProduct ? "invisible" : ""}`}>
        <div className="button-add">
          <Button icon="pi pi-plus" className="p-button-rounded" aria-label="User" onClick={onCreateOpen} />
        </div>

        <div>
          <div className="card">
            <DataTable value={products} responsiveLayout="scroll">
              <Column field="name" header="NAME"></Column>
              <Column field="description" header="DESCRIPTION"></Column>
              <Column field="price" header="PRICE"></Column>
              <Column field="image" header="IMAGE"></Column>
              <Column field="type" header="TYPE"></Column>
            </DataTable>
          </div>
        </div>
      </div>

      {showCreateProduct ? <CreateProduct onClose={onCreateClose} /> : ''}

    </>
  )
}
