import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
const year = new Date().getFullYear();
class NavBottom extends Component{
render(){
    return (
      <>
     
<nav className="navbar navbar-dark navbar-expand-lg fixed-bottom bg-dark flex-md-nowrap p-0 shadow text-monospace">
<span className="text-secondary">Copyright {year} W3irds Art </span>
&nbsp;

<Link to='/static' onClick={e =>{e.preventDefault(); this.props.history.push('/static'); window.location.reload()}}>
      <span className="text-secondary">About </span>
    </Link>
    {/*
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul  className="navbar-nav px-3 text-center">
  <li  className="nav-item text-nowrap d-none d-sm-none d-sm-block">
    <span className="text-secondary">Home </span>
  </li>
</ul>
&nbsp;

<ul className="navbar-nav px-3 text-center">
  <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
    <Link to='/static'>
      <span className="text-secondary">About </span>
    </Link>*/
    }{/*
    <Link to='/'>
      <span className="text-secondary">Privacy Policy </span>
    </Link>
    <Link to='/'>
      <span className="text-secondary">Terms and Conditions </span>
    </Link>
    
    </li>
</ul>
</div>*/
}



</nav>

</>
);
}
}
export default withRouter(NavBottom);