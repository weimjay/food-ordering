import EditableImage from "@/components/layout/EditableImage";
import {useState} from "react";
import useProfile from "@/components/UseProfile";
import AddressInput from "@/components/layout/AddressInput";

export default function UserForm({user, onSubmit}) {

    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [street, setStreet] = useState(user?.street || '');
    const [postcode, setPostcode] = useState(user?.postcode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');

    const [admin, setAdmin] = useState(user?.admin || false);
    const {data: loggedInUser} = useProfile();

    function handleAddressChange(propName, value) {
        const setFunc = 'set'+propName[0].toUpperCase()+propName.substring(1);
        eval(setFunc+"(value)");
    }

    return (
        <div className="flex gap-4">
            <div>
                <div className="p-2 rounded-lg relative">
                    <EditableImage link={image} setLink={setImage}/>
                </div>
            </div>

            <form className="grow" onSubmit={ev => onSubmit(ev, {
                name: userName, image, phone, street, postcode, city, country, admin,
            })}>
                <label>
                    First and last name
                </label>
                <input type="text" placeholder="First and last name" value={userName}
                       onChange={ev => setUserName(ev.target.value)}/>
                <label>Email</label>
                <input type="email" disabled={true} placeholder="email" value={user?.email || ''}/>

                <AddressInput
                    addressProps={{phone, street, postcode, city, country}}
                    setAddressProps={handleAddressChange}
                />

                {(loggedInUser.admin && loggedInUser.email !== user?.email) && (
                    <div>
                        <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                            <input id="adminCb" type="checkbox" value={'1'} checked={admin} onChange={
                                ev => setAdmin(ev.target.checked)
                            }/>
                            <span>Admin</span>
                        </label>
                    </div>
                )}
                <button type={"submit"}>Save</button>
            </form>
        </div>
    );
}