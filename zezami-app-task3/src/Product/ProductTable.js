import React from "react";
import Table from 'react-bootstrap/Table';

const ProductTable = ({ data }) => {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>{product.description}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )

};

export default ProductTable;