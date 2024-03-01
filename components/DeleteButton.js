import {useState} from "react";

export default function DeleteButton({label, onDelete}) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="absolute bg-black/80 inset-0 h-full flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <div className="mb-6">Are you sure you want to delete?</div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowConfirm(false)} type="button">Cancel</button>
                        <button onClick={onDelete} type="button" className="primary">Yes,&nbsp;delete!</button>
                    </div>
                </div>
            </div>

        );
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    );
}