export default function AddressInput({addressProps, setAddressProps}) {
    const {phone, street, postcode, city, country} = addressProps;
    return (
        <>
            <label>Phone</label>
            <input type="tel" placeholder="Phone number" value={phone}
                   onChange={ev => setAddressProps('phone', ev.target.value)}/>
            <label>Street address</label>
            <input type="text" placeholder="Street address" value={street}
                   onChange={ev => setAddressProps('street', ev.target.value)}/>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label>Postcode</label>
                    <input type="text" placeholder="Postcode" value={postcode}
                           onChange={ev => setAddressProps('postcode', ev.target.value)}/>
                </div>
                <div>
                    <label>City</label>
                    <input type="text" placeholder="City" value={city}
                           onChange={ev => setAddressProps('city', ev.target.value)}/>
                </div>
            </div>

            <label>Country</label>
            <input type="text" placeholder="Country" value={country}
                   onChange={ev => setAddressProps('country', ev.target.value)}/>
        </>
    );
}