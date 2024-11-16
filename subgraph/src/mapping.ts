import { Bytes, dataSource, json } from "@graphprotocol/graph-ts";
import { ItemMetadata } from "../generated/schema";

export function handleItemMetadata(content: Bytes): void {
  let itemMetadata = new ItemMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();
  if (value) {
    const name = value.get("name");
    const description = value.get("description");
    const image = value.get("image");

    if (name && image && description) {
      itemMetadata.name = name.toString();
      itemMetadata.image = image
        .toString()
        .replace("ipfs://", "https://ipfs.io/ipfs/");
      itemMetadata.description = description.toString();
    }

    itemMetadata.save();
  }
}
