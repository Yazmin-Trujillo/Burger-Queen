import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './CreateProduct.css';


type Props = {
    onClose: () => void,
}

export const CreateProduct = ({ onClose }: Props) => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    // const [value3, setValue3] = useState('');
    const [type, setType] = useState(null);
    const [value9, setValue9] = useState<number | null>(0);


    function save() {
        onClose()
    }

    return (
        <div className='backdrop'>
            <div className='container'>
                <h2>Product Details</h2>
                <div className='main'>

                    <h3>Name</h3>
                    <InputText value={value1} onChange={(e) => setValue1(e.target.value)} />
                    <span className="ml-2">{value1}</span>

                    <h3>Description</h3>
                    <InputTextarea value={value2} onChange={(e) => setValue2(e.target.value)} rows={5} cols={30} autoResize />

                    <h3>Price</h3>
                    {/* <InputText value={value3} onChange={(e) => setValue3(e.target.value)} />
            <span className="ml-2">{value3}</span> */}
                    {/* <label htmlFor="currency-us">Dollars</label> */}
                    <InputNumber inputId="currency-us" value={value9} onValueChange={(e) => setValue9(e.value)} mode="currency" currency="USD" locale="en-US" />

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
                        <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-button-text" />
                    </div>
                </div>

            </div>
        </div>

    )
}