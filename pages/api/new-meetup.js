//url of this file is /api/new-meetup

// POST /api/new-meetup

//as this is an api, this will never run on a client machine, so it is safe to expose credentials here.
import { MongoClient } from "mongodb";

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const data = req.body;

      const { title, image, address, description } = data;

      const client = await MongoClient.connect(
        "mongodb+srv://reactProject:1UGcFnoKzaKsjtSl@cluster0.sc2jwga.mongodb.net/?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection("meetups");
      //insertOne function inserts an object to the database
      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({ message: "Data inserted successfully" });
    }
  } catch (error) {
    console.log(error);
  }
}

export default handler;
