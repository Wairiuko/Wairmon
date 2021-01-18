// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/SafeCast.sol";

contract W3irds is ERC721, Ownable{
    using SafeMath for uint;
    using SafeCast for uint;

    //string public name = "W3irds Art";
    //string [] public projects;
    //Project information
        struct Project {
            //Art details
            uint id;
            uint lifecycle;
            //Initial details
            string name;
            uint8 age;
            uint8 scope;
            uint8 state;
            //Attributes
            uint8 technique;
            uint8 aesthetics;
            uint8 usage;
            uint8 popularity;
            //ownership
            address payable creator;
            //enlisted
            bool enlistedProjects;
        }
        //List of all projects
        Project[] public projects;
        //mapping(uint => Project) public projects;

    constructor()ERC721("W3irds Art" , "3A")public {

    }
    uint public projectCount = 0;
    uint private lifecycle = 100;
    uint8 private age = 0;
    uint8 private scope = 1;
    uint8 private state = 255;
    uint8 private technique = 1;
    uint8 private aesthetics = 1;
    uint8 private usage = 2;
    uint8 private popularity = 1;
        
        
    //Create new project
        function newProject(
            string memory _name
            //address _creator
        ) public returns (uint)
        {
            projectCount++;
            uint id = projects.length;
            projects.push(
                Project(projectCount, lifecycle, _name, age, scope, state, technique, aesthetics, usage,
                        popularity, msg.sender, false)
            );
            _safeMint(msg.sender, id);
            return id;
        }

         //Cast and add a uint8 to a uint8
        function castAdd8(uint8 _a, uint8 _b) internal pure returns (uint8){
            return uint(_a).add(uint(_b)).toUint8();
        }
        //Cast and substract a uint8 from uint8
        function castSubstract8(uint8 _a, uint8 _b) internal pure returns(uint8){
            return uint(_a).sub(uint(_b)).toUint8();
        }
        //Cast and subtract a uint8 from a uint
        function castSubstract256(uint _a, uint8 _b) internal pure returns (uint){
            return _a.sub(uint(_b));
        }
    //Grow a project
        //Grow costs and gains
    uint8 public stateCostToGrow = 5;
    uint8 public lifecycleCostToGrow = 8;
    uint8 public attributeGainOnGrow = 1;
    //Rest costs and gains
    uint8 public lifecycleCostToRest = 6;
    uint8 public stateGainOnRest = 15;

    enum Attribute { technique, aesthetics, usage, popularity }

    event Grow(uint indexed projectId, Attribute attribute);
    event Rest(uint indexed projectId);

    //Grow a project increasing an attribute
    function grow(uint _id, Attribute _attr) public{
        //Only the owner of the project can grow***
        require(ownerOf(_id) == msg.sender, "Must be owner of project to grow it");

        //The project must be fit enough to grow
        projects[_id].state = castSubstract8(projects[_id].state, stateCostToGrow);
        //Must have enough lifecycle
        projects[_id].lifecycle = castSubstract256(projects[_id].lifecycle, lifecycleCostToGrow);

        // Increase the chosen attribute
        if (_attr == Attribute.technique) {
            projects[_id].technique = castAdd8(projects[_id].technique, attributeGainOnGrow);
        }else if (_attr == Attribute.aesthetics){
            projects[_id].aesthetics = castAdd8(projects[_id].aesthetics, attributeGainOnGrow);
        }else if (_attr == Attribute.usage){
            projects[_id].usage = castAdd8(projects[_id].usage, attributeGainOnGrow);
        }else if (_attr == Attribute.popularity){
            projects[_id].popularity = castAdd8(projects[_id].popularity, attributeGainOnGrow);
        }
        emit Grow(_id, _attr);
    }

    //Rest project, increasing state
    function rest(uint _id) public{
        //Only the owner of the project can rest
        require(ownerOf(_id) == msg.sender, "Must be owner of project to rest");

        //Must have enough lifecycle
        projects[_id].lifecycle = castSubstract256(projects[_id].lifecycle, lifecycleCostToRest);
        projects[_id].state = castAdd8(projects[_id].state, stateGainOnRest);

        emit Rest(_id);
    }
    ////Enlist project
    //state cost to reach complete status
    uint8 public stateCostToComplete = 20;
    //lifecycleGainWin
    uint8 public lifecycleGainWin = 10;
    //lifecycleGainlose
    uint8 public lifecycleGainLose = 5;

    //enlistedProjects
    mapping(uint => bool) public enlistedProjects;
    //enlistEvent
    event Enlist(uint indexed projectId);
    //delistEvent
    event Delist(uint indexed projectId);
    //contest
    event ContestEntered(uint indexed projectId, uint indexed opponentId, uint indexed winner);
     
    //Enlist project to complete
     function enlist(uint _id) public{
         //only the owner of the project can enlist
         require(ownerOf(_id) == msg.sender, "Must be owner of project to enlist");
         //Must not be enlisted already
         require(enlistedProjects[_id] == false, "Must not already be enlisted");
         //Check state
         require(projects[_id].state >= stateCostToComplete, "Must be in required state to complete");
         //Enlist
         enlistedProjects[_id] = true;
         //Emit
         emit Enlist(_id);

     }
     //Delist project 
     function delist(uint _id) public{
         //Only owner can delist
         require(ownerOf(_id) == msg.sender, "Must be owner of project to delist");
         //Must be enlisted
         require(enlistedProjects[_id] == true, "Must be enlisted");
         //Run delist
         _delist(_id);
     }
     function _delist(uint _id) private{
         enlistedProjects[_id] = false;
         emit Delist(_id);
     }
     
     //Contest
     function enterContest(uint _id, uint _opponentId) public{
         //Only owner
         require(ownerOf(_id) == msg.sender, "Must be owner of project to enter contest");
         //Must be enlisted
         require(enlistedProjects[_id] == true, "Must be enlisted");
         //Opponent must be enlisted
         require(enlistedProjects[_opponentId] == true, "Opponent must be enlisted");
         //Project state
         _requireContestState(_id, "Project not ready for a contest");
         //Opponents state
         _requireContestState(_opponentId, "Opponent not ready for a contest");
         uint projectScore = uint(projects[_id].technique)
            .add(uint(projects[_id].aesthetics))
            .add(uint(projects[_id].usage))
            .add(uint(projects[_id].popularity));
         uint opponentScore = uint(projects[_opponentId].technique)
            .add(uint(projects[_opponentId].aesthetics))
            .add(uint(projects[_opponentId].usage))
            .add(uint(projects[_opponentId].popularity));
        //State changes
        projects[_id].state = uint(projects[_id].state).sub(uint(stateCostToComplete)).toUint8();
        projects[_opponentId].state = uint(projects[_opponentId].state).sub(uint(stateCostToComplete)).toUint8();
        //Winner
        (uint winner, uint loser) = (projectScore >= opponentScore ) ? (_id, _opponentId) : (_opponentId, _id);
        //lifecycle changes
        projects[winner].lifecycle = uint(projects[winner].lifecycle).add(uint(lifecycleGainWin));
        projects[loser].lifecycle = uint(projects[loser].lifecycle).add(uint(lifecycleGainLose));
        //emit contest 
        emit ContestEntered(_id, _opponentId, winner);
        //check state again
        _isContestState(_id);
        _isContestState(_opponentId);
     }

     function _requireContestState(uint _id, string memory _message) private {
         if(!_isContestState(_id)){
             revert(_message);
         }
     }
     //check contest condition
     function _isContestState(uint _id) private returns (bool) {
         //require state is high
         //delist if not
         if (projects[_id].state <= stateCostToComplete){
             _delist(_id);
             return false;
         }
         return true;
     }
 
    /*
    uint public projectCount = 0;
    uint public completedProjects = 0;
    mapping(uint => Project) public projects;
    
    struct Project {
       uint id;
       string name;
       bool completed;
       address payable creator;
       bool purchased; 
    }

    event ProjectCreated(
        uint id,
        string name,
        bool completed,
        address payable creator,
        bool purchased
    );
    event ProjectCompleted(
        uint id,
        string name,
        bool completed,
        address payable creator,
        bool purchased
    );

   /* event ProjectPurchased(
        uint id,
       string name,
       uint price,
       address payable owner,
       bool purchased
    );
    
    /*constructor() public{
        name = "W3irds Art Projects";  
    }

    function createProject(string memory _name) public{
    //Require a name
    require(bytes(_name).length > 0);
    // Require a valid price
    //require(_price > 0);
    // Increment product count 
    projectCount ++;
    //create the product 
    projects[projectCount] = Project(projectCount, _name, false, msg.sender, false);
    //trigger an event
    emit ProjectCreated(projectCount, _name, false, msg.sender, false);
    }
    function completeProject(uint _id) public{
        //fetch product
        Project memory _project = projects[_id];
        //


        completedProjects ++;
        projects[completedProjects] = Project(completedProjects, _project.name, true, msg.sender, false);
        emit ProjectCompleted(completedProjects, _project.name, true, msg.sender, false);
    }
    

    /*function purchaseProject(uint _id) public payable{
        //fetch the product
        Project memory _project = projects[_id];
        //fetch the owner
        address payable _seller = _project.owner;
        //make sure the product is valid
        require(_project.id > 0 && _project.id<= projectCount);
        // Require that there is enough ether in the transaction
        require(msg.value >= _project.price);
        //require that the product has not been purchased
        require(!_project.purchased);
        //require the buyer is not the seller
        require(_seller != msg.sender);
        //purchase it/transfer ownershio to the buyer
        _project.owner = msg.sender;
        //mark as purchased 
        _project.purchased = true;
        // update the product 
        projects[_id] = _project;
        //pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        //trigger an event
        emit ProjectPurchased(projectCount, _project.name, _project.price, msg.sender, true);
  


    }*/
}