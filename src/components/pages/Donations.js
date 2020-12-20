import React, { Component } from 'react';
import pantheon from '../../pantheon.png';
import {Link} from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
var base64 = localStorage.getItem('imgCanvas');

class Donations extends Component {

  render() {
    return (

        <div className="container-fluid text-monospace">
          <br></br>
          &nbsp;
          <br></br>
          <div className="row">
            <h4>Latest Art Projects:</h4>
            <div className="col-md-10  overflow-auto">
              
              <div className="embed-responsive">
              <Container>
              {/*<div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>*/}
              <Row lg={5} md={4} sm={3} xl={2} xs={1}>
                <Col lg={true}>
                <figure className="embed-responsive" style={{maxWidth: '300px'}}>
                <Link to='/artwork'>
                
                  <Image
                  src={ base64 /*`https://ipfs.infura.io/ipfs/${this.props.currentHash}`*/}
                  alt=""
                  /*style={{maxWidth: '250px'}}*/
                  fluid
                />
                </Link>
                <figcaption style = {{ color: 'black' }}>1 Title: Pantheon to All Art Creator(s): 0x0 Owner(s): 0x0 Sponsors: 0 </figcaption>
                </figure>
                </Col>
                
              </Row>
            </Container>
                
              {/*</div>*/}
            </div>
          </div>
          <div className="col-md-2  overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px' }}>
            <h5>New Project:</h5>
            <form onSubmit={(event) => {
              event.preventDefault()
              //const title = this.artworkTitle.value
              //const description = this.artworkDescription.value
              //this.props.createArtwork(title)
            }} >
              
              {/*<label htmlFor='preview' className="btn  btn-dark btn-block btn-sm"> Choose Preview</label>
              <input type='file' accept=".mp4, .mkv, .ogg, .wmv, .mov, .png, .jpeg, .jpg"  id="preview" onChange={this.props.captureFile} style={{ width: '250px' }}/>*/}
                <div className="form-group mr-sm-2">
                  <label htmlFor='title'>Project Title: </label>
                  <input
                    id="artworkTitle"
                    type="text"
                    //ref={
                      //(input) => { this.artworkTitle = input }
                    //}
                    className="form-control-sm"
                    required />
                  {/*<input
                    id="artworkDescription"
                    type = "text"
                    ref={(input) => {this.artworkDescription = input}}
                    className ="form-control-sm"
                    style = {{width: '100%', height: '200px'}}
                    placeholder="What inspired you to create this?"
                  required />}
                  </div>*/}
                  </div>
              <button type="submit" className="btn btn-dark btn-block btn-sm">Create New Project</button>
                  
              &nbsp;
            </form>
            {/*{ this.props.artworks.map((artwork, key) => {
              return(*/
                <div>
                <h5>Projects In Progress:</h5>
                <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px'}} /*key={key}*/ >
                  <div className="card-title bg-dark">

                    <small className="text-white"><b>{/*artwork.title*/}Pantheon To All Art</b></small>
                  </div>
                  <div>
                    <Link to='/project'> {/*onClick={/*() => this.props.changeArtwork(artwork.hash, artwork.title)*/} 
                      <Image
                        src={base64 /*`https://ipfs.infura.io/ipfs/${artwork.hash}`*/ }
                        style={{ width: '150px' }}
                        thumbnail
                      />
                    </Link>
                  </div>
                </div>
                </div>
              /*)
            })}*/}
          </div>
        </div>
      </div>
      
      
    );
  }
}

export default Donations;
