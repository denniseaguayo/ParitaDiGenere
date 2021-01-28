
var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient; //Importo la libreria mongodb

/* GET users listing. */
router.get('/', function (req, res, next) {
    const uri = 'mongodb+srv://mero_maybe:mero_maybe@nraboy-sample.pr1el.mongodb.net/test'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {

        const collection = client.db("parita_genere").collection("genere_qualita");
        // perform actions on the collection object
        collection.find().limit(10).toArray((err, result) => {
            if (err) console.log(err.message); //Se c'è qualche errore lo stampo
            else res.send(result);
            client.close(); //Quando ho terminato la find chiudo la sessione con il db
        }); //Eseguo la query e passo una funzione di callback

    });

});

module.exports = router;
router.get('/luogo/:location', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    location = req.params.location;
    const uri = "mongodb+srv://mero_maybe:mero_maybe@nraboy-sample.pr1el.mongodb.net/test"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getLocation);
    
    function getLocation(err){
        if (err) console.log("Connessione al db non riuscita"); 
        else{
            const collection = client.db("parita_genere").collection("genere_qualita");
            collection.find({ 'GeoAreaName': `${location}` }).toArray(callBackQuery);
        }
    }    
    
    function callBackQuery(err,result){
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }  


});
router.get('/anno/:year', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    year = parseInt(req.params.year);
    const uri = "mongodb+srv://mero_maybe:mero_maybe@nraboy-sample.pr1el.mongodb.net/test"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getYear);

    function getYear(err){
        if (err) console.log("Connessione al db non riuscita"); 
        else{
            const collection = client.db("parita_genere").collection("genere_qualita");
        collection.find({ 'TimePeriod': `${year}`}).toArray(callBackQuery);
        }
    }

    function callBackQuery(err,result){
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }   

    
});

