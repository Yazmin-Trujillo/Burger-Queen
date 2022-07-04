import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './CreateProduct.css';
import api from '../../AuthService';
import { Product } from '../../models/product';


type Props = {
    onClose: () => void,
    onClick: () => void
}

export const CreateProduct = ({ onClose, onClick }: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const [value3, setValue3] = useState('');
    const [type, setType] = useState(null);
    const [price, setPrice] = useState<number | null>(0);


    async function save() {
        if (name === '' || price === 0) {
            return console.log('llene todos los campos')
        }
        if (await api.crerateProduct(name, price)) {
            console.log('save')
        }
        onClick()
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
                    <span className="ml-2">{name}</span>

                    <h3>Description</h3>
                    <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} autoResize />

                    <h3>Price *</h3>
                    {/* <InputText value={value3} onChange={(e) => setValue3(e.target.value)} />
            <span className="ml-2">{value3}</span> */}
                    {/* <label htmlFor="currency-us">Dollars</label> */}
                    <InputNumber inputId="currency-us" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="USD" locale="en-US" />

                    <h3>Type</h3>
                    <div className="field-radiobutton">
                        <RadioButton inputId="type1" name="type" value="Drink" onChange={(e) => setType(e.value)} checked={type === 'Drink'} />
                        <label htmlFor="city1">Drink</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="type2" name="type" value="Food" onChange={(e) => setType(e.value)} checked={type === 'Food'} />
                        <label htmlFor="city2">Food</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="type3" name="type" value="Other" onChange={(e) => setType(e.value)} checked={type === 'Other'} />
                        <label htmlFor="city2">Other</label>
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