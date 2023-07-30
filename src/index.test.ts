import { AttrType, Writable, writeToItem } from "./convert";

describe("writeToItem", () => {
  test("should write attributes", () => {
    const testCases = [
      {
        jsObj: { type: AttrType.STRING, colName: "strCol", value: "fas" },
        ddbObj: { strCol: { S: "fas" } },
      },
      {
        jsObj: { type: AttrType.NUMBER, colName: "numCol", value: 123 },
        ddbObj: { numCol: { N: "123" } },
      },
      {
        jsObj: {
          type: AttrType.BOOLEAN,
          colName: "boolColFalse",
          value: false,
        },
        ddbObj: { boolColFalse: { BOOL: false } },
      },
      {
        jsObj: { type: AttrType.BOOLEAN, colName: "boolColTrue", value: true },
        ddbObj: { boolColTrue: { BOOL: true } },
      },
      {
        jsObj: { type: AttrType.BINARY, colName: "binCol", value: "pass" },
        ddbObj: {
          binCol: { B: Buffer.from("pass", "base64") },
        },
      },
      {
        jsObj: { type: AttrType.NULL, colName: "nullColIsNull", value: true },
        ddbObj: { nullColIsNull: { NULL: true } },
      },
      {
        jsObj: {
          type: AttrType.NULL,
          colName: "nullColIsNotNull",
          value: false,
        },
        ddbObj: { nullColIsNotNull: { NULL: false } },
      },
    ] as const;

    testCases.forEach((tt) => {
      expect(writeToItem(tt.jsObj)).toEqual(tt.ddbObj);
    });
  });

  // TODO: Requires implementation
  // test("should write list", () => {
  //   const data: Writable = {
  //     type: AttrType.LIST,
  //     colName: "listCol",
  //     value: ["string value on list", 0],
  //   };
  //   const got = writeToItem(data);
  //   const want = {
  //     listCol: { L: [{ S: "string value on list" }, { N: "0" }] },
  //   };

  //   expect(got).toEqual(want);
  // });

  // TODO: Requires implementation
  // A recursive approach would best
  // test("should write str set", () => {
  //   const data: Writable = {
  //     type: AttrType.MAP,
  //     colName: "mapCol",
  //     value: {
  //       key1: 123,
  //       key2: "string value",
  //       key3: null,
  //       innerMap: { key11: "inside string", key12: true },
  //     },
  //   };

  //   const got = writeToItem(data);
  //   const want = {
  //     mapCol: {
  //       M: {
  //         key1: { N: "123" },
  //         key2: { S: "string value" },
  //         key3: { NULL: true },
  //         innerMap: {
  //           M: {
  //             key11: { S: "inside string" },
  //             key12: { BOOL: true },
  //           },
  //         },
  //       },
  //     },
  //   };

  //   expect(got).toEqual(want);
  // });

  test("should write str set", () => {
    const data: Writable = {
      type: AttrType.STRING_SET,
      colName: "strSetCol",
      value: ["first", "second", "first"],
    };

    const got = writeToItem(data);
    const want = { strSetCol: { SS: ["first", "second"] } };

    expect(got).toEqual(want);
  });

  test("should write number set", () => {
    const data: Writable = {
      type: AttrType.NUMBER_SET,
      colName: "nbSetCol",
      value: [1, 2, 3, 4, 3, 2, 1],
    };

    const got = writeToItem(data);
    const want = { nbSetCol: { NS: ["1", "2", "3", "4"] } };

    expect(got).toEqual(want);
  });

  test("should write number set", () => {
    const values = ["user", "pass"];
    const data: Writable = {
      type: AttrType.BINARY_SET,
      colName: "binSetCol",
      value: values,
    };

    const got = writeToItem(data);
    const want = {
      binSetCol: { BS: values.map((v) => Buffer.from(v, "base64")) },
    };

    expect(got).toEqual(want);
  });
});
