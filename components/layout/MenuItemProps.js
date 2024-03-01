import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import {useState} from "react";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";

export default function MenuItemProps({name, addLabel, props, setProps}) {

    const [isOpen, setIsOpen] = useState(false);

    function addProp(ev) {
        setProps(oldProps => {
            return [...oldProps, {name: '', price: 0}];
        });
    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProp(index) {
        setProps(prev => prev.filter((v, i) => i !== index));
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button onClick={() => setIsOpen(prev => !prev)} type="button" className="inline-flex p-1 border-0 justify-start">
                {isOpen && (<ChevronUp />)}
                {!isOpen && (<ChevronDown />)}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div className="flex items-end gap-2" key={index}>
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Size name" value={size.name}
                                   onChange={ev => editProp(ev, index, 'name')}/>
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input type="text" placeholder="Size price" value={size.price}
                                   onChange={ev => editProp(ev, index, 'price')}/>
                        </div>
                        <div>
                            <button type="button" onClick={() => removeProp(index)} className="bg-white mb-3">
                                <Trash/>
                            </button>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addProp} className="bg-white">
                    <Plus/>
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    );
}