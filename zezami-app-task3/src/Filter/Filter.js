import { useState } from "react";
import ProductTable from "../Product/ProductTable";
import {Col, Container, Form, InputGroup, Row, Spinner} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

function Filter ({ data, filteredProducts, setFilteredProduct , loading}) {

    const handleFilter = (e) => {
        const filterText = e.target.value.toLowerCase();
        filteredProducts = data.filter((product) => product.title.toLocaleLowerCase().includes(filterText))
        setFilteredProduct(filteredProducts);
    };
    
    return (
        <Container>
            <Row>
                <Col className="mt-5">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><Search/></InputGroup.Text>
                        <Form.Control
                            placeholder="Search Product"
                            aria-label="search"
                            aria-describedby="basic-addon1"
                            onChange={handleFilter}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    {loading === true ?  
                        ( 
                            <div>
                                <Spinner animation="grow" size="sm" role="status" aria-hidden="true" />
                                <span className="px-2">Loading...</span>
                            </div>
                        ) : (<ProductTable data={filteredProducts} /> )}
                </Col>
            </Row>
        </Container>
    );
}

export default Filter;