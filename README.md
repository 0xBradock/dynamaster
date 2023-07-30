# DynaMaster 🧨

> 🪶Lightweight and 🔐Typed interaction with DynamoDB

> For information on Dynamo SDK, visit [their docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/)

# Features

- [ ] It can convert `JS` or `TS` variables to `DynamoDB` [AttributeValue](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html)

# Usage

```ts
import { AttrType, writeToItem } from "dynamaster";
import {
  BatchWriteItemCommand,
  BatchWriteItemCommandOutput,
  DynamoDBClient,
  WriteRequest,
} from '@aws-sdk/client-dynamodb';

// string
const myStringItem = writeToItem({ type: AttrType.STRING, colName: "myColumnName", value: "payload" })

// number
const myNumberItem = writeToItem({ type: AttrType.NUMBER, colName: "myColumnName", value: 123 })

const tableName = "yourTableName"
const input = {
  "RequestItems": {
    [tableName]: [
      {
        "PutRequest": {
          "Item": {
            myStringItem,
            myNumberItem
          }
        }
      }
    ]
  }
}
const command = new BatchWriteItemCommand(input);
await client.send(command);
```