import React, { useState } from 'react';
import ProductAPI from './API/ProductAPI.js';
import Filter from './Filter/Filter.js';
import {Container, Row, Col} from 'react-bootstrap';

function App() {

  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProduct] = useState([]);

  const [loading, setLoading] = useState(false);
  

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="align-items-center justify-content-center text-center mt-4">
          <h1>Zezamii Assignment</h1>
          </Col>
        </Row>
        <div>
          <ProductAPI setData={setData} setFilteredProduct={setFilteredProduct} setLoading={setLoading}/>
          <Filter data={data} filteredProducts={filteredProducts} setFilteredProduct={setFilteredProduct} loading={loading} />
        </div>
      </Container>
    </div>
  );
}

export default App;
