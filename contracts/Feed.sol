pragma solidity ^0.8.0;

contract Feed {
    struct Post{
        uint256 timestamp;
        uint256 id;
        string content;
        address creator;
    }

    Post[] private posts;
    mapping(address => uint256) donations;
    uint256 allDonate = 0;
    uint256 postCount = 0;
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }

    event Posting(uint256 indexed id, uint256 timestamp, string content, address creator);
    event Withdraw(address creator, uint256 amount, uint256 timestamp);
    event Donate(address indexed from, uint256 postId,uint256 indexed creator, uint256 indexed timestamp, uint256 amount);

    function post(string memory content) public {
        posts.push(Post(block.timestamp,postCount, content, msg.sender));
        emit Posting(postCount, block.timestamp, content, msg.sender);
        postCount++;
    }

    function donate(uint256 id) payable public {
        donations[posts[id].creator] += msg.value;
        allDonate += msg.value;
        emit Donate(msg.sender, id,donations[posts[id].creator], block.timestamp, msg.value);
    }

    function withdraw(uint256 amount) public{
        if (amount <= donations[msg.sender]) {
            donations[msg.sender] -= amount;
            payable(msg.sender).transfer(amount - ((amount*10)/100));
            emit Withdraw(msg.sender, amount , block.timestamp);
        }
    }

    function balance(address _address) public view returns (uint256) {
        return donations[_address];
    }

    function allPost() public view returns (Post[] memory) {
        return posts;
    }

    function getPost(uint256 id) public view returns (Post memory)  {
        return posts[id];
    }
}