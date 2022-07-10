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
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(undefined);
    const [price, setPrice] = useState<number | null>(0);
    const [category, setCategory] = useState(undefined);

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

    function cancel() {
        onClose()
    }

    return (
        <div className='backdrop'>
            <div className='container'>
                <h2>Product Details</h2>
                <div className='main'>
                    <h3>Name *</h3>
                    <InputText value={name} onChange={(e) => setName(e.target.value)} />

                    <h3>Description</h3>
                    <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} autoResize />

                    <h3>Price *</h3>
                    <InputNumber inputId="currency-us" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="USD" locale="en-US" />

                    <h3>Type</h3>
                    <div className="field-radiobutton">
                        <RadioButton inputId="type1" name="type" value="Drink" onChange={(e) => setType(e.value)} checked={type === 'Drink'} />
                        <label htmlFor="type1">Drink</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="type2" name="type" value="Food" onChange={(e) => setType(e.value)} checked={type === 'Food'} />
                        <label htmlFor="type2">Food</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="type3" name="type" value="Dessert" onChange={(e) => setType(e.value)} checked={type === 'Dessert'} />
                        <label htmlFor="type3">Dessert</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="type4" name="type" value="Other" onChange={(e) => setType(e.value)} checked={type === 'Other'} />
                        <label htmlFor="type4">Other</label>
                    </div>

                    <h3>Category</h3>
                    <div className="field-radiobutton">
                        <RadioButton inputId="category1" name="category" value="Breakfast" onChange={(e) => setCategory(e.value)} checked={category === 'Breakfast'} />
                        <label htmlFor="category1">Breakfast</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="category2" name="category" value="Lunch and dinner" onChange={(e) => setCategory(e.value)} checked={category === 'Lunch and dinner'} />
                        <label htmlFor="category2">Lunch and dinner</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="category3" name="category" value="Other" onChange={(e) => setCategory(e.value)} checked={category === 'Other'} />
                        <label htmlFor="category3">Other</label>
                    </div>

                    <div className="save-cancel">
                        <Button label="Save" icon="pi pi-check" className="p-button-secondary p-button-text" onClick={save} />
                        <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-button-text" onClick={cancel} />
                    </div>

                </div>

            </div>
        </div>

    )
}