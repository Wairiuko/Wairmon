import React, { Component } from 'react';
//import Web3 from 'web3';
//import loader from '../../loading.gif';
//import Donations from './Donations';
import { withRouter } from 'react-router-dom';
//import { Identities } from 'orbit-db';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

var base64 = localStorage.getItem("imgCanvas")

//Declare Web3  
//const web3 = new Web3(Web3.givenProvider)
//Declare IPFS
//const Room = require('ipfs-pubsub-room')
export async function dbInstance(){
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
  // Create IPFS instance
const initIPFSInstance = async () => {
  return await IPFS.create({ repo: "./project" });
};

initIPFSInstance().then(async ipfs => {
  const orbitdb = await OrbitDB.createInstance(ipfs);

  // Create / Open a database
  const db = await orbitdb.log("hello");
  await db.load();

  // Listen for updates from peers
  db.events.on("replicated", address => {
    console.log(db.iterator({ limit: -1 }).collect());
  });

  // Add an entry
  const hash = await db.add("world");
  console.log(hash);

  // Query
  const result = db.iterator({ limit: -1 }).collect();
  console.log(JSON.stringify(result, null, 2));
});
/*const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  },
}
const ipfs = await IPFS.create(ipfsOptions);
const identity = await Identities.createIdentity(options);
const orbitdb = await OrbitDB.createInstance(ipfs, {identity: identity});
const optionsToWrite = {
  accessController: {
    type: 'orbitdb',
    write: [
      //Giving write access to only owner
      //orbitdb.identity.id, 'peer-id'
      //Giving write access to everyone
    '*'
  ]
  }
};
const db = await orbitdb.docs('test-db', optionsToWrite);*/

}
/*const ipfsClient = require('ipfs-http-client')
const IPFS = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
*/
     
     
class Home extends Component {

/************THIS COMPONENT LISTS ON-CHAIN PROJECTS AND ALLOWS ONE TO CREATE AN OFF-CHAIN PROJECT (IN IPFS) */

  async componentDidMount(){
    //await this.blockchainData();
  };

  
      
    //this.createProject = this.createProject.bind(this)
    //linkToProject = this.linkToProject.bind(this)
  
      nextStep = () => {
        const {step} = this.state;
        //const {projectName} = this.state;
        this.setState({step: step + 1})
        //this.setState({projectName})
        //this.props.history.push(`project/${projectName}`)
      }
      prevStep = () => {
        const {step} = this.state;
        this.setState({step: step - 1})
      }
      handleChange = input => event => {
        this.setState({[input]: event.target.value})
      }

   createProject = async (name) => {
    this.setState({ loading: true});
    /*this.state.w3irds.methods.newProject(name).send({ from: this.state.account })
    .once('receipt', (receipt)=>{
      //this.setState({ projects: [...this.state.projects, project ]}) 
    this.setState({ loading: false },
      this.props.history.push(`project/${name}`) 
      ).on('error', (error) => {
      console.log(error);
      window.alert(`There was an error: ${error}`);
      this.setState({loading: false})
  });
    
  }) */
  
  dbInstance();
  
    //const room = new Room(ipfs, `${name}`);
  console.log(`${name}`)
  this.setState({loading: false});
  
  this.props.history.push(`project/${name}`)
      
  
  }
  linkToProject = (id, name) => {
    this.setState({loading: true});
    this.props.history.push(`project/${id} ${name}`)
    //this.setState({loading: false});
  }

  /*************************** 
  async blockchainData() {
    //const web3 = new Web3(Web3.givenProvider);
    
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const netId = await web3.eth.net.getId()
    const netData = W3irds.networks[netId]
    if(netData) {
      const w3irds = new web3.eth.Contract(W3irds.abi, netData.address)
      this.setState({ w3irds })
      const totalSupply = await w3irds.methods.totalSupply().call()
      //console.log(totalSupply)
      this.setState({ totalSupply })
      /************Projects in Total***** 
      for (var i=1; i <= totalSupply; i++){
        const project = await w3irds.methods.projects(i-1).call()
        this.setState({
          projects: [...this.state.projects, project]
        })
        
      }
      this.setState({ loading: false })
      /********************************* 
    }else{
      window.alert("W3irds Art does not live in the detected network...yet")
      this.setState({loading: false});
    }
  
  }*/
  


  render() {
    
    
    return (
      <div>
      <div className="container-fluid text-monospace">
          &nbsp;
        <small>Total Projects: {this.props.totalSupply}</small>
          <div className="row">
            <h5>Complete Art Projects: {//this.props.completedProjects
            }</h5>
            <div className="col-md-10  overflow-auto">
              
              <div className="embed-responsive">
              {//this.props.completedProjects<1 ?<p>No complete projects yet. Please create a new project or finish one.</p>
              //:
              <Container>
              {/*<div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>*/}
              <Row lg={5} md={4} sm={3} xl={2} xs={1}>
                {this.props.projects.map((project, key) => { 
                  
                  return (
                         
                <Col lg={true} key={key}>
                  <div id="thumbnail" onClick={(e)=>{
                      e.preventDefault();
                      this.linkToProject(project.id, project.name);
                      }}
                      style={{ cursor: 'pointer' }}
                      > 
                <figure className="embed-responsive" style={{maxWidth: '300px'}}>
                
                
                  <Image
                  src={base64 /*`https://ipfs.infura.io/ipfs/${this.props.currentHash}`*/}
                  alt=""
                  /*style={{maxWidth: '250px'}}*/
                  fluid
                />
                
                
                  <figcaption style = {{ color: 'black' }}>{project.name} Creator(s): {project.creator} Age: {project.age} Owner(s): {project.owner} Sponsors: 0 </figcaption>
                </figure>
                </div>
                </Col>
                  
                  )
                
                })}
                
                
              </Row>
            </Container>
            }
                
              {/*</div>*/}
            </div>
          </div>
          <div className="col-md-2  overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '200px' }}>
            
            <Link to="project"><h5>+</h5></Link>
            <form onSubmit={(event) => {
              event.preventDefault()
              const name = this.projectName.value
              this.props.createProject(name)
            }} >
              
              {/*<label htmlFor='preview' className="btn  btn-dark btn-block btn-sm"> Choose Preview</label>
              <input type='file' accept=".mp4, .mkv, .ogg, .wmv, .mov, .png, .jpeg, .jpg"  id="preview" onChange={this.props.captureFile} style={{ width: '250px' }}/>*/}
                <div className="form-group mr-sm-2">
                  <input
                    id="projectTitle"
                    type="text"
                    placeholder="Project Title..."
                    ref={
                      (input) => { this.projectName = input }
                    }
                    className="form-control-sm"
                    required />
                  </div>
              <button type="submit" className="btn btn-dark btn-block btn-sm">Create New Project</button>
                  
              &nbsp;
                  </form>
            <h5>Projects In Progress: {//this.props.projectCount - this.props.completedProjects
            }</h5>
            {//this.props.projectCount - this.props.completedProjects >= 1  ?  
            <div style={{maxHeight: 200, overflow: 'auto'}}>
            {this.props.projects.map((project, key) => {
             return(
                
                
                  <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px'}} key={key}>
                    <div className="card-title bg-dark">

                      <small className="text-white"><b>{project.name
                      }</b></small>      
                    </div>
                          
                            {//<Link to="/project/title"//onClick= {
                              //(e) => {
                                //e.preventDefault();
                                //this.props.history.push(`project/${title}`)
                              //}
                            //}
                           // > {/*onClick={/*() => this.props.changeArtwork(artwork.hash, artwork.title)*/
                          } 
                            <div id="thumbnail" onClick={(e)=>{
                              e.preventDefault();
                              this.linkToProject(project.id, project.name);
                              }}
                              >
                               <Image
                               src = {base64}
                               thumbnail
                               />
                                
                              
                              </div>
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
        </div>
      </div>

      </div>
    
    );
  }
}

export default withRouter(Home);
