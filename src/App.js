import './App.css';
import axios from "axios";
import { useQuery } from "react-query";

import Header from './components/Header/Header';
import Table from './components/Table/Table';

// async function getProducts() {
//   const { data } = await axios.get(`${process.env.REACT_APP_API}/products`);

//   return data;
// }

function App() {
  return (
    <>
      <Header />
      <Table />
    </>
  );
}

export default App;
