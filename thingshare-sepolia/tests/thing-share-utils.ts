import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ItemListed,
  ItemRented,
  OwnershipTransferred
} from "../generated/ThingShare/ThingShare"

export function createItemListedEvent(
  itemId: BigInt,
  owner: Address,
  metadataUri: string,
  pricePerDay: BigInt
): ItemListed {
  let itemListedEvent = changetype<ItemListed>(newMockEvent())

  itemListedEvent.parameters = new Array()

  itemListedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "metadataUri",
      ethereum.Value.fromString(metadataUri)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerDay",
      ethereum.Value.fromUnsignedBigInt(pricePerDay)
    )
  )

  return itemListedEvent
}

export function createItemRentedEvent(
  itemId: BigInt,
  renter: Address,
  rentalDays: BigInt
): ItemRented {
  let itemRentedEvent = changetype<ItemRented>(newMockEvent())

  itemRentedEvent.parameters = new Array()

  itemRentedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  itemRentedEvent.parameters.push(
    new ethereum.EventParam("renter", ethereum.Value.fromAddress(renter))
  )
  itemRentedEvent.parameters.push(
    new ethereum.EventParam(
      "rentalDays",
      ethereum.Value.fromUnsignedBigInt(rentalDays)
    )
  )

  return itemRentedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
