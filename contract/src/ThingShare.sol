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

    struct Invoice {
        uint256 itemId;
        uint256 totalPrice;
        uint256 dayLongRent;
        bool isPaid;
    }

    mapping(uint256 => RentalItem) public rentalItems; // Item ID => Rental Item
    mapping(uint256 => Invoice) public invoices; // Invoice ID => Invoice
    uint256 public nextItemId;
    uint256 public nextInvoiceId;

    event ItemListed(
        uint256 indexed itemId,
        address indexed owner,
        string metadataUri,
        uint256 pricePerDay
    );

    event ItemRented(uint256 indexed itemId, uint256 indexed totalPrice);

    event ItemReturned(uint256 indexed itemId, address indexed renter);

    event InvoiceCreated(
        uint256 indexed invoiceId,
        uint256 indexed itemId,
        uint256 totalPrice,
        uint256 dayLongRent
    );

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

    // Function to create an invoice for renting an item
    function createInvoice(
        uint256 itemId,
        uint256 dayLongRent,
        uint256 totalPrice
    ) external {
        RentalItem storage item = rentalItems[itemId];

        require(item.isAvailable, "Item is not available");

        invoices[nextInvoiceId] = Invoice({
            itemId: itemId,
            totalPrice: totalPrice,
            dayLongRent: dayLongRent,
            isPaid: false
        });

        emit InvoiceCreated(nextInvoiceId, itemId, totalPrice, dayLongRent);
        nextInvoiceId++;
    }

    // Function to pay for an invoice and rent an item
    function payInvoice(uint256 invoiceId) external payable {
        Invoice storage invoice = invoices[invoiceId];
        RentalItem storage item = rentalItems[invoice.itemId];

        require(!invoice.isPaid, "Invoice is already paid");
        require(msg.value == invoice.totalPrice, "Incorrect payment amount");

        // Transfer payment to the owner
        payable(item.owner).transfer(msg.value);

        item.isAvailable = false;
        invoice.isPaid = true;

        emit ItemRented(invoice.itemId, invoice.totalPrice);
    }

    function returnItem(uint256 itemId) external {
        RentalItem storage item = rentalItems[itemId];

        require(!item.isAvailable, "Item is already available");
        require(msg.sender == item.owner, "Only the owner can return the item");

        item.isAvailable = true;

        emit ItemReturned(itemId, msg.sender);
    }

    // Function to get invoice details
    function getInvoice(
        uint256 invoiceId
    ) external view returns (Invoice memory) {
        return invoices[invoiceId];
    }
}
