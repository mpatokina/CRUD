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

const WINES_URL = "http://myapi-profstream.herokuapp.com/api/c8aba8/wines/"

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/wines">Wines</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/wines">
              <Wines />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


class Home extends React.Component {
  render() {
    return(
      <h1>Home component works!</h1>
    )
  }
}

class Wines extends React.Component{
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
        const res = await axios.delete(WINES_URL + id); // target wine id
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
            this.state.wines && this.state.wines.map(wine => 
            <li>
              { wine.name }: price { wine.price } <button onClick= { () => this.handleDelete(wine.id)
              }>Delete wine</button>
              </li>
              )      
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

export default App;
