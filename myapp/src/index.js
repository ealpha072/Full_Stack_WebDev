import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import axios from 'axios'

//http://localhost:3001/api/notes
//https://stormy-hollows-68644.herokuapp.com/api/notes/
axios.get('http://localhost:3001/api/notes').then(response=>{
  const notes = response.data
  ReactDOM.render(<App notes={notes}/>, document.getElementById('root'));
})


