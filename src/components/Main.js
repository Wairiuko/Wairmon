import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (

      <div className="container-fluid text-monospace">
        <div id="container"></div>
          <br></br>
          &nbsp;
          <br></br>
          <div className="row">
            <div className="col-md-10">
              <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>
                <video
                  src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                  controls
                >
                </video>
              </div>
            { this.props.artworks.map((artwork, key) => {
              return(
                <div key={key}>
            <p>Creator:{artwork.address.creator}</p>
            <p>Owner: {artwork.owner}</p>
            <h3><b><i>{this.props.currentTitle}</i></b></h3>
            <p><i>{this.props.currentDescription}</i></p>
            { !artwork.purchased
              ?<button
                type = "submit"
                className = "btn btn-primary"
                name = {artwork.id}
                value = {artwork.price}
                onClick = {(event) =>{
                  this.props.purchaseArtwork(event.target.hash, event.target.price)
              }}>
                  Buy
              </button> 
              :null }
              </div>
              )})}
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

export default Main;
