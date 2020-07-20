import React from 'react';

class ProductForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: "",
            title: "",
            description:"",
            price: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        alert('Submitted: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render(){
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Categoría:
                <select name = "category" value={this.state.value} onChange={this.handleInputChange}>
                    <option value="CatA">Categoria A</option>
                    <option value="CatB">Categoria B</option>
                    <option value="CatC">Categoria C</option>
                    <option value="CatD">Categoria D</option>
                </select>
                </label>
                <br/>
                <label>
                    Título:
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
                <input type="submit" value="Submit" />
            </form>
            </div>
        );
    }
}

export default ProductForm;
