import React from 'react'

class ProductList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            baseUrl: props.backendBaseUrl,
            products: []
        };
    }
    componentDidMount() {
        fetch(this.state.backendBaseUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({ products: data })
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <center><h1>{this.props.match.params.id}</h1></center>
                {this.state.products.map((product) => (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
                            <p className="card-text">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}

export default ProductList