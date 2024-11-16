import {
  ItemListed as ItemListedEvent,
  ItemRented as ItemRentedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/ThingShare/ThingShare"
import {
  ItemListed,
  ItemRented,
  OwnershipTransferred
} from "../generated/schema"

export function handleItemListed(event: ItemListedEvent): void {
  let entity = new ItemListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.itemId = event.params.itemId
  entity.owner = event.params.owner
  entity.metadataUri = event.params.metadataUri
  entity.pricePerDay = event.params.pricePerDay

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleItemRented(event: ItemRentedEvent): void {
  let entity = new ItemRented(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.itemId = event.params.itemId
  entity.renter = event.params.renter
  entity.rentalDays = event.params.rentalDays

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
