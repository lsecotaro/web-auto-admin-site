import React from 'react'

class ProductList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            backendBaseUrl: props.backendBaseUrl,
            products: [],
            categoryName: props.match.params.id
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({categoryName:nextProps.match.params.id});

        if(nextProps.match.params.id !== this.props.match.params.id) {
            this.fetchData(this.state.backendBaseUrl + "v1/products/" + nextProps.match.params.id);
        }
    }

    componentDidMount() {
        this.fetchData(this.state.backendBaseUrl + "v1/products/" + this.props.match.params.id)
    }

    fetchData(url){
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                this.setState({products: data})
            })
            .catch(console.log)
    }

    render() {
        const { products } = this.state;

        let productList = products.length > 0
            && products.map((product, i) => {
                return (
                    <div className="card" key={product.id}>
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
                            <p className="card-text">{product.description}</p>
                        </div>
                    </div>
                )
            }, this);

        return (
            <div>
                <h1>{this.state.categoryName}</h1>
                {productList}
            </div>
        )
    }

}

export default ProductList