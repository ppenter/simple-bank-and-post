pragma solidity ^0.8.0;

contract Bank {
    mapping (address => uint) private balances;

    event Deposite(address indexed from, uint amount);
    event Withdraw(address indexed to, uint amount);
    event Transfer(address indexed from,address indexed to, uint amount);

    function deposite() public payable returns (uint256) {
        balances[msg.sender] += msg.value;
        emit Deposite(msg.sender, msg.value);
        return balances[msg.sender];
    }

    function withdraw(uint256 withdrawAmount) public returns (uint256 remainingBal) {
        // Check enough balance available, otherwise just return balance
        if (withdrawAmount <= balances[msg.sender]) {
            balances[msg.sender] -= withdrawAmount;
            payable(msg.sender).transfer(withdrawAmount);
            emit Withdraw(msg.sender, withdrawAmount);
        }
        return balances[msg.sender];
    }

    function transfer(address to, uint256 amount) public returns (bool status){
        if (amount <= balances[msg.sender]) {
            balances[msg.sender] -= amount;
            balances[to] += amount;
            emit Transfer(msg.sender,to , amount);
            return true;
        }else{
            return false;
        }
    }

    function balance(address _address) public view returns (uint) {
        return balances[_address];
    }
    function bankBalance() public view returns (uint) {
        return address(this).balance;
    }
}