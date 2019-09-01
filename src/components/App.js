import React from 'react';
import '../css/App.css';
import {Link} from 'react-router-dom';


class App extends React.Component {

    state = {}

    render() {
        return (
            <div className='App'>
                
                <h2 className="ui center aligned icon large header">
                    <i className="circular cubes icon"></i>
                        BlockChain
                </h2> 

                <hr style={{width: '98%'}}/>
                <div className="ui medium header">
                    Welcome to the BlockChain....
                </div>
                <br />
                <div><Link to='/blocks'>Visualize Blocks - Click Here!!</Link></div>
                <br />

            </div>
           
        );
    }
}

export default App;