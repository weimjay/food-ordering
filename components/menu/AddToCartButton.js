import FlyingButton from 'react-flying-item';

export default function AddToCartButton({hasSizesOrExtras, onClick, basePrice, image}) {
    if (!hasSizesOrExtras) {
        return (
            <div className="flying-button-parent mt-4">
                <FlyingButton
                    targetTop={'5%'}
                    targetLeft={'90%'}
                    src={image}
                >
                    <div onClick={onClick}>
                        Add to cart ${basePrice}
                    </div>
                </FlyingButton>
            </div>

        )
    }
    return (
        <button onClick={onClick} type="button"
                className="mt-4 bg-primary text-white rounded-full px-8 py-2">
            <span>Add to cart from ${basePrice}</span>
        </button>
    );
}