pragma solidity >=0.5.0 <0.7.0;

contract W3irds {
//Owner
address public owner;

//Mapping
mapping(address => Artist) public artists;

//modifier
modifier onlyOwner{
    require(msg.sender === owner, "Only owner can register a user.");
    _;
    }
constructor() public {
    owner = msg.sender;
    }

struct Artist {
    string name;
    uint8 age;
    bool registered;
    }

event NewArtist (address artistAdress, string name, uint8 age);

event NewValue (address artistAddress, uint256 value);


function registerArtist(
    address _address,
    string memory _name,
    uint8 _age 
    )
    public onlyOwner {
        artists[_address] =
        Artist(_name, _age, true);
            emit NewArtist(_address, _name, _age);
            }
function send(uint256 _value)
    public{
        require(
            artists[msg.sender].registered == true, 
            "Caller is not registered." );
                emit NewValue(msg.sender, _value);
                }

}