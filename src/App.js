import React from 'react';
import './App.css';

const notePlaceholder = "Lisää uusi tehtävä...";

function App() {
  return (
    <div className="App">
      <NoteTable />
    </div>
  );
}

class NoteTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNote: "",
      notes: []
    };
    this.updateText = this.updateText.bind(this);
  }

  updateText(e) {
    this.setState({newNote: e.currentTarget.value});
  }

  render() {
    return (
      <div>
        <h1>Todo-lista</h1>
        <NoteForm newNote={this.state.newNote} onTextChange={this.updateText}/>
        <NoteList />
        <Buttons />
      </div>
    );
  }
}

function NoteForm(props) {
  
  const handleAddNote = () => {
    console.log("Clicked +");
  }

  return (
    <div>
      <input 
        type="text"
        placeholder={notePlaceholder}
        value={props.newNote}
        onChange={props.onTextChange}
      />
      <button type="button" onClick={handleAddNote}>
        +
      </button>
    </div>
  );
  
}

function NoteList(props) {

  return (
    <ul>
      <li>Tehtävä A<button>X</button></li>
      <li>Tehtävä B<button>X</button></li>
    </ul>
  );
  
}

function Buttons(props) {
  
  return (
    <div>
      <button>
        Lajittele A-Ö
      </button>
      <button>
        Poista kaikki
      </button>
    </div>
  );

}



export default App;
