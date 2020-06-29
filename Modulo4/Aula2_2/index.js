
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<usuario>:<senha>@cluster0-dxvwu.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async(err) => {
    // const collection = client.db("test").collection("devices");
    // // perform actions on the collection object
    const databaselist = await client.db().admin().listDatabases();

    console.log('Databases:');
    
    databaselist.databases.forEach(db => console.log(` - ${db.name}`));

    client.close();
});
