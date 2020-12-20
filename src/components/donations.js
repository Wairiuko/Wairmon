import React, { Component } from 'react';
import pantheon from '../test.mov';

class Donations extends Component {

  render() {
    return (

        <div className="container-fluid text-monospace">
          <br></br>
          &nbsp;
          <br></br>
          <div className="row">
            <div className="col-md-10">
              <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>
                <video
                  src={pantheon}
                  alt=""
                  controls
                />
                
              </div>
            
          </div>
          <div className="col-md-2 border border-danger overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px' }}>
            <h5><b>Create/Upload Artwork</b></h5>
            <form onSubmit={(event) => {
              event.preventDefault()
              const title = this.artworkTitle.value
              const description = this.artworkDescription.value
              this.props.createArtwork(title, description)
            }} >
              &nbsp;
              <input type='file' accept=".mp4, .mkv, .ogg, .wmv, .mov, .png, .jpeg, .jpg" onChange={this.props.captureFile} style={{ width: '250px' }} />
                <div className="form-group mr-sm-2">
                  <input
                    id="artworkTitle"
                    type="text"
                    ref={(input) => { this.artworkTitle = input }}
                    className="form-control-sm"
                    placeholder="Title..."
                    required />
                  <input
                    id="artworkDescription"
                    type = "text"
                    ref={(input) => {this.artworkDescription = input}}
                    className ="form-control-sm"
                    style = {{width: '100%', height: '200px'}}
                    placeholder="What inspired you to create this?"
                    required />
                </div>
              <button type="submit" className="btn btn-danger btn-block btn-sm">Create!</button>
              &nbsp;
            </form>
            { this.props.artworks.map((artwork, key) => {
              return(
                <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px'}} key={key} >
                  <div className="card-title bg-dark">
                    <small className="text-white"><b>{artwork.title}</b></small>
                  </div>
                  <div>
                    <p onClick={() => this.props.changeArtwork(artwork.hash, artwork.title)}>
                      <video
                        src={`https://ipfs.infura.io/ipfs/${artwork.hash}`}
                        style={{ width: '150px' }}
                      />
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      
    );
  }
}

export default Donations;
