// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/SafeCast.sol";



contract W3irds is Ownable {
    using SafeMath for uint256;
    using SafeCast for uint256;

    //using Counters for Counters.Counter;
    //Counters.Counter private _projectIds;
    //mapping(string => uint8) ipfshashes;

   // constructor() public ERC721("W3irds Art" , "3A") {}


   //string public name = "W3irds Art";
    //string [] public projects;
    //Project information
        struct Project {
            //Art details
            uint256 id;
            //Name
            //string name;
            //going private
            //string nameprefix;//No need
            //DB Address
            //string dbaddress
            //going for an ipfs hash of a json file with all the data
            string ipfshash;
            //I need a preview
            //string imagehash; got rid of this one
            //timestamp??
            //string timestamp;
            //ownership
            address payable creator;
            //Owner??
            address payable keeper;
            //Price
            uint256 price;
            //purchased
            bool purchased;
        }
        //List of all projects
        Project[] public projects;
        //mapping(uint => Project) public projects;


//I am doing this one to get track of the 'id' in Project struct Otherwise I will need Counters for this
    uint256 public projectCount = 0;
    //uint256 private price = 3000000000000000000;

/***got rid of these */
    //string private _nameprefix = 'W3art-Project-';

    //Events
    event ProjectCreated(uint256 id, string ipfshash, address payable creator, address payable keeper, uint256 price, bool purchased);
    event ProjectKeeperChanged(uint256 id, string ipfshahs, address payable creator, address payable keeper, uint256 price, bool purchased);
      
    //Create new project
        function newProject(
            string memory _ipfshash,
            //string memory _imagehash
            //address _creator
            uint256 price
        ) public returns (uint256)
        {
            projectCount++;
            //uint256 id = projects.length;
            projects.push(
                Project(projectCount, _ipfshash, msg.sender, msg.sender, price, false)
            );
            //_safeMint(msg.sender, id);
            //I chose to have the ipfshash as the tokenURI*** I couldn't figure out a way to set the default
            //Image--- if someone used only the code art part? I need a way to take a snapshot of the project
            //right before it is published and save that as the preview**Even so I fear gas fees***also I want 
            //to implement the Gas Station Network but I fear I have not enough funds for that so I am waiting on it
            //_setTokenURI(id, _ipfshash);
            //return id;
            emit ProjectCreated(projectCount, _ipfshash, msg.sender, msg.sender, price, false);
        }
    //Sell a project?? Essentially the idea is to transfer the Keeper role to another
      
    function purchaseProject(uint _id) public payable {
        // Fetch the product
        Project memory _project = projects[_id];
        // Fetch the owner
        address payable _seller = _project.keeper;
        // Make sure the product has a valid id
        require(_project.id > 0 && _project.id <= projectCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _project.price);
        // Require that the product has not been purchased already
        require(!_project.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _project.keeper = msg.sender;
        // Mark as purchased
        _project.purchased = true;
        // Update the product
        projects[_id] = _project;
        // Pay the seller by sending them Ether
        _seller.transfer(msg.value);
        // Trigger an event
        emit ProjectKeeperChanged(projectCount, _project.ipfshash,  _project.creator, msg.sender, _project.price, true);
    }
   
}


contract W3irdsTokens is ERC721, W3irds {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    

    constructor() public ERC721('Web3Art Project Tokens', '3A') {}

    function awardItem(address keeper, string memory tokenURI)
        public //onlyOwner()
        returns (uint256)
        {
            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            _mint(keeper, newItemId);
            _setTokenURI(newItemId, tokenURI);

            return newItemId;
        }
    
    //function tossCoin(address creator, uint256 amount)
    //public
    //{

   // }
}





