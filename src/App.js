import React from 'react';
import './App.css';

const notePlaceholder = "Lisää uusi tehtävä...";

function App() {
  return (
    <div className="Table">
      <TodoTable />
    </div>
  );
}

class TodoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: "",
      todos: []
    };
    this.updateText = this.updateText.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleDoUndo = this.handleDoUndo.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  updateText(e) {
    this.setState({newTodo: e.currentTarget.value});
  }

  handleAddTodo() {
    const newTodo = this.state.newTodo.trim();
    const todos = this.state.todos.slice();
    const index = todos.indexOf(newTodo);
    if(newTodo.length === 0 || index != -1) // If new todo is empty or is already in the list
      return;
    todos.push(newTodo);
    this.setState({
      newTodo: "",
      todos: todos
    });
  }

  handleRemoveTodo(todo) {
    const todos = this.state.todos.slice();
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    this.setState({todos: todos});
  }

  handleRemoveAll() {
    this.setState({todos: []});
  }

  handleSort() {
    const todos = this.state.todos.slice();
    todos.sort((a,b) => {return a.toLowerCase().charCodeAt(0)-b.toLowerCase().charCodeAt(0)});
    this.setState({todos: todos});
  }

  handleDoUndo() {

  }

  render() {
    return (
      <div>
        <h1>Todo-lista</h1>
        <TodoForm
          newTodo={this.state.newTodo}
          onChangeText={this.updateText}
          onClickAdd={this.handleAddTodo}
        />
        <TodoList
          todos={this.state.todos}
          onClickRemove={this.handleRemoveTodo}
          onClickDoUndo={this.handleDoneUndone}
        />
        <Buttons 
          onClickRemoveAll={this.handleRemoveAll}
          onClickSort={this.handleSort}
        />
      </div>
    );
  }
}

function TodoForm(props) {
  return (
    <div>
      <input 
        type="text"
        placeholder={notePlaceholder}
        value={props.newTodo}
        onChange={props.onChangeText}
      />
      <button type="button" onClick={props.onClickAdd}>
        +
      </button>
    </div>
  );
  
}

function TodoList(props) {
  const todoItems = props.todos.map((todo) =>
    <li key={todo}>
      {todo}
      <button type="button" onClick={() => props.onClickRemove(todo)}>
        X
      </button>
    </li>
  );
  return (
    <ul>
      {todoItems}
    </ul>
  );
  
}

function Buttons(props) {
  return (
    <div>
      <button type="button" onClick={props.onClickSort}>
        Lajittele A-Ö
      </button>
      <button type="button" onClick={props.onClickRemoveAll}>
        Poista kaikki
      </button>
    </div>
  );

}



export default App;
