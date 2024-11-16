import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ItemListed } from "../generated/schema"
import { ItemListed as ItemListedEvent } from "../generated/ThingShare/ThingShare"
import { handleItemListed } from "../src/thing-share"
import { createItemListedEvent } from "./thing-share-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let itemId = BigInt.fromI32(234)
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let metadataUri = "Example string value"
    let pricePerDay = BigInt.fromI32(234)
    let newItemListedEvent = createItemListedEvent(
      itemId,
      owner,
      metadataUri,
      pricePerDay
    )
    handleItemListed(newItemListedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ItemListed created and stored", () => {
    assert.entityCount("ItemListed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ItemListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "itemId",
      "234"
    )
    assert.fieldEquals(
      "ItemListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ItemListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadataUri",
      "Example string value"
    )
    assert.fieldEquals(
      "ItemListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pricePerDay",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
