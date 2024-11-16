// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ThingShare is Ownable {
    struct RentalItem {
        address owner;
        string metadataUri; // IPFS hash of metadata
        uint256 pricePerDay;
        bool isAvailable;
    }

    mapping(uint256 => RentalItem) public rentalItems; // Item ID => Rental Item
    uint256 public nextItemId;

    event ItemListed(
        uint256 indexed itemId,
        address indexed owner,
        string metadataUri,
        uint256 pricePerDay
    );

    event ItemRented(uint256 indexed itemId, uint256 indexed totalPrice);

    event ItemReturned(uint256 indexed itemId, address indexed renter);

    constructor() Ownable(msg.sender) {}

    // Function to list an item
    function listItem(string memory metadataUri, uint256 pricePerDay) external {
        require(pricePerDay > 0, "Price must be greater than zero");

        rentalItems[nextItemId] = RentalItem({
            owner: msg.sender,
            metadataUri: metadataUri,
            pricePerDay: pricePerDay,
            isAvailable: true
        });

        emit ItemListed(nextItemId, msg.sender, metadataUri, pricePerDay);
        nextItemId++;
    }

    // Function to rent an item
    function rentItem(uint256 itemId, uint256 totalPrice) external payable {
        RentalItem storage item = rentalItems[itemId];

        require(item.isAvailable, "Item is not available");

        // Transfer payment to the owner
        payable(item.owner).transfer(msg.value);

        item.isAvailable = false;

        emit ItemRented(itemId, totalPrice);
    }

    function returnItem(uint256 itemId) external {
        RentalItem storage item = rentalItems[itemId];

        require(!item.isAvailable, "Item is already available");
        require(msg.sender == item.owner, "Only the owner can return the item");

        item.isAvailable = true;

        emit ItemReturned(itemId, msg.sender);
    }
}
