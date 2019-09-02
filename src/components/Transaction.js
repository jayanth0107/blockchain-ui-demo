import React from 'react';
import '../css/App.css';

const Transaction = ({ transaction }) => {
    
    const {inputs, out} = transaction;

    return (
        <div className='Transaction'>
            {
                inputs.map( (itx,index) => (
                        <div key={index}>
                            <b>From: </b>{ itx.prev_out ?  ` ${itx.prev_out.addr.substring(0,25)}...` : `No inputs (Newly Generated Coins)` }
                                |  <br /> <b>Balance: </b>{ itx.prev_out ? ` ${itx.prev_out.value / 10**8} BTC` : ` 0 BTC`}
                        </div>    
                ))
            }
            {
                out.map( (tx,index) => (
                        <div key={index}>
                            <b>To: </b>{ tx.addr ? ` ${tx.addr.substring(0,25)}...`: `Unable to decode output address`}
                                 |  <b>Sent: </b>{ tx.value ? ` ${tx.value / 10**8} BTC` : ` 0 BTC`}
                        </div>    
                ))
            }
        </div>
    )

}

export default Transaction;