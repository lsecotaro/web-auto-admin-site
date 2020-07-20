import React, {Component} from 'react'
import { Link } from "react-router-dom";

class ProductMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            backendBaseUrl: props.backendBaseUrl,
            categories: []
        };
    }

    componentDidMount() {
        fetch(this.state.backendBaseUrl + 'v1/categories', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ categories: data })
            })
            .catch(console.log)
    }

    render(){
        let mnu = <li><Link to={"/product-list/"}>Productos</Link></li>;

        if(this.state.categories.length > 0){
            mnu = this.state.categories.map((category) => (
                <li><Link to={`/product-list/${category.name}`}>{category.name}</Link></li>
            ));
        }

        return (
            mnu
        )
    }
}

export default ProductMenu;