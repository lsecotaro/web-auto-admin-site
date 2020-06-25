import React, {Component} from 'react';
import Products from './components/products';
import Toolbar from "./components/toolbar/toolbar";
import SideDrawer from "./components/sidedrawer/sidedrawer";
import BackDrop from "./components/backdrop/backdrop";

class App extends Component {
    state = {
        baseUrl: "https://svc-backend.herokuapp.com/",
        sideDrawerOpen: false,
        products: [],
        items: []
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    backdropClickHandler = () => {
        this.setState( {sideDrawerOpen: false});
    };

    render() {
        let backdrop;

        if(this.state.sideDrawerOpen){
            backdrop = <BackDrop click={this.backdropClickHandler}/>;
        }
        return (
            <div style={{height:'100%'}}>
                <Toolbar items={this.state.items} drawerClickHandler={this.drawerToggleClickHandler}/>
                <SideDrawer items={this.state.items} show={this.state.sideDrawerOpen}/>
                {backdrop}
                <Products products={this.state.products}  />
            </div>
        );
    }

    componentDidMount() {
        fetch(this.state.baseUrl + '/product')
            .then(res => res.json())
            .then((data) => {
                this.setState({ products: data })
            })
            .catch(console.log)

        fetch(this.state.baseUrl + '/menu')
            .then(res => res.json())
            .then((data) => {
                this.setState({ items: data.items })
            })
            .catch(console.log)
    }

}

export default App;
