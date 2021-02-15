// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/SafeCastUpgradeable.sol";


contract W3irds is OwnableUpgradeable {
    using SafeMathUpgradeable for uint256;
    using SafeCastUpgradeable for uint256;

    //Project information
        struct Project {
            //Art details
            uint256 id;
            //going for an ipfs hash of a json file with all the data
            string ipfshash;
            //ownership
            address creator;
            //Owner??
            address keeper;
           /****I am doing a thing with ProjectTokens instead of price etc.. */
           uint256 tokenId;

        }
        //List of all projects
        Project[] public projects;


//I am doing this one to get track of the 'id' in Project struct Otherwise I will need Counters for this
    uint256 public projectCount = 0;
    uint256 public tokenCount = 0;

/***got rid of these */
    //string private _nameprefix = 'W3art-Project-';

    //Events
    event ProjectCreated(uint256 id, string ipfshash, address creator, address keeper, uint256 tokenId );
    event ProjectKeeperChanged(uint256 id, string ipfshahs, address creator, address keeper, uint256 tokenId);
    event ProjectTokens(uint256 id);
      
    //Create new project
        function newProject(
            string memory _ipfshash,
            address _keeper
        ) public //returns (uint256)
        {
            projectCount++;
            projects.push(
                Project(projectCount, _ipfshash, msg.sender, _keeper, tokenCount)
            );
            //_safeMint(msg.sender, id);
            //I chose to have the ipfshash as the tokenURI*** I couldn't figure out a way to set the default
            //Image--- if someone used only the code art part? I need a way to take a snapshot of the project
            //right before it is published and save that as the preview**Even so I fear gas fees***also I want 
            //to implement the Gas Station Network but I fear I have not enough funds for that so I am waiting on it
            
            emit ProjectCreated(projectCount, _ipfshash, msg.sender, _keeper,  tokenCount);
        }

        
    //Sell a project?? Essentially the idea is to transfer the Keeper role to another
      //This one's not working so I will go with awarding a token
   
   
}


contract W3irdsTokens is   Initializable, ERC721Upgradeable, W3irds {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    

    //constructor() public ERC721('Web3Art Project Tokens', 'W3A') {}
    function initialize() initializer public{
        __ERC721_init("Web3Art Projects Tokens", "W3A");
    }

    function awardMainProject(address keeper, string memory tokenURI)
        public //onlyOwner()
        returns (uint256)
        {
            //addToken(projectId);
            projectCount++;

            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            projects.push(Project(projectCount, tokenURI, msg.sender, keeper, newItemId));
            _safeMint(keeper, newItemId);
            _setTokenURI(newItemId, tokenURI);

            return newItemId;
        }
    function awardProjectToken(address keeper, string memory tokenURI)
        public
        returns (uint256)
        {
            
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            //Project storage _project = projects[newItemId];//
           // _project.tokens += newItemId;////////////////////>>>>>>These three lines are throwing an error, I don't 
           // projects[newItemId] = _project; ////////////////       know what's wrong. I will stick to inheritting parent URI
            _mint(keeper, newItemId);
            _setTokenURI(newItemId, tokenURI);
            return newItemId;
        }
    
    //function tossCoin(address creator, uint256 amount)
    //public
    //{

   // }
}





