import { Buffer } from "node:buffer";
import { AttributeValue } from "@aws-sdk/client-dynamodb";

export enum AttrType {
  "STRING",
  "STRING_SET",

  "NUMBER",
  "NUMBER_SET",

  "BINARY",
  "BINARY_SET",

  "BOOLEAN",
  "NULL",

  "LIST",
  "MAP",

  "UNKNOWN",
}

export type Writable =
  | { type: AttrType.STRING; colName: string; value: string }
  | { type: AttrType.STRING_SET; colName: string; value: string[] }
  | { type: AttrType.NUMBER; colName: string; value: number }
  | { type: AttrType.NUMBER_SET; colName: string; value: number[] }
  | { type: AttrType.BINARY; colName: string; value: string }
  | { type: AttrType.BINARY_SET; colName: string; value: string[] }
  | { type: AttrType.LIST; colName: string; value: unknown[] }
  | { type: AttrType.MAP; colName: string; value: Record<string, unknown> }
  | { type: AttrType.BOOLEAN; colName: string; value: boolean }
  | { type: AttrType.NULL; colName: string; value: boolean }
  | { type: AttrType.UNKNOWN; colName: string; value: boolean };

export function writeToItem(
  input: Writable
): Record<string, AttributeValue> | undefined {
  switch (input.type) {
    case AttrType.STRING:
      return { [input.colName]: { S: input.value } };

    case AttrType.STRING_SET:
      const s = new Set(input.value);
      return { [input.colName]: { SS: Array.from(s) } };

    case AttrType.NUMBER:
      return { [input.colName]: { N: input.value.toString() } };

    case AttrType.NUMBER_SET:
      const str = input.value.map((n) => n.toString());
      return { [input.colName]: { NS: Array.from(new Set(str)) } };

    case AttrType.LIST:
      // TODO: iterate items on list, infer types and create respective Dynamo object
      return {
        [input.colName]: { L: [{ S: "string value on list" }, { N: "0" }] },
      };

    case AttrType.BOOLEAN:
      return { [input.colName]: { BOOL: input.value } };

    case AttrType.BINARY:
      return { [input.colName]: { B: Buffer.from(input.value, "base64") } };

    case AttrType.BINARY_SET:
      return {
        [input.colName]: {
          BS: input.value.map((v) => Buffer.from(v, "base64")),
        },
      };

    case AttrType.NULL:
      return { [input.colName]: { NULL: input.value } };

    case AttrType.MAP:
      return {};

    case AttrType.UNKNOWN:
      return { [input.colName]: { $unknown: ["string", "any"] } };
  }
}
