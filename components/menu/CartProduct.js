import Image from "next/image";
import {cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";

export default function CartProduct({product, index, readonly, ...cartCtx}) {
    return (
        <div className="flex items-center gap-4 border-b py-4">
            <div className="w-24">
                <Image src={product.image} alt={''} width={240} height={240}/>
            </div>
            <div className="grow">
                <h3 className="font-semibold">{product.name}</h3>
                {product.size && (
                    <div className="text-sm">Size: <span>{product.size.name}</span></div>
                )}
                {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                        {product.extras.map(extra => (
                            <div key={extra.name}>{extra.name} ${extra.price}</div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between">
                {!readonly && (
                    <span
                        className="rounded-full border w-8 h-8 flex items-center justify-center cursor-pointer"
                        onClick={() => cartCtx.decrCartQuantity(product)}>-
                </span>
                )}
                <span className="m-2">{product.quantity}</span>
                {!readonly && (
                    <span className="rounded-full border w-8 h-8 flex items-center justify-center cursor-pointer"
                          onClick={() => cartCtx.addToCart(product, product.size, product.extras)}>+
                    </span>
                )}
            </div>
            <div className="text-lg font-semibold">
                ${cartProductPrice(product)}
            </div>
            {!readonly && (
                <div className="ml-2">
                    <button onClick={() => cartCtx.removeCartProduct(index)} className="p-2"><Trash className="w-5 h-5"/>
                    </button>
                </div>
            )}
        </div>
    );
}