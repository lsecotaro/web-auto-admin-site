import React from 'react';
import axios from "axios";

class ProductForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            backendBaseUrl: props.backendBaseUrl,
            category: "0",
            title: "",
            description:"",
            price: 0,
            categories: [],
            selectedCategoryId: "0"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(this.state.backendBaseUrl + "v1/categories", {
            credentials: 'same-origin',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'CSRF-Token': 'token'
            }
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ categories: data })
            })
            .catch(console.log);
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
                [name]: value
            });
    }

    handleSubmit(event) {
        if(this.state.category === "0"){
            alert("debe seleccionar una categoria");
            return;
        }
        const prod = {};
        const cat = this.state.categories.find(c => c.id === this.state.category);
        prod.categories = [cat];
        prod.title = this.state.title;
        prod.description = this.state.description;
        prod.price = this.state.price;

        axios
        .post(this.state.backendBaseUrl + "v1/products", prod)
        .then(response => {
            console.log(response);
            this.setState(state => {
                console.log(state);
                return {
                    category: "Sin Categoria",
                    title: "",
                    description:"",
                    price: 0,
                    selectedCategoryId: "0"
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        const { categories } = this.state;

        let categoriesList = categories.length > 0
            && categories.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);

        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Categoría:
                <select name = "category" value={this.state.value} onChange={this.handleInputChange}>
                    <option key={-1} value={0}>Sin Categoria</option>
                    {categoriesList}
                </select>
                </label>
                <br/>
                <label>
                    Nombre:
                    <input
                        name="title"
                        type="text"
                        onChange={this.handleInputChange}
                    />
                </label>
                <br/>
                <label>
                    Descripción:
                    <textarea
                        name="description"
                        type="text"
                        onChange={this.handleInputChange}
                    />
                </label>
                <br/>
                <label>
                    Precio:
                    <input
                        name="price"
                        type="money"
                        onChange={this.handleInputChange}
                    />
                </label>
                <br/>
                <input type="submit" value="Agregar" />
            </form>
            </div>
        );
    }
}

export default ProductForm;
