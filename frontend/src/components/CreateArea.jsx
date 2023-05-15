import React, {
    useState
  } from "react";
  import axios from 'axios';
  import AddIcon from '@mui/icons-material/Add';
  import Fab from '@mui/material/Fab';
  import Zoom from '@mui/material/Zoom';
  
  function CreateArea(props) {
    const [isActive, setIsActive] = useState(false);
    const [note, setNote] = useState({
      title: "",
      content: ""
    });
  
    function onChangeHandler(event) {
      const {
        name,
        value
      } = event.target;
      setNote(prevNote => {
        return {
          ...prevNote,
          [name]: value
        };
      });
    }
  
    function createItem(event) {
      event.preventDefault();
  
      axios.post("http://localhost:4000/", note).then(res => console.log(res));
      
  
      setNote({
        title: "",
        content: ""
      });
    }
  
    function onClickHandler() {
      setIsActive(prevValue => !prevValue);
    }
  
    return ( 
    <div>
      <form className = "create-note" onSubmit = {createItem} >
      {isActive && <input onChange = {onChangeHandler} value = {note.title} name = "title" placeholder = "Title" />}
      <textarea onClick={onClickHandler} onChange = {onChangeHandler} value = { note.content || ""} name = "content" placeholder = "Take a note..." rows={isActive ? "3" : "1"} />
  
      <Zoom in={isActive}>
        <Fab type = "submit" ><AddIcon /></Fab> 
      </Zoom>
      </form>    
      </div>
    );
  }
  
  export default CreateArea;