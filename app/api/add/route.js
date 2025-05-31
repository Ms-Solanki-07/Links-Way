import clientPromise from "@/lib/mongoDB";


export async function POST(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("linksway");
    const collection = db.collection("links");

    //if handle already exists, return error

    const existingHandle = await collection.findOne({ handle: body.handle });
    if (existingHandle) {
        return Response.json({ success: false, error: true, message: 'Handle already exists', result: null, status: 400 });
    } else {
        const result = await collection.insertOne(body);

        return Response.json({ success: true, error: false, message: 'Added successfully', result: result, status: 200 });
    }
}