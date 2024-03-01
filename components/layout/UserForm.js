import EditableImage from "@/components/layout/EditableImage";
import {useState} from "react";
import useProfile from "@/components/UseProfile";

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
                <label>Phone</label>
                <input type="tel" placeholder="Phone number" value={phone}
                       onChange={ev => setPhone(ev.target.value)}/>
                <label>Street address</label>
                <input type="text" placeholder="Street address" value={street}
                       onChange={ev => setStreet(ev.target.value)}/>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>Postcode</label>
                        <input type="text" placeholder="Postcode" value={postcode}
                               onChange={ev => setPostcode(ev.target.value)}/>
                    </div>
                    <div>
                        <label>City</label>
                        <input type="text" placeholder="City" value={city}
                               onChange={ev => setCity(ev.target.value)}/>
                    </div>
                </div>

                <label>Country</label>
                <input type="text" placeholder="Country" value={country}
                       onChange={ev => setCountry(ev.target.value)}/>

                {loggedInUser && (
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