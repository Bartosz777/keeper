import React, { useState, useEffect } from "react"
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import CreateArea from "./components/CreateArea"
import Note from "./components/Note"

function App() {
  const [items, setItems] = useState([])


  function getNotes() {
    axios.get("http://localhost:4000/")
    .then((res) => {
      setItems(res.data)
    })
    .catch((err) => console.log(err))
  }
  
  function deleteItem(id) {

    axios.delete("http://localhost:4000/" + id)
    .then(res => console.log(res.data))
    .catch((err) => console.log(err))

    setItems(
      items.filter((item) => {
         return item.id !== id;
      })
   );
  }

  useEffect(() => {
    getNotes()
  })


  return (
    <>
    <Header />
      <CreateArea />
      {items.map((item, index) => {
        return (
          <Note
            key={index}
            id={item._id}
            title={item.title}
            content={item.content}
            deleteItem={deleteItem}
          />
        );
      })}
      <Footer />
    </>
  );
}

export default App;
