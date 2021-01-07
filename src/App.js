import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

const WINES_URL = 'http://myapi-profstream.herokuapp.com/api/06f82d/wines'
const BOOKS_URL = 'http://myapi-profstream.herokuapp.com/api/ffbede/books'
const PEOPLE_URL = 'http://myapi-profstream.herokuapp.com/api/fdf5d8/persons'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/wines">Wines</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/wines">
              <Wines />
            </Route>
            <Route path="/people">
              <People />
            </Route>
            <Route path="/books">
              <Books />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

class Wines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getWines() {
      try {
        const res = await axios.get(WINES_URL);
        this.setState({ wines: res.data });
      } catch(e) {
        console.error(e);
      }
    }
    componentDidMount() {
      this.getWines();
    }
    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value})
    }

    async handleSubmit(e) {
      e.preventDefault();
      const { name, year, grapes, country, region, description, picture, price } = this.state;
      const wine = { name, year, grapes, country, region, description, picture, price };
      try {
        const res = await axios.post(WINES_URL, wine);
        console.log(res.data);

        const updateRes = await axios.get(WINES_URL);
        this.setState({ wines: updateRes.data });
    } catch(e) {
      console.error(e.message);
    }
    }

    async handleDelete(id) {
        try {
        const res = await axios.delete(WINES_URL + '/' + id); // target wine id
        console.log(res.data);

        const updateRes = await axios.get(WINES_URL);
        this.setState({ wines: updateRes.data });
      } catch(e) {
        console.error(e.message)
      }
    }
      render() {
      return (
        <div className="wines">
          <ul>
            { 
            this.state.wines && this.state.wines.map(wine =>( 
            <li>
              { wine.name }: price { wine.price } <button onClick= { () => this.handleDelete(wine.id)
              }>Delete wine</button>
              </li>
              ))      
            }
          </ul>
          <form className="new-wine-form"
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }>
          <label>
            Wine name:
            <input type="text" name="name" />
          </label>
          <label>
            Year wine was made:
            <input type="text" name="year" />
          </label>
          <label>
            Grapes used:
            <input type="text" name="grapes" />
          </label>
          <label>
            Country of wine:
            <input type="text" name="country" />
          </label>
          <label>
            Wine region:
            <input type="text" name="region" />
          </label>
          <label>
            Description of wine:
            <input type="text" name="description" />
          </label>
          <label>
            Picture url:
            <input type="text" name="picture" />
          </label>
          <label>
            Price:
            <input type="text" name="price" />
          </label>

          <input type="submit" />
        </form>
        </div>
      )
    }
}




class People extends App {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getPeople() {
      try {
        const res = await axios.get(PEOPLE_URL);
        this.setState({ people: res.data });
      } catch(e) {
        console.error(e);
      }
    }
    componentDidMount() {
      this.getPeople();
    }
    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value})
    }

    async handleSubmit(e) {
      e.preventDefault();
      const { firstname, lastname, email, username } = this.state;
      const person = { firstname, lastname, email, username };
      try {
        const res = await axios.post(PEOPLE_URL, person);
        console.log(res.data);

        const updateRes = await axios.get(PEOPLE_URL);
        this.setState({ people: updateRes.data });
    } catch(e) {
      console.error(e.message);
    }
    }

    async handleDelete(id) {
        try {
        const res = await axios.delete(PEOPLE_URL + '/' + id); // target wine id
        console.log(res.data);

        const updateRes = await axios.get(PEOPLE_URL);
        this.setState({ people: updateRes.data });
      } catch(e) {
        console.error(e.message)
      }
    }
      render() {
      return (
        <div className="people">
          <ul>
            { 
            this.state.people && this.state.people.map(person => 
            (<li>
              { person.firstname } { person.lastname }: username { person.username } <button onClick= { () => this.handleDelete(person.id)
              }>Delete person</button>
              </li>
              ))      
            }
          </ul>
          <form className="new-person-form"
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }>
          <label>
            First name:
            <input type="text" name="firstname" />
          </label>
          <label>
            Last name:
            <input type="text" name="lastname" />
          </label>
          <label>
            Email:
            <input type="text" name="email" />
          </label>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          
          <input type="submit" />
        </form>
        </div>
      )
    }
}



class Books extends App {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getBooks() {
      try {
        const res = await axios.get(BOOKS_URL);
        this.setState({ books: res.data });
      } catch(e) {
        console.error(e);
      }
    }
    componentDidMount() {
      this.getBooks();
    }
    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value})
    }

    async handleSubmit(e) {
      e.preventDefault();
      const { title, author, release_date, image } = this.state;
      const book = { title, author, release_date, image };
      try {
        const res = await axios.post(BOOKS_URL, book);
        console.log(res.data);

        const updateRes = await axios.get(BOOKS_URL);
        this.setState({ books: updateRes.data });
    } catch(e) {
      console.error(e.message);
    }
    }

    async handleDelete(id) {
        try {
        const res = await axios.delete(BOOKS_URL + '/' + id); 
        console.log(res.data);

        const updateRes = await axios.get(BOOKS_URL);
        this.setState({ books: updateRes.data });
      } catch(e) {
        console.error(e.message)
      }
    }
      render() {
      return (
        <div className="books">
          <ul>
            { 
            this.state.books && this.state.books.map(book => 
            <li>
              { book.title }: author { book.author } <button onClick= { () => this.handleDelete(book.id)
              }>Delete book</button>
              </li>
              )      
            }
          </ul>
          <form className="new-book-form"
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }>
          <label>
            Book title:
            <input type="text" name="title" />
          </label>
          <label>
            Author:
            <input type="text" name="author" />
          </label>
          <label>
            Release_date:
            <input type="text" name="release_date" />
          </label>
          <label>
            Image:
            <input type="text" name="image" />
          </label>
          

          <input type="submit" />
        </form>
        </div>
      )
    }
}


export default App;
