import React from 'react'
import ProductForm from "./product/productForm";
import CategoryForm from "./category/categoryForm";
import ProductTable from "./product/productTable";

const Dashboard = props => (
    <div>
        <h1>Administrar</h1>
        <CategoryForm backendBaseUrl = {props.backendBaseUrl}/>
        <ProductForm backendBaseUrl = {props.backendBaseUrl}/>
        <ProductTable backendBaseUrl = {props.backendBaseUrl}/>
    </div>
);
export default Dashboard;