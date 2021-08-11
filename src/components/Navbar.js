import React, { Component } from 'react';
import Identicon from 'identicon.js';
import wairmon from '../wairmon.png';
import {Link, withRouter} from 'react-router-dom';
import {TossModal} from './pages/static';
//import Web3Modal from 'web3modal'
//import Web3 from 'web3';

class Navbar extends Component {

  render() {
   
    return (
      
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        <Link
          to ='/'
          onClick={e => {e.preventDefault(); this.props.history.push('/'); window.location.reload()}}
          className="navbar-brand"
        >
          <img src={wairmon} width="30" height="30" className="d-inline-block align-top" alt="" /> 
          
          <small className="text-secondary">{this.props.projectCount}</small>
          &nbsp;
           <small className="text-secondary">{this.props.totalSupply}</small>
          &nbsp;
        </Link>
        <Link to='globe' ><button className="btn-dark" >Globe</button></Link>
        <TossModal/>
       
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
      
    );
  }
}

export default withRouter(Navbar);