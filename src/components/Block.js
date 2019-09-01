import React, {Component} from 'react';
import Transaction from './Transaction';
import backendApi from '../apis/backendApi';

class Block extends Component {

    state = { displayTransaction: false, txData: [], blockData: [] };

    /* To change state of Show More and Show Less buttons in a block */
    toggleTransaction = () => {
        this.setState({ displayTransaction: !this.state.displayTransaction }) 
    }    

    /* To display transaction details in a block */
    displayTransaction = async (e, hash) => {

        this.toggleTransaction();

        // try catch block to handle network errors
        try{
            const response = await backendApi.get('/rawblock/'+hash, {
                params: {cors: 'true'}
            });
            //console.log(response, this.state.displayTransaction);            
            const blockData = response.data;
            const transactionData = response.data.tx;
            this.setState({txData: transactionData, blockData});
        } catch (error) {
            alert(error);
        }
    }

    /* Computed method to display all the data in a block */
    get showData() {

        const { hash } = this.props.block;

        if(this.state.txData.length && this.state.displayTransaction) {
            return (
                <div>
                    Number of Transactions: {this.state.blockData.n_tx} <br />
                    Transaction Fees: {this.state.blockData.fee / 10**8} BTC <br />
                    Bits: {this.state.blockData.bits} <br />
                    Size: {this.state.blockData.size / 10**3} kB <br />
                    {
                        this.state.txData.map(transaction => (
                            <div key={transaction.hash}> 
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        ))
                    }
                    <br />
                    <button className="ui teal button" onClick={this.toggleTransaction}>Show Less</button>
                </div>
            )
        }

        if(this.state.displayTransaction) {
            return (
                <button className="ui grey loading button"></button>
            )
        }          
       
        return (
            <button className="ui red button" onClick={(e) => this.displayTransaction(e,hash)}>Show More</button>)

    }
    

    render() {

        const {time, hash, height} = this.props.block;

        const hashDisplay = `${hash.substring(0,35)}...`;        
        const heightDisplay = height.length > 35 ? 
                     `${height.substring(0,35)}...` : height;

        /* To format the timestamp displayed in the block */
        const appendLeadingZeroes = (n) => {
            if(n <= 9){
                return "0" + n;
            }
            return n
        }

        let current_datetime = new Date(time*1000);
        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let formatted_date = appendLeadingZeroes(current_datetime.getDate()) + "-" + months[current_datetime.getMonth()] + 
                                "-" + current_datetime.getFullYear() + " " + appendLeadingZeroes(current_datetime.getHours()) 
                                    + ":" + appendLeadingZeroes(current_datetime.getMinutes())
                                    + ":" + appendLeadingZeroes(current_datetime.getSeconds())        

        return (
            <div className='Block'>
                <div> Block #{heightDisplay} </div>
                <div> Hash: {hashDisplay} </div>
                <div> TimeStamp: { formatted_date } </div>
                <div> Height: { height } </div>                 
                {this.showData}
            </div>
        );                   
        
    }
}

export default Block;