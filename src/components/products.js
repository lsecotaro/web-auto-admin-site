import React from 'react'

const Products = ({products}) => {
    return (
        <div>
            <center><h1>Lista de Productos</h1></center>
            {products.map((product) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{product.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{product.price}</h6>
                        <p class="card-text">{product.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products