// SPDX-License-Indentifier: GPL-3.0
pragma solidity ^0.7.0;

contract W3arts {
  uint public artworkCount = 0;
  string public name = "W3arts";
  mapping(uint => Artwork) public artworks;

  struct Artwork {
    uint id;
    string hash;
    uint price;
    string title;
    string description;
    address payable owner;
    bool purchased;
  }

  event ArtworkCreated(
    uint id,
    string hash,
    uint price,
    string title,
    string description,
    address payable owner,
    bool purchased
  );
  event ArtworkPurchased(
       uint id,
       string hash,
       uint price,
       address payable owner,
       bool purchased
    );

  constructor() public {
    name = "W3arts";
  }

  function createArtwork(string memory _artworkHash, uint _price, string memory _title, string memory _description) public {
    // Make sure the artwork hash exists
    require(bytes(_artworkHash).length > 0);
    
    // Make sure artwork title exists
    require(bytes(_title).length > 0);
    // Make sure artwork description exists 
    require(bytes(_description).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    // Increment artwork id
    artworkCount ++;

    // Add artwork to the contract
    artworks[artworkCount] = Artwork(artworkCount, _artworkHash, _price, _title, _description, msg.sender, false);
    // Trigger an event
    emit ArtworkCreated(artworkCount, _artworkHash, _price, _title, _description, msg.sender, false);
  }
  function purchaseArtwork(uint _id) public payable{
        //Fetch the artwork
        Artwork memory _artwork = artworks[_id];
        //Fetch the owner
        address payable _creator = _artwork.owner;
        //Make sure the artwork is valid
        require(_artwork.id > 0 && _artwork.id<= artworkCount);
        // Require that there is enough ether in the transaction
        require(msg.value >= _artwork.price);
        //Require that the artwork has not been purchased
        require(!_artwork.purchased);
        //Require the buyer is not the seller
        require(_creator != msg.sender);
        //Purchase it/transfer ownership to the buyer
        _artwork.owner = msg.sender;
        //mark as purchased 
        _artwork.purchased = true;
        // update the artwork 
        artworks[_id] = _artwork;
        //pay the seller by sending them Ether
        address(_creator).transfer(msg.value);
        //trigger an event
        emit ArtworkPurchased(artworkCount, _artwork.hash, _artwork.price, msg.sender, true);
    }
}
