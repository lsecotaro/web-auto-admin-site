import React from 'react'

class ProductTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            backendBaseUrl: props.backendBaseUrl,
            products: []
        };
    }
    componentDidMount() {
        fetch(this.state.backendBaseUrl+"v1/products")
            .then(res => res.json())
            .then((data) => {
                this.setState({ products: data })
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map((product) => (
                    <tr key={product.id}>
                        <td >{product.categories[0].name}</td>
                        <td >{product.title}</td>
                        <td >{product.description}</td>
                        <td >{product.price}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default ProductTable