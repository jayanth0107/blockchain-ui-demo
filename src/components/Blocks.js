import React from 'react';
import Block from './Block';
import {Link} from 'react-router-dom';
import backendApi from '../apis/backendApi';
import '../css/App.css';

class Blocks extends React.Component {
    state = { blocks: [], latestblock: [] };

        /* On component mount fire api calls and load page with blocks */
    componentDidMount = async () => {
        
        // try catch block to handle network errors
        try{
            const response = await backendApi
                                    .get('blocks/' + new Date().getTime(), {
                                            params: {format: 'json', cors: 'true'}
                                    })
            //console.log('Blocks till date-',response.data.blocks)
            const newresponse = await backendApi
                                    .get('latestblock',  {
                                        params: {cors: 'true'}
                                    })
            //console.log('Latest Block-',newresponse)
            this.setState({ blocks: response.data.blocks, latestblock: newresponse.data })
        } catch (error){
            alert(error)
        }
        
    }

    render() {
        return (
            <div className='Blocks'>
                <div><Link to='/'>Home</Link></div>
                <h3 className="ui medium header"> Blocks </h3> 
                <br />
                {/* First block displayed in Blocks will be the latest block
                    Shows spinner loading when there is no blocks to load*/}
                {
                     this.state.blocks.length ? <div className='latestblock'><b>Latest Block</b><Block key={this.state.latestblock.hash} block={this.state.latestblock} /></div>: 
                       <div className="ui active centered inline large text loader" style={{backgroundColor: '#bbb4a5'}}>Loading</div>                         
                }                          

                 {/* Below code would give the latest block without using latestblock api above if we remove slice command*/}
                {
                        this.state.blocks.slice(1).map((block) => {
                            return (
                                <Block key={block.hash} block={block} />
                            );
                        })
                }
                
            </div>
        );
    }
}

export default Blocks;