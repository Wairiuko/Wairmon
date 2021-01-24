import React, { Component } from 'react';
//import Web3 from 'web3';
import loader from '../../loading.gif';
//import Donations from './Donations';
import { withRouter } from 'react-router-dom';
//import { Identities } from 'orbit-db';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import Emoji from './Emoji';
import {timeSince} from './time';

var base64 = localStorage.getItem("imgCanvas")

   export const Time = () =>{
     const timestamp = new Date();
   return   <div>{timeSince(timestamp)}</div>
  }
class Home extends Component {

/************THIS COMPONENT LISTS ON-CHAIN PROJECTS AND ALLOWS ONE TO CREATE AN OFF-CHAIN PROJECT (IN IPFS) */
async componentDidMount(){
  await this.props.connectWeb3()
  //await this.props.createDbInstance()
}
createProject = async (name) => {
  this.props.setState({ loading: true })
  const timestamp = new Date();
  //const dbaddress = orbitdb.determineAddress(name, 'docs', dbConfig)
  this.props.w3irds.methods.newProject(name, timestamp).send({ from: this.props.account })
  .once('receipt', (receipt)=>{
    //const id = this.props.w3irds.methods.projectCount().call()
    //this.setState({ projects: [...this.state.projects, project ]}) 
  this.props.setState({ loading: false });
    //this.props.history.push(`project/${id}${name}`) 
}).on('error', (error) => {
  console.log(error);
  window.alert(`There was an error: ${error}`);
  this.setState({loading: false})
});
}

  render() {
    
    
    return (
      <>
      {this.props.loading? <div id="loader" ><img src={loader} alt="Loading..."/></div>
      :<div className="container-fluid text-monospace" >
          &nbsp;
        <small>Total Projects: {this.props.totalSupply}</small>
        <Time/>
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
                
                
                    <figcaption style = {{ color: 'black' }}>{project.name} {/*timeSince(timestamp * 1000)*/}Creator(s): {project.creator} Age: {project.age} Owner(s): {project.owner} Sponsors: 0 </figcaption>
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
          <div className="col-md-2 overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '200px' }}>
            
            <Link to="project"><h5><Emoji symbol="➕"/></h5></Link>
            <form onSubmit={(event) => {
              event.preventDefault()
              const name = this.projectName.value
              this.createProject(name)
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
    }
      </>
    
    );
  }
}

export default withRouter(Home);
