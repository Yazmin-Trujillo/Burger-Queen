import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './CreateProduct.css';
import apiBurgerQueen from '../../../AuthService';


type Props = {
    onClose: () => void,
    onSave: () => void
}

export const CreateProduct = ({ onClose, onSave }: Props) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        type: '',
        category: ''
    })

    const [price, setPrice] = useState<number | null>(null)

    async function save() {
        if (name === '' || price === 0) {
            return console.log('llene todos los campos')
        }
        if (await apiBurgerQueen.createProduct(name, description, price, type, category)) {
            console.log('save')
            onSave()
        }
        onClose()
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        save()
    }

    function cancel() {
        onClose()
    }

    const { name, description, type, category } = values

    return (
        <div className='backdrop'>
            <div className='container'>
                <h2>Product Details</h2>
                <div className='main'>
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

                        <div className="save-cancel">
                            <Button label="Save" icon="pi pi-check" className="p-button-secondary p-button-text" type="submit" />
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-button-text" onClick={cancel} />
                        </div>
                    </form>
                </div>

            </div>
        </div>

    )
}