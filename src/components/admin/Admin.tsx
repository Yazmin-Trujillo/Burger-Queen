import { useEffect, useState } from "react"
import api from "../../AuthService";
import { Product } from "../../models/product";
import { Button } from 'primereact/button';
import './Button.css';
import { CreateProduct } from "../createProduct/CreateProduct";
import ProductTable from "../productTable/ProductTable";


export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showCreateProduct, setShowCreateProduct] = useState<boolean>(false);

  useEffect(() => {
    readProducts()
  }, []);

  async function readProducts() {
    const products = await api.getProducts()
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
      <div className={`${showCreateProduct ? "invisible" : ""}`}>
        <div className="button-add">
          <Button icon="pi pi-plus" className="p-button-rounded" aria-label="User" onClick={onCreateOpen} />
        </div>
        <ProductTable products={products} />
        {showCreateProduct ? <CreateProduct onClose={onCreateClose} /> : ''}
      </div>
    </>
  )
}
