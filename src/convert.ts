export enum AttrType {
  "STRING",
  "NUMBER",
  "BOOLEAN",
  "BINARY",
}

type Writable =
  | { type: AttrType.STRING; colName: string; value: string }
  | { type: AttrType.NUMBER; colName: string; value: number }
  | { type: AttrType.BOOLEAN; colName: string; value: boolean }
  | { type: AttrType.BINARY; colName: string; value: string };

export function writeToItem(input: Writable) {
  switch (input.type) {
    case AttrType.STRING:
      return { [input.colName]: { S: input.value } };
    case AttrType.NUMBER:
      return { [input.colName]: { N: input.value.toString() } };
    case AttrType.BOOLEAN:
      return { [input.colName]: { BOOL: input.value } };
    case AttrType.BINARY:
      return { [input.colName]: { B: input.value } };
  }
}

// export function readFromItem() {
//   console.log("write");
// }
