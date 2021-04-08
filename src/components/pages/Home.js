import React, { Component } from 'react';
import Web3 from 'web3';
import loader from '../../loading.gif';
//import Donations from './Donations';
//import { withRouter } from 'react-router-dom';
//import { Identities } from 'orbit-db';

import Image from 'react-bootstrap/Image';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
//import Emoji from './Emoji';
import {timeSince} from './time';
import Web3Modal from 'web3modal';
//import W3irds from '../../abis/W3irds.json';
import W3irdsTokens from '../../abis/W3irdsTokens.json';
import Navbar from '../Navbar';
import NavBottom from '../NavBottom';
//import ProjectToken from './ProjectToken';
//import Splitpane from 'react-split-pane';
//import ThreeD from './3dcanvas';
import ProjectView from './ProjectView';
import SplitPane from 'react-split-pane';
//import {Switch, Route } from 'react-router-dom';




//const base64 = localStorage.getItem("mainCanvas")

  
 const ipfsClient = require('ipfs-http-client')
 const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) 
 //const year = new Date().getFullYear();



class Home extends Component {
  
state ={
  account: "",
  loading: true,
  w3irds: null,
  w3irdsTokens: null,
  projects: [],
  tokens: [],
  totalSupply: 0,
  projectCount: 0,
  projectCreator: null,
  projectHash: null,
  previewHash: '',
  projectImage: null,
  projectHtml: null,
  projectJs: null,
  projectCss: null,
  projectTime: null,
  projectTitle: null,
  projectDescription: null,
  //projectSpace: null,
  projectKeeper: null,
  projectTokens: null,
  projectCreatorAddress: null,
  //projectID: null,
  projectPrice: null,
  buffer: null,
  data: [],
  tokenData: [],
  proposedKeeper: null,
  ///transfer test
  projectID: null,
  

}
/************THIS COMPONENT LISTS ON-CHAIN PROJECTS AND ALLOWS ONE TO CREATE AN OFF-CHAIN PROJECT (IN IPFS-- 
 * well currently all data is stored in local storage) */


async componentDidMount(){

  await this.connectWeb3();
  
}


async connectWeb3() {
  this.setState({loading: true})
  if (typeof window.ethereum === 'undefined' ){
    this.setState({ needWeb3: true })
  }
  try{
    const providerOptions = {};
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions,
      theme: 'dark'
    })
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    this.setState( { account: accounts[0] });
    this.setState({ isLoggedIn: true });
    //For login **memory
    window.localStorage.setItem('login', this.state.account)

    const netId = await web3.eth.net.getId()
    
   // const netData = W3irds.networks[netId] //Commenting out this as I only need to interact with the W3irdsTokens contract
  // get the W3irdsTokens networks
    const tokenData = W3irdsTokens.networks[netId]
    //It is now ready and we can interact with it
    if(tokenData){
      //Get the Contract Abi
      const w3irdsTokens = new web3.eth.Contract(W3irdsTokens.abi, tokenData.address)
      //Set state for use in the component functions
      this.setState({ w3irdsTokens })
      //console.log(w3irdsTokens)

      //Get the number of projects in the contract
      const projectCount = await w3irdsTokens.methods.projectCount().call()
      this.setState({ projectCount })

      //Get the total supply of tokens in the contract
      const totalSupply = await w3irdsTokens.methods.totalSupply().call()
      this.setState({ totalSupply })
      console.log(totalSupply)
      //const price = '3';
     // const pricetest = web3.utils.toWei(price, 'Ether')
      //console.log(pricetest)

      /*/tests
      const uri = await w3irdsTokens.methods.tokenURI(1).call()
      console.log(uri)
     const owner = await w3irdsTokens.methods.ownerOf(1).call()
      console.log(owner)
      const owner2 = await w3irdsTokens.methods.ownerOf(2).call()
      console.log(owner2)*/
      
      //List the projects and fetch their respective URIs
      for (var i=1; i<= projectCount; i++){
        const project = await w3irdsTokens.methods.projects(i-1).call()
        this.setState({ projects: [...this.state.projects, project]})
         ///TESTING data
         console.log(project)
        this.setState({ projectHash: project.ipfshash,
                        projectID: project.id,
                        //projectPrice: project.pric,
                        projectCreatorAddress: project.creator,
                        projectKeeper: project.keeper,
                        projectTokens: project.tokens
        
        })
        console.log(this.state.projectID, this.state.projectKeeper, this.state.projectTokens)
        console.log(this.state.projectHash)
         fetch(`${project.ipfshash}`)
         .then((response) => {
             return response.json()
         })
         .then((json) =>{
             this.setState({ data: [...this.state.data, json]})
             //this.setState({ })
             console.log(this.state.data)
            // const data = this.state.data
          //const tokenData = JSON.stringify({...data, token:{title: '', creator: '', image: '', date: '', description: '', html: '', js: '', css: ''} })
          //console.log(tokenData)
             this.setState({
               projectImage: json.project.image,
               projectHtml: json.project.html,
               projectJs: json.project.js,
               projectCss: json.project.css,
               projectTime: json.project.date,
               projectTitle: json.project.title,
               projectDescription: json.project.description,
               projectCreator: json.project.creator
             })

             //this.state.data.sort((a, b) => (b.date - a.date))
             //this.setState({ loading: false})
             //console.log(this.state.data)
         });
        
      }
      //List tokens and fetch their respective URIS
      for(var t = 1; t <= totalSupply; t++){
        const token = await w3irdsTokens.methods.tokenByIndex(t-1).call();
        this.setState({tokens: [...this.state.tokens, token]});
        console.log(this.state.tokens)
        const tokenUris = await w3irdsTokens.methods.tokenURI(t).call();
        fetch(tokenUris)
        .then(response =>{
          return response.json()
        }).then(json => {
          this.setState({tokenData: [...this.state.tokenData, json]})
          console.log(this.state.tokenData)
        })
        
      }
     //const uri = await w3irdsTokens.methods.tokenURI(1).call()
     // console.log(uri)
     // const owner = await w3irdsTokens.methods.ownerOf(1).call()
     // console.log(owner)

    
    
    /*if(netData) {
      const w3irds = new web3.eth.Contract(W3irds.abi, netData.address)
      this.setState({ w3irds })
      //const index = await w3irds.methods.projectCount().call()
      const totalSupply = await w3irds.methods.totalSupply().call()
      //console.log(totalSupply)
      this.setState({ totalSupply })
      
      /************Projects in Total***** 
      for (var i=1; i <= totalSupply; i++){
        const project = await w3irds.methods.projects(i-1).call()
        this.setState({
         projects: [...this.state.projects, project]
        })
        console.log(this.state.projects)
        this.setState({
          projectID: project.id
          //projectCreator: project.creator,
         // projectHash: project.ipfshash,
          //previewHash: project.imagehash
          
        })
        //console.log(this.state.projectID)
        //const uri = await w3irds.methods.tokenURI(i-1).call()
     // console.log(uri)
      //const owner = await w3irds.methods.ownerOf(i-1).call()
      //console.log(owner)
        //fetch(`https://infura`)
       // console.log(project.imagehash)
        ///TESTING data
        
          fetch(`${project.ipfshash}`)
          .then((response) => {
              return response.json()
          })
          .then((json) =>{
              this.setState({ data: [...this.state.data, json]})
              //this.setState({ })
              console.log(this.state.data)
              this.setState({
                projectImage: json.image,
                projectHtml: json.html,
                projectJs: json.js,
                projectCss: json.css,
                projectTime: json.date,
                projectTitle: json.name,
                projectDescription: json.description,
                projectCreator: json.creator
              })

              //this.state.data.sort((a, b) => (b.date - a.date))
              //this.setState({ loading: false})
              //console.log(this.state.data)
          });
        
        
      }
      const balance = w3irds.methods.balanceOf(this.state.account).call()
      console.log(balance)
      
      //LIST by latest id
     // this.state.projects.sort((a, b) => (b.id - a.id))
     //this.state.data.sort((a, b) => (b - a))
     
      /********************************* */


      this.setState({ loading: false })

    }else{
      window.alert("W3irds Art does not live in the detected network...yet. Kindly switch your networks to Rinkeby testnet:)")
      this.setState({loading: false});
    }
    
  } catch (err) {
    console.error(err);
    window.alert('Error connecting to your wallet: ' + err);
  }
}
changeCurrentProject(title, image, html, js, css, date, description, creator){
  this.setState({'projectTitle': title})
  this.setState({'projectImage': image})
  this.setState({'projectHtml': html})
  this.setState({'projectJs': js})
  this.setState({'projectCss': css})
  this.setState({'projectTime': date})
  this.setState({'projectDescription': description})
  this.setState({'projectCreator': creator})

}
//TRANSFER TEST
transfer(from, to, id){
  this.state.w3irdsTokens.methods.safeTransferFrom(from, to, id).send({from: this.state.account}).on('transactionHash', hash => {
    window.alert("Transfered successfully")
  })
}

//Mint Test
awardProject(to, uri){
  to = this.state.proposedKeeper
  const html = JSON.parse(localStorage.getItem('w3ird-pen-html'));
  const js = JSON.parse(localStorage.getItem('w3ird-pen-js'));
  const css = JSON.parse(localStorage.getItem('w3ird-pen-css'));
  const image = localStorage.getItem('imgCanvas')
  const date = timeSince(new Date())
  const data = this.state.data;
  const tokenData = JSON.stringify({...data, token:{title: "First Token Test", creator: "Serste", image: image, date: date, description: "Token Uri Test", html: html, js: js, css: css} })
  const file = Buffer.from(tokenData);
  ipfs.add(file, {progresss: prog => console.log(`TokenJson: ${prog}`)})
  .then(response => {
    uri = response.path;
    this.state.w3irdsTokens.methods.awardProjectToken(to, `https://ipfs.io/ipfs/${uri}`).send({from: this.state.account}).on('transactionHash', hash => {
      window.alert("Token minted successfully")
    })

  }).catch(error => {
    window.alert("Oopps something went wrong, please try again")
  })
  
}
//Transfer to new Keeper Test
sellProject(to, id){
  this.state.w3irdsTokens.methods.sellProject(to, id).send({from: this.state.account}).on('transactionHash', hash => {
    window.alert("Transfered successfully")
  })
}

//Buy a project
buyProject(id, price){
  this.state.w3irdsTokens.methods.purchaseProject(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      window.alert('Project purchased successfully')
      //this.setState({ loading: false })
    })
}

//Create Project => taking this function to Project component



  render() {
    
    
    return (

      <>
     

      <Navbar account = {this.state.account} totalSupply={this.state.totalSupply} projectCount={this.state.projectCount}/>

          {this.state.loading? <div id="loader" ><img src={loader} alt="Loading..."/></div>

          :
          <>
        
        <small>{this.state.projectCreator} {this.state.projectTime}</small>
        {/*this.state.account === this.state.projectCreatorAddress &&
        <form onSubmit={e => {
          e.preventDefault();
          //const address = this.address.value
         // const id = this.state.projectID
          //this.transfer(this.state.account, address, 1)
          this.awardProject()
          //this.sellProject(address, 1)
        } }
        ><input type="text" ref={(input) => { this.address = input }} onChange={e => {e.preventDefault(); this.setState({proposedKeeper: e.target.value})}}placeholder="eg. 0xAF78309C17Cb8FE6119Ad8255C155fCc54F116b0" required />
        <button className="btn-dark" type="submit">Mint</button>

      </form>*/}
      {/*<button className='btn-dark' name={this.state.projectID} value={this.state.projectPrice} onClick={(e) => {
        this.buyProject(e.target.name, e.target.value)
      }}>Buy</button>*/}
          <SplitPane
          minSize="85%"
          split="vertical"
          >
            <>
                {<ProjectView
                projectHash = {this.state.projectHash}
                data = {this.state.data}
                projectImage = {this.state.projectImage}
                projectHtml = {this.state.projectHtml}
                projectJs = {this.state.projectJs}
                projectCss = {this.state.projectCss}
                projectTime = {this.state.projectTime}
                projectTitle = {this.state.projectTitle}
                projectDescription = {this.state.projectDescription}
                />}
                {/*<ProjectToken
                style={{visibility: 'hidden'}}
                projectHash = {this.state.projectHash}
                data = {this.state.data}
                projectImage = {this.state.projectImage}
                projectHtml = {this.state.projectHtml}
                projectJs = {this.state.projectJs}
                projectCss = {this.state.projectCss}
                projectTime = {this.state.projectTime}
                projectTitle = {this.state.projectTitle}
                projectDescription = {this.state.projectDescription}
                />*/}
                </>
                  
           { //<SplitPane split="vertical" minSize="50%" style={{overflow: 'auto'}}>
             }
            <div className="col-md-2 text-center" style={{ marginTop: '10px', maxHeight: '768px', minWidth: '200px', position: 'relative' }}>
              <Link to="project"><button className="btn-dark" >Create New Project</button></Link>
                
                <h6>Projects: {//this.props.projectCount - this.props.completedProjects
                }</h6>
                {//this.props.projectCount - this.props.completedProjects >= 1  ?  
                <div style={{overflow: 'auto', maxHeight: '600px', position: 'absolute'}}>

                {this.state.data.map((json, key) => {
                  
                return(
                    
                    
                      <div className="card mb-4 overflow-auto text-center bg-secondary mx-auto" style={{ width: '175px', position: 'relative'}} key={key}>
                        <div className="card-title bg-dark">
                 
                <small className="text-white"><b>{json.project.title
                          }</b></small>      
                        </div>
                              
                                
                                <p style={{cursor: 'pointer'}}id="thumbnail" onClick={ (e) => {
                                  e.preventDefault();
                                  //this.linkToProject(project.id, project.name);
                                   this.changeCurrentProject(json.project.title, json.project.image, json.project.html, json.project.js, json.project.css, json.project.date, json.project.description, json.project.creator)
                                  }
                                  }
                                  >
                                  {/*<Link to={"/project/" + json.project.date}>*/}
                                  <Image
                                  src = {json.project.image
                                  }
                                  alt = 'Preview'
                                  thumbnail
                                  />
                                 { /*</Link>*/}
                                    
                                  
                                  </p>
                              {//</Link>
                }
                              
                      </div>
                    
                  )
                })}
                  
                  


                
                </div>
                


                /*:
                
                <p>No projects in progress.Kindly create a new project.</p>*/





              }
              </div>
             {/* ******I CANT FIGURE OUT A WAY TO LIST THE BLOCKCHAIN INFO CORRELATIVELY--IS THIS EVEN A WORD??
             <div className="col-md-2 text-center" style={{ marginTop: '10px', maxHeight: '768px', minWidth: '200px' }}>
             <button className="btn-dark" >Donate</button>
                
                <h6>Details: {//this.props.projectCount - this.props.completedProjects
                }</h6>
                {//this.props.projectCount - this.props.completedProjects >= 1  ?  
                <div style={{}}>

                {this.state.projects.map((project, key) => {
                return(
                    
                    
                      <div className="card mb-4  bg-secondary mx-auto" style={{ width: '175px'}} key={key}>
                        <div className="card-title bg-dark">
                         
                          
                        &nbsp;
                                 
                         <small className="text-white" >{project.id} <br/>{project.creator
                          }<br/>
                          
                           {`https://ipfs.infura.io/ipfs/${project.ipfshash}`
                           }</small> 
                                  
                                  

                        </div>
                              
                                
                                
                              {//</Link>
                }
                              
                      </div>
                    
                  )
                })}
                </div>
                /*:
                
                <p>No projects in progress.Kindly create a new project.</p>
              
              </div>

              </SplitPane>*/
            }


          </SplitPane>
          
          </>
         
          
          }
         
        
          <NavBottom/>

        
      </>
    
    );
  }
}

export default Home;
