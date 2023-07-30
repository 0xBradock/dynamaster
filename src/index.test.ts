import { AttrType, writeToItem } from "./convert";

describe("writeToItem", () => {
  test("should write attributes", () => {
    const testCases = [
      {
        jsObj: { type: AttrType.STRING, colName: "strCol", value: "fas" },
        ddbObj: { strCol: { S: "fas" } },
      },
      // {
      //   jsObj: { type: AttrType.NUMBER, colName: "numCol", value: 123 },
      //   ddbObj: { numCol: { N: "123" } },
      // },
      // {
      //   jsObj: {
      //     type: AttrType.BOOLEAN,
      //     colName: "boolColFalse",
      //     value: false,
      //   },
      //   ddbObj: { boolColFalse: { BOOL: false } },
      // },
      // {
      //   jsObj: { type: AttrType.BOOLEAN, colName: "boolColTrue", value: true },
      //   ddbObj: { boolColTrue: { BOOL: true } },
      // },
      // {
      //   jsObj: { type: AttrType.BINARY, colName: "binCol", value: "dXNlcg==" },
      //   ddbObj: { binCol: { B: "dXNlcg==" } },
      // },

      // { jsObj: { nullVal: true }, ddbObj: { nullVal: { NULL: true } } },
      // {
      //   jsObj: { stringSet: ["first", "second"] },
      //   ddbObj: { stringSet: { SS: ["first", "second"] } },
      // },
      // {
      //   jsObj: { numberSet: ["0", "1"] },
      //   ddbObj: { numberSet: { NS: ["0", "1"] } },
      // },
      // { jsObj: { NewValue: [""] }, ddbObj: { NewValue: { BS: [""] } } },
      // {
      //   jsObj: { list: [{ S: "string value on list" }, { N: "0" }] },
      //   ddbObj: { list: { L: [{ S: "string value on list" }, { N: "0" }] } },
      // },
      // {
      //   jsObj: { mapVal: { NewValue: { N: "0" }, NewValue1: { S: "fds" } } },
      //   ddbObj: {
      //     mapVal: { M: { NewValue: { N: "0" }, NewValue1: { S: "fds" } } },
      //   },
      // },
    ] as const;

    testCases.forEach((tt) => {
      expect(writeToItem(tt.jsObj)).toEqual(tt.ddbObj);
    });
  });
});
