require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json());


mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Note = mongoose.model("Note", noteSchema);



app.get("/", function(req, res) {
  Note.find(function(err, notes) {
    if (!err) {
      res.json(notes);
    } else {
      console.log(err);
    }
  });
})


app.post("/", function(req, res) {
  console.log(req.body)

const note = new Note({
  title: req.body.title,
  content: req.body.content
});

note.save();

})


app.delete("/:id", function(req, res) {


  Note.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      console.log(err);
    }
  })
  
})




app.listen(4000, function() {
    console.log("Server is running on port 4000");
})