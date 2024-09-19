import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


function ProductAPI({ setData, setFilteredProduct, setLoading}) {

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const response = await axios.get("https://dummyjson.com/products");
            setData(response.data['products']);
            setFilteredProduct(response.data['products']);
            setLoading(false);
        };
        fetchProducts();
      },[]);

};

export default ProductAPI;