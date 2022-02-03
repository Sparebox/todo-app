import React from 'react';
import './App.css';

const notePlaceholder = "Lisää uusi tehtävä...";
const defaultTodo = {value: "", isCrossedOut: false};

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
    const newTodo = {...defaultTodo, value: this.state.newTodo.trim()};
    const todos = this.state.todos;
    if(newTodo.value.length === 0) // If new todo is empty
      return;
    for(const todo of todos) {
      if(newTodo.value === todo.value) // if new todo is already in the list
        return;
    }
    todos.push(newTodo);
    this.setState({
      newTodo: "",
      todos: todos
    });
  }

  handleRemoveTodo(todo) {
    const todos = this.state.todos;
    const result = todos.filter(t => t.value !== todo.value);
    this.setState({todos: result});
  }

  handleRemoveAll() {
    this.setState({todos: []});
  }

  handleSort() {
    const todos = this.state.todos;
    todos.sort((a,b) => {
      return a.value.toLowerCase().charCodeAt(0) - b.value.toLowerCase().charCodeAt(0) // Sort alphabetically and ignore upper cases
    }); 
    this.setState({todos: todos});
  }

  handleDoUndo(todo) {
    const todos = this.state.todos;
    const result = todos.map((t) => {
      if(t.value === todo.value) {
        return {...t, isCrossedOut: !t.isCrossedOut}; // Toggle crossed out state
      } else {
        return t;
      }
    });
    this.setState({todos: result});
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
          onClickDoUndo={this.handleDoUndo}
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
        className="TodoForm"
        type="text"
        placeholder={notePlaceholder}
        value={props.newTodo}
        onChange={props.onChangeText}
      />
      <button className="Buttons" type="button" onClick={props.onClickAdd}>
        +
      </button>
    </div>
  );
  
}

function TodoList(props) {
  const todoItems = props.todos.map((todo) =>
    <TodoItem
      key={todo.value}
      todo={todo}
      onClickDoUndo={props.onClickDoUndo}
      onClickRemove={props.onClickRemove}
    />
  );
  return (
    <ul className="TodoList">
      {todoItems}
    </ul>
  );
  
}

function TodoItem(props) {
  let style = "Todo";
  if(props.todo.isCrossedOut)
    style = style + " TodoCrossedOut";
  return (
    <div>
      <li className={style} onClick={() => props.onClickDoUndo(props.todo)}>
      {props.todo.value}
      </li>
      <button className="TodoButton" type="button" onClick={() => props.onClickRemove(props.todo)}>
        X
      </button>
    </div>
    
  );
}

function Buttons(props) {
  return (
    <div>
      <button
        type="button"
        className="Buttons"
        onClick={props.onClickSort}
      >
        Lajittele A-Ö
      </button>
      <button
        type="button"
        className="Buttons"
        onClick={props.onClickRemoveAll}
      >
        Poista kaikki
      </button>
    </div>
  );

}

export default App;