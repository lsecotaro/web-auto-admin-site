import React from 'react';
import axios from 'axios'

class CategoryForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            categories: [],
            categoryName:"",
            backendBaseUrl: props.backendBaseUrl,
            selectedCategoryId: "0"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
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
        console.log("onSummit");
        console.log(this.state);
        const cat = {};
        cat.name = this.state.categoryName;
        cat.active = true;
        if(cat.name === ""){
            event.preventDefault();
            return;
        }

        axios
            .post(this.state.backendBaseUrl + "v1/categories", cat)
            .then(response => {
                console.log(response);
                this.setState(state => {
                    console.log(state);
                    const categories = state.categories.push(cat);
                    return {
                        categories,
                        categoryName:"",
                        selectedCategoryId: "0"
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    onRemove(event){
        console.log("onRemove");
        const categoryId = this.state.selectedCategoryId;
        if(categoryId === "0"){
            event.preventDefault();
            return;
        }
        axios
            .delete(this.state.backendBaseUrl + "v1/categories/" + categoryId)
            .then(response => {
                console.log(response);
                this.setState(state => {
                    console.log(state);
                    return {
                        categoryName:""
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
        alert("categoria eliminada")

        // event.preventDefault();
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
                        Categorías:
                        <select name="selectedCategoryId" onChange={this.handleInputChange}>
                            <option key={-1} value={0}>Sin Categoria</option>
                            {categoriesList}
                        </select>
                        <button name="btnRemove" onClick={this.onRemove}>Eliminar</button>
                    </label>
                    <br/>
                    <label>
                        Nombre:
                        <input
                            name="categoryName"
                            type="text"
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <br/>
                    <input type="submit" value="Agregar" />
                </form>
                <br/>
            </div>
        );
    }
}

export default CategoryForm;
