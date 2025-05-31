import clientPromise from "@/lib/mongoDB";

export async function POST(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("linksway");
    const collection = db.collection("links");

    const existingHandle = await collection.findOne({ handle: body.handle });
    if (!existingHandle) {
        return Response.json({ success: false, error: true, message: 'Handle NOT Found! First Create Then Search', result: null, status: 400 });
    } else {
        return Response.json({ success: true, error: false, message: 'found successfully', result: existingHandle, status: 200 });
    }
}