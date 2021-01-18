import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var base64 = localStorage.getItem("imgCanvas")

class Donations extends Component {

  render() {
    return (

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
                      this.props.linkToProject(project.id, project.name);
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
            <h5>New Project:</h5>
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
                              this.props.linkToProject(project.id, project.name);
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
      
      
    );
  }
}

export default Donations;
