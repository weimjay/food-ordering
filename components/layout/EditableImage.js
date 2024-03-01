import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link, setLink}) {

    async function handleAvatarChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(response => {
                return response.json().then(resData => {
                    if (resData.ok && resData.filepath) {
                        setLink(resData.filepath);
                    } else {
                        throw new Error('Something went wrong!');
                    }
                })
            })
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete!',
                error: 'Upload error! Please try again.',
            })
        }
    }

    return (
        <>
            {link && (
                <Image className="rounded-lg mb-1" src={link} width={128} height={128} alt={'avatar'} />
            )}
            {!link && (
                <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                    No image
                </div>
            )}
            <label>
                <input type="file" className="hidden" onChange={handleAvatarChange}/>
                <span className="block border border-gray-300 rounded-lg p-2
                                text-center cursor-pointer">Edit</span>
            </label>
        </>
    );
}