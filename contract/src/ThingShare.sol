// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ThingShare is Ownable {
    struct RentalItem {
        address owner;
        string metadataUri; // IPFS hash of metadata
        bool isAvailable;
    }

    mapping(uint256 => RentalItem) public rentalItems; // Item ID => Rental Item
    uint256 public nextItemId;

    event ItemListed(
        uint256 indexed itemId,
        address indexed owner,
        string metadataUri
    );

    event ItemRented(
        uint256 indexed itemId,
        address indexed renter,
        uint256 rentalDays
    );

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
    function rentItem(uint256 itemId, uint256 rentalDays) external payable {
        RentalItem storage item = rentalItems[itemId];

        require(item.isAvailable, "Item is not available");
        require(
            msg.value == item.pricePerDay * rentalDays,
            "Incorrect payment amount"
        );

        // Transfer payment to the owner
        payable(item.owner).transfer(msg.value);

        item.isAvailable = false;

        emit ItemRented(itemId, msg.sender, rentalDays);
    }

    // Function to mark an item as available (owner only)
    function makeAvailable(uint256 itemId) external {
        require(msg.sender == rentalItems[itemId].owner, "Not the owner");
        rentalItems[itemId].isAvailable = true;
    }
}
