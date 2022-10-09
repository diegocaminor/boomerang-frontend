// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

error Unauthorized();

/** 
 * @title Boomerang
 * @dev Implements Expense Manager Card of an Employee
 */
contract Boomerang {
    address public employee_Address;
    mapping(address => uint256) public vendorsCosts; //Vendor > Cost
    uint256 public balance;
    address public owner;
    uint public expirationDate;
    bool public expires;

    /// @notice CFA Library.
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1;

    event NewVendor(address indexed vendor, uint256 cost);
    event VendorPayment(address indexed vendor, uint256 payment);
    event FundsBack(address indexed employee, uint256 amount);

    constructor(address employee_Address_, bool expire_, ISuperfluid host ) payable {
        employee_Address = employee_Address_;
        balance = msg.value;
        owner = payable(msg.sender);
        expires = expire_;
        // Initialize CFA Library
        cfaV1 = CFAv1Library.InitData(
            host,
            IConstantFlowAgreementV1(
                address(
                    host.getAgreementClass(
                        keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                    )
                )
            )
        );
    }

    function changeExpirationFeature(bool value_) public isOwner{
        expires = value_;
    }


    function setExpirationDate(uint unixTime) public {
        require(expires , "This wallet is not expirable");
        expirationDate = unixTime;
    }


    function addBalance() payable public isOwner{
            balance += msg.value;
    }

    function addVendor(address account_new_vendor, uint256 cost_new_service) public isOwner{
        vendorsCosts[account_new_vendor] = cost_new_service;
        emit NewVendor(account_new_vendor, cost_new_service);
    }

    function removeVendor(address account_vendor) public isExpire isOwner{
        vendorsCosts[account_vendor] = 0;
    }

    function payVendor(address vendor_address) public isExpire{
        require(msg.sender == employee_Address);
        require(balance > vendorsCosts[vendor_address]);
        balance -= vendorsCosts[vendor_address];
        payable(vendor_address).transfer(vendorsCosts[vendor_address]);
        emit VendorPayment(vendor_address, vendorsCosts[vendor_address]);
    }

    function changeExpirationDate(uint new_date) public isExpire {
        expirationDate = new_date;
    } 

    function returnFunds() public isExpire isOwner {
        require(balance > 0);
        if(expires){
            require(block.timestamp >= expirationDate, "TimeConditions: too early");
        }
        uint256 balance_temp = balance;
        balance = 0;
        payable(owner).transfer(balance_temp);
        emit FundsBack(employee_Address, balance_temp);
    }

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier isExpire() {
        if(expires){
            require(expirationDate > 0, "Set expiration Date before continue");
        }
        _;
    }

    function createFlowFromContract(
        ISuperfluidToken token,
        address receiver,
        int96 flowRate
    ) external {
        if (msg.sender != owner) revert Unauthorized();

        cfaV1.createFlow(receiver, token, flowRate);
    }
}