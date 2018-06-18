import React, { Component } from 'react';
import './App.css';
import List from './List';
import Form from './Form';
import Spinner from './Spinner';
import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      filtered: [],
      loading: true
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(text) {
    text = text.toLowerCase();
    const filtered = this.state.contacts.filter(c => {
      return c.firstName.toLowerCase().includes(text) || c.lastName.toLowerCase().includes(text)
    })
    this.setState({filtered: filtered})
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts = () => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(res => this.setState({
        contacts: res,
        filtered: res,
        loading: false
      }));
  }

  render() {
    return (
      <div className="App">
        <Search handleSearch={this.handleSearch}/>
        {this.state.loading ? <Spinner /> : <List contacts={this.state.filtered} getContacts={this.getContacts}/>}
        <Form getContacts={this.getContacts} />
      </div>
    );
  }
}

export default App;
