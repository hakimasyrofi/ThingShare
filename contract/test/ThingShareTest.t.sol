// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {Deploy} from "../script/Deploy.s.sol";
import "../src/ThingShare.sol";

contract ThingShareTest is Test {
    ThingShare private thingShare;

    address private ADMIN;

    function setUp() public {
        // Deploy the ThingShare contract
        Deploy deployThingShare = new Deploy();
        thingShare = deployThingShare.run();
        ADMIN = thingShare.owner();

        thingShare.owner();
    }
}
