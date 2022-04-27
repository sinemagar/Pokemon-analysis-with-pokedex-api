const exp = require("constants")
const express = require("express");
const https = require("https");


const app = express();
const port = 3000;
app.use(express.static('front'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.listen(port, function() {

    console.log("Server is stared at port: " + port)

});

//kullanici ilk geldiğinde göreceği sayfa
/*app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})
*/
app.post("/", function(req, res) {
    let id = Number(req.body.pokemon);
    console.log(id)
    let url = "https://pokeapi.co/api/v2/pokemon/" + id;
    //console.log(url)
    let pokeImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/" +
        id + ".png";

    https.get(url, function(response) {
        var responseData = " ";
        response.on("data", function(dataChunk) {
            responseData += dataChunk;
        });

        response.on("end", function() {
            var pokeInfo = JSON.parse(responseData);
            //console.log(pokeInfo);
            var pokemonName = pokeInfo.name;
            //console.log(pokemonName);
            var pokeType = pokeInfo.types[0].type.name;
            res.write(
                "<h1> Name of the pokemon you searhed is " + pokemonName + "</h1>"
            );
            res.write(
                "<img src=" + pokeImg + ">"
            );
            res.write(
                "<h3> The main type of pokemon: " + pokeType + "</h3>"
            );

            res.send()


        })
    })
})