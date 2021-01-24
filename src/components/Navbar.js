import React, { Component } from 'react';
import Identicon from 'identicon.js';
import w3irds from '../w3irds.png';
import {Link} from 'react-router-dom';
//import Web3Modal from 'web3modal'
//import Web3 from 'web3';

class Navbar extends Component {

  render() {
   
    return (
      <div className="pos-f-t">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <h4 className="text-white">Collapsed content</h4>
          <span className="text-muted">Toggleable via the navbar brand.</span>
        </div>
      </div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        <Link
          to ='/'
          className="navbar-brand"
        >
          <img src={w3irds} width="30" height="30" className="d-inline-block align-top" alt="" /> Web3Art
          &nbsp;
        </Link>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              {//<button onClick={this.props.connect}>Connect</button>
              }
              {//this.props.isLoggedIn ? 
              <small id="account">{this.props.account
              }</small>
              //:
              //<button className="btn btn-secondary btn-sm"  onClick={this.props.connect}>
              //Connect
            //</button>
            }
              {/*<button className="btn btn-primary btn-sm" id="btn-connect" onClick={this.props.connect}>
              {this.props.isLoggedIn ? `Disconnect` : `Connect Wallet`}
            </button>
              
              
              <small id="account">{this.props.account
              }</small>
              <button className="btn btn-primary btn-sm" onClick={this.props.disconnect}>Disconnect</button>*/}
            </small>
            { this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`
              }
                alt=""
              />
              : <span></span>
            }
          </li>
        </ul>
       
        {/*
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
        */}
      </nav>
      </div>
    );
  }
}

export default Navbar;