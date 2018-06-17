import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List';
import Form from './Form';

class App extends Component {
  componentDidMount() {
    this.getContacts();
  }

  getContacts = () => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(passwords => console.log(passwords));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <List />
        <Form />
      </div>
    );
  }
}

export default App;
