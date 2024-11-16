// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {ThingShare} from "../src/ThingShare.sol";

contract Deploy is Script {
    function deployTrip() external returns (ThingShare) {
        vm.startBroadcast();
        ThingShare thingShare = new ThingShare();
        vm.stopBroadcast();
        return thingShare;
    }
}
