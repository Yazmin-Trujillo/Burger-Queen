import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import apiBurgerQueen from '../../../AuthService';
import './EditProduct.css';
import { Product } from '../../../models/product';

type Props = {
    onClose: () => void,
    display: boolean,
    product: Product,
    onEdit: () => void,
}
export const EditProduct = ({ onClose, display, product, onEdit }: Props) => {
    const [values, setValues] = useState({
        name: product.name,
        description: product.description,
        type: product.type,
        category: product.category
    })
    const [price, setPrice] = useState<number | null>(product.price)
    const { name, description, type, category } = values

    async function edit() {
        if (product.name === name && product.description === description && product.price === price && product.type === type && product.category === category) {
            onClose()
        }

        if (await apiBurgerQueen.editProduct(product.id, name, description, price, type, category)) {
            onEdit()
            onClose()
        }
        onClose()
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        edit()
    }

    const onHide = () => {
        onClose()
    }

    return (
        <Dialog header="Edit product" visible={display} style={{ width: '50vw' }} onHide={() => onHide()}>
            <form onSubmit={handleSubmit}>
                <h3>Name *</h3>
                <InputText name="name" value={name} onChange={handleChange} />

                <h3>Description</h3>
                <InputTextarea name="description" value={description} onChange={handleChange} rows={5} cols={30} autoResize />

                <h3>Price *</h3>
                <InputNumber inputId="currency-us" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="USD" locale="en-US" />

                <h3>Type</h3>
                <div className="field-radiobutton">
                    <RadioButton inputId="type1" name="type" value="Drink" onChange={handleChange} checked={type === 'Drink'} />
                    <label htmlFor="type1">Drink</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="type2" name="type" value="Food" onChange={handleChange} checked={type === 'Food'} />
                    <label htmlFor="type2">Food</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="type3" name="type" value="Dessert" onChange={handleChange} checked={type === 'Dessert'} />
                    <label htmlFor="type3">Dessert</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="type4" name="type" value="Other" onChange={handleChange} checked={type === 'Other'} />
                    <label htmlFor="type4">Other</label>
                </div>

                <h3>Category</h3>
                <div className="field-radiobutton">
                    <RadioButton inputId="category1" name="category" value="Breakfast" onChange={handleChange} checked={category === 'Breakfast'} />
                    <label htmlFor="category1">Breakfast</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="category2" name="category" value="Lunch and dinner" onChange={handleChange} checked={category === 'Lunch and dinner'} />
                    <label htmlFor="category2">Lunch and dinner</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="category3" name="category" value="Other" onChange={handleChange} checked={category === 'Other'} />
                    <label htmlFor="category3">Other</label>
                </div>
                <Divider />
                <div className="align-buttons">
                    <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" type="submit" autoFocus />
                </div>
            </form>
        </Dialog>
    )
}