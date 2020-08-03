import React, {Component} from 'react';
import ProductList from './components/product/productList';
import Toolbar from "./components/toolbar/toolbar";
import SideDrawer from "./components/sidedrawer/sidedrawer";
import BackDrop from "./components/backdrop/backdrop";
import Home from "./Home.js";
import ProductDetail from "./components/product/productDetail.js";


import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Dashboard from "./components/dashboard";


class App extends Component {
    state = {
        backendBaseUrl:"https://svc-backend.herokuapp.com/", //"http://127.0.0.1:8080/",
        sideDrawerOpen: false,
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
                <Router>
                    <Toolbar items={this.state.items} drawerClickHandler={this.drawerToggleClickHandler} backendBaseUrl={this.state.backendBaseUrl}/>
                    <SideDrawer items={this.state.items} show={this.state.sideDrawerOpen} backendBaseUrl={this.state.backendBaseUrl}/>
                    {backdrop}
                    <Home/>
                    <Switch>
                        <Route path={"/"} exact component={Home} />
                        <Route path={"/product-list/:id"} render={(props) => (
                            <ProductList {...props} backendBaseUrl={this.state.backendBaseUrl} />
                        )} />
                        <Route path={"/product-form"} render = {(props) => (
                            <Dashboard {...props} backendBaseUrl = {this.state.backendBaseUrl} />
                        )} />
                        <Route path={"/product-detail:id"} component={ProductDetail} />
                    </Switch>
                </Router>
            </div>
        );
    }

    componentDidMount() {
        fetch(this.state.backendBaseUrl + 'v1/menu/menu')
            .then(res => res.json())
            .then((data) => {
                this.setState({ items: data.items })
            })
            .catch(console.log)
    }

}

export default App;
