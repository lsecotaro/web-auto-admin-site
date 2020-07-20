import React from 'react';

class CategoryForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            categories: [],
            categoryName:"",
            backendBaseUrl: props.backendBaseUrl
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(this.state.backendBaseUrl + "v1/categories", {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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
        const cat = {};
        cat.name = this.state.categoryName;
        cat.active = true;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(cat),
            redirect: 'follow'
        };
        console.log(requestOptions);
        fetch(this.state.backendBaseUrl + "v1/categories", requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                this.setState(state => {
                    const categories = state.categories.push(cat);
                    return {
                        categories,
                        categoryName:""
                    }
                })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });



            // .then(response => response.json())
            // .then(cat => this.setState(state => {
            //     const categories = state.categories.push(cat);
            //     return {
            //         categories,
            //         categoryName:""
            //     }
            // }))
            // .catch(console.log);

        // this.setState(state => {
        //     const categories = state.categories.push(cat);
        //     return {
        //         categories,
        //         categoryName:""
        //     }
        // });
        //
        // alert('Submitted: ' + JSON.stringify(this.state));
        event.preventDefault();
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
                        <select>
                            {categoriesList}
                        </select>
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
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CategoryForm;
