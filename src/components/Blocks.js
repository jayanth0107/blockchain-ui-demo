import React from 'react';
import Block from './Block';
import {Link} from 'react-router-dom';
import backendApi from '../apis/backendApi';
import '../css/App.css';

class Blocks extends React.Component {
    state = { blocks: [], latestblock: [] };

    componentDidMount = async () => {
        //backendApi.get('blocks/' + new Date().getTime() + '?format=json&cors=true')
        // try catch block to handle network errors
        try{
            const response = await backendApi
                                    .get('blocks/' + new Date().getTime(), {
                                            params: {format: 'json', cors: 'true'}
                                    })
            console.log('Blocks till date-',response.data.blocks)
            const newresponse = await backendApi
                                    .get('latestblock',  {
                                        params: {cors: 'true'}
                                    })
            console.log('Latest Block-',newresponse)
            this.setState({ blocks: response.data.blocks, latestblock: newresponse.data })
        } catch (error){
            console.log(error)
        }
        
    }

    render() {
        return (
            <div className='Blocks'>
                <div><Link to='/'>Home</Link></div>
                <h3> Blocks </h3> 

                {/* First block displayed in Blocks will be the latest block*/}
                {
                     this.state.blocks.length ? <div className='latestblock'>Latest Block<Block key={this.state.latestblock.hash} block={this.state.latestblock} /></div>: ''
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