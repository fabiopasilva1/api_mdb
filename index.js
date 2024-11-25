require("dotenv").config();
const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db(process.env.MONGODB_DB);
    const credlinks = database.collection("target_credlinks");

    // Query for a movie that has the title 'Back to the Future'
    const query = { uf: "PB" };
    const base = credlinks.find(query).limit(10);

    const results = await base.toArray();
    console.log({ results });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
