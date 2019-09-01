import React from 'react';
import '../css/App.css';
import logo from '../assets/logo.jpg';
import {Link} from 'react-router-dom';


class App extends React.Component {

    state = {}

    render() {
        return (
            <div className='App'>
                <img alt='logo' className='logo' src={logo}></img>                
                <br />
                <div>
                    Welcome to the BlockChain....
                </div>
                <br />
                <div><Link to='/blocks'>Blocks</Link></div>
                <br />

            </div>
           
        );
    }
}

export default App;