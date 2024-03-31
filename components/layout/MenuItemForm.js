import EditableImage from "@/components/layout/EditableImage";
import {useEffect, useState} from "react";
import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import MenuItemProps from "@/components/layout/MenuItemProps";

export default function MenuItemForm({onSubmit, menuItem}) {

    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredients, setExtraIngredients] = useState(menuItem?.extraIngredients || []);
    const [tag, setTag] = useState(menuItem?.tag || '');

    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories);
                if (!category) setCategory(categories[0].id);
            });
        })
    }, []);

    return (
        <form className="mt-8 mx-w-2xl mx-auto" onSubmit={ev =>
            onSubmit(ev, {image, name, description, basePrice, sizes, extraIngredients, category, tag})}>
            <div className="md:grid items-start gap-4" style={{gridTemplateColumns:'.3fr .7fr'}}>
                <div>
                    <EditableImage link={image} setLink={setImage}/>
                </div>
                <div className="grow">
                    <label>Item name</label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                    <label>Description</label>
                    <input type="text" value={description} onChange={ev => setDescription(ev.target.value)}/>
                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option value={c._id} key={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <label>Base price</label>
                    <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)}/>

                    <MenuItemProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes}/>
                    <MenuItemProps name={'Extra ingredients'} addLabel={'Add extra ingredients'}
                                   props={extraIngredients} setProps={setExtraIngredients}/>

                    <label>Tag</label>
                    <input type="text" value={tag} onChange={ev => setTag(ev.target.value)}/>
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );
}