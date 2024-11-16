// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {Deploy} from "../script/Deploy.s.sol";
import "../src/ThingShare.sol";

contract ThingShareTest is Test {
    ThingShare private thingShare;

    address private ADMIN;
    address private HOST = address(0x123);
    address private RENTER = address(0x456);

    function setUp() public {
        // Deploy the ThingShare contract
        Deploy deployThingShare = new Deploy();
        thingShare = deployThingShare.run();
        ADMIN = thingShare.owner();

        // Fund the RENTER account with 10 ether for testing purposes
        vm.deal(RENTER, 10 ether);
    }

    function testListItem() public {
        vm.prank(HOST);
        thingShare.listItem("ipfs://metadataUri", 1 ether);

        (
            address owner,
            string memory metadataUri,
            uint256 pricePerDay,
            bool isAvailable
        ) = thingShare.rentalItems(0);
        assertEq(owner, HOST);
        assertEq(metadataUri, "ipfs://metadataUri");
        assertEq(pricePerDay, 1 ether);
        assertTrue(isAvailable);
    }

    function testFailListItemWithZeroPrice() public {
        vm.prank(HOST);
        thingShare.listItem("ipfs://metadataUri", 0);
    }

    function testRentItem() public {
        vm.prank(HOST);
        thingShare.listItem("ipfs://metadataUri", 1 ether);

        vm.prank(RENTER);
        thingShare.rentItem{value: 1 ether}(0, 1);

        (, , , bool isAvailable) = thingShare.rentalItems(0);
        assertFalse(isAvailable);
    }

    function testFailRentItemWithIncorrectPayment() public {
        vm.prank(HOST);
        thingShare.listItem("ipfs://metadataUri", 1 ether);

        vm.prank(RENTER);
        thingShare.rentItem{value: 0.5 ether}(0, 1);
    }

    function testMakeAvailable() public {
        vm.prank(HOST);
        thingShare.listItem("ipfs://metadataUri", 1 ether);

        vm.prank(RENTER);
        thingShare.rentItem{value: 1 ether}(0, 1);

        vm.prank(HOST);
        thingShare.makeAvailable(0);

        (, , , bool isAvailable) = thingShare.rentalItems(0);
        assertTrue(isAvailable);
    }

    function testFailMakeAvailableByNonOwner() public {
        vm.prank(HOST);
        thingShare.listItem("ipfs://metadataUri", 1 ether);

        vm.prank(RENTER);
        thingShare.rentItem{value: 1 ether}(0, 1);

        vm.prank(address(0x789));
        thingShare.makeAvailable(0);
    }
}
