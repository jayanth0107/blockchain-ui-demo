import React from 'react';
import '../css/App.css';

const Transaction = ({ transaction }) => {
    
    const {inputs, out} = transaction;

    return (
        <div className='Transaction'>
            {
                inputs.map( (itx,index) => (
                        <div key={index}>
                            { itx.prev_out ? `From: ${itx.prev_out.addr.substring(0,25)}...` : `No inputs (Newly Generated Coins)` }
                                |  <br /> { itx.prev_out ? `Balance: ${itx.prev_out.value / 10**8} BTC` : `Balance: 0 BTC`}
                        </div>    
                ))
            }
            {
                out.map( (tx,index) => (
                        <div key={index}>
                            { tx.addr ? `To: ${tx.addr.substring(0,25)}...`: `Unable to decode output address`}
                                 |   { tx.value ? `Sent: ${tx.value / 10**8} BTC` : `Sent 0 BTC`}
                        </div>    
                ))
            }
        </div>
    )

}

export default Transaction;