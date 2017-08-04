import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import logo from '../../logo.svg';
import axios from 'axios';
import './App.css';

import ProductView from '../ProductView/ProductView';

class App extends Component {

  server = 'http://localhost:3000';

  constructor() {
    super();

    this.state = {
      products: []
    }

    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }
  
fetchProducts(){
  console.log(`${this.server}/api/products/`);
  axios.get(`${this.server}/api/products/`)
  .then((res)=>{
    console.log(res.data);
    this.setState({products:res.data});
  })
  .catch((err)=>{
    console.log(err);
  });
}
    
  render() {

    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2  className="App-intro">Welcome to React</h2>
          <p>
          Create for learning React Node CURUD :)
        </p>
        </div>
        
      </div>
   
      <Container>
        
        <ProductView
        
        products = {this.state.products}
         />
      </Container>
        <br/>
      </div>
    );
  }
}

export default App;
