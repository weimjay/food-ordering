import {useContext, useState} from "react";
import {CartContext} from "@/components/AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem) {
    const {image, name, description, basePrice, sizes, extraIngredients} = menuItem;
    const {addToCart} = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    function handleAddToCart() {
        if (sizes.length > 0 || extraIngredients.length > 0) {
            setShowPopup(true);
            return;
        }
        if (showPopup) {
            addToCart(menuItem, selectedSize, selectedExtras);
        } else {
            addToCart(menuItem);
        }
        setShowPopup(false);
        toast.success('Added to cart!');
    }
    function handleExtraClick(ev, extra) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extra]);
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extra.name);
            })
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    return (
        <>
            {showPopup && (
                <div onClick={() => setShowPopup(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div className="my-8 bg-white p-2 rounded-lg max-w-md">
                        <div className="overflow-y-scroll p-2" style={{maxHeight: 'calc(100vh - 100px)'}}>
                            <Image src={image} alt={name} width={300} height={200} className="mx-auto" />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                            {sizes?.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-center text-gray-700">Pick your size</h3>
                                    {sizes.map(size => (
                                        <label key={size._id} className="flex items-center gap-2 p-2 border rounded-md mb-1">
                                            <input onChange={() => setSelectedSize(size)}
                                                   checked={selectedSize?.name === size.name} type="radio" name="size" /> {size.name} ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIngredients?.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-center text-gray-700">Any extras?</h3>
                                    {extraIngredients.map(extra => (
                                        <label key={extra._id} className="flex items-center gap-2 p-2 border rounded-md mb-1">
                                            <input onChange={ev => handleExtraClick(ev, extra)} type="checkbox" name={extra.name}/> {extra.name} +${extra.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button onClick={handleAddToCart} className="primary sticky bottom-2" type="button">Add to cart ${selectedPrice}</button>
                            <button onClick={() => setShowPopup(false)} className="mt-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCart} {...menuItem}/>
        </>
    );
}