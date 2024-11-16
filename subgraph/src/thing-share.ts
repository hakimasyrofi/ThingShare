import {
  ItemListed as ItemListedEvent,
  ItemRented as ItemRentedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ThingShare,
} from "../generated/ThingShare/ThingShare";
import {
  ItemListed,
  ItemRented,
  OwnershipTransferred,
  Item,
} from "../generated/schema";
import { ItemMetadata as ItemMetadataTemplate } from "../generated/templates";

export function handleItemListed(event: ItemListedEvent): void {
  let item = Item.load(event.params.itemId.toString());
  let contract = ThingShare.bind(event.address);

  if (!item) {
    item = new Item(event.params.itemId.toString());

    let itemData = contract.rentalItems(event.params.itemId);

    const cid = itemData.getMetadataUri().toString().replace("ipfs://", "");

    item.price = event.params.pricePerDay;
    item.owner = event.params.owner.toHexString();
    item.metadata = cid;
    item.cid = cid;

    ItemMetadataTemplate.create(cid);
  }

  item.save();
}

export function handleItemRented(event: ItemRentedEvent): void {
  let entity = new ItemRented(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.itemId = event.params.itemId;
  entity.renter = event.params.renter;
  entity.rentalDays = event.params.rentalDays;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
