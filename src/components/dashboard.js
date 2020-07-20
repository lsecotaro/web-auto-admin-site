import React from 'react'
import ProductForm from "./product/productForm";
import CategoryForm from "./category/categoryForm";

const Dashboard = props => (
    <div>
        <h1>Administrar</h1>
        <CategoryForm backendBaseUrl = {props.backendBaseUrl}/>
        <ProductForm/>
    </div>
);
export default Dashboard;