# DynaMaster 🧨

# 🚧 WORK IN PROGRESS 🚧

> 🪶Lightweight and 🔐Typed interaction with DynamoDB

> For information on Dynamo SDK, visit [their docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/)

Why I wrote this library:

- I think it is strange that `number` is passed as a `string` in the SDK
- I don't think is convenient that `binary` SDK requires the user to pass in the binary instead of a `string`
- I think the keys used to index the `AttributeValue` are confusing (i.e. `S`, `SS`, `M`, etc.)
- The creation of a Map is very confusing and verbose

# 🎯 The goal

Write the smallest typed library that interfaces with DynamoDB using native `TS` variables and objects.

# Features

- [ ] It can convert `JS` or `TS` variables to `DynamoDB` [AttributeValue](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html)
- [x] `boolean` implemented
- [x] `null` implemented
- [x] `number` implemented
- [x] `string` implemented
- [x] `binary` implemented
- [x] `Set(number)` implemented
- [x] `Set(string)` implemented
- [x] `Set(binary)` implemented
- [ ] `list` missing
- [ ] `map` missing
- [ ] `unknown` missing

# Usage

```ts
import { AttrType, writeToItem } from "dynamaster";
import {
  BatchWriteItemCommand,
  BatchWriteItemCommandOutput,
  DynamoDBClient,
  WriteRequest,
} from '@aws-sdk/client-dynamodb';

// string 👇
const myStringItem = writeToItem({
  type: AttrType.STRING,
  colName: "myColumnName",
  value: "payload"
})

// number 👇
const myNumberItem = writeToItem({
  type: AttrType.NUMBER,
  colName: "myColumnName",
  value: 123
})

// boolean 👇
const myBoolItem = writeToItem({
  type: AttrType.BOOLEAN,
  colName: "boolColFalse",
  value: false,
})

const tableName = "yourTableName"
const input = {
  "RequestItems": {
    [tableName]: [
      //                        👇            👇            👇
      { "PutRequest": { "Item": myStringItem, myNumberItem, myBoolItem } }
    ]
  }
}
const command = new BatchWriteItemCommand(input);
await client.send(command);
```