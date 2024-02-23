import path from "node:path";
import {writeFile} from "fs/promises";

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) {
        return Response.json({ok: false, message: "No file received"});
    }
    const ext = file.name.split('.').slice(-1)[0];

    const date = new Date();
    const month = date.getMonth() + 1;
    const monthStr = month < 10 ? '0'+month : String(month);
    const filename = date.getFullYear() + monthStr + '' + date.getDate() + '' + Date.now() + '.' + ext;

    const buffer = Buffer.from(await file.arrayBuffer());
    try {
        const filepath = "/uploads/" + filename;
        await writeFile(path.join(process.cwd(), 'public'+filepath), buffer);
        return Response.json({ok: true, message: "Success", filepath: filepath});
    } catch (error) {
        console.log("Error occurred ", error);
        return Response.json({ok: false, message: "Failed"});
    }
}