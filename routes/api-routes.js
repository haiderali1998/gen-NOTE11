const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const path = require("path");


pathAPI = function(app) {

    app.get("/api/notes", function(req, res) {
       
        res.json(data);

    });

    app.get("/api/notes/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });


    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let specificNote = (data.length).toString();
        console.log(specificNote);
        newNote.id = specificNote;
        data.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    

    });

    
    app.delete("/api/notes/:id", function(req, res) {

        let noteSpecific = req.params.id;
        let newNoteSpecific = 0;
        console.log(`Deleting note ${noteSpecific}`);
        data = data.filter(currentNote => {
           return currentNote.id != noteSpecific;
        });
        for (currentNote of data) {
            currentNote.id = newNoteSpecific.toString();
            newNoteSpecific++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

}

module.exports = pathAPI