const { StringDecoder } = require("string_decoder");
const protobufjs = require("protobufjs");

let previousProtoFilePath;

module.exports = on => {
  on("task", {
    protobufEncode: ({ fixtureBody, message, protoFilePath }) => {
      if(protoFilePath) {
        previousProtoFilePath = protoFilePath;
      }
      const protoPath = previousProtoFilePath;
      if(protoPath) {
        throw new Error("No proto file path has been provided.");
      }

      const proto = protobufjs.loadSync(protoPath);
      const protoMessage = proto.lookupType(message);
      const decoder = new StringDecoder("utf8");
      const bufferValue = protoMessage.encode(fixtureBody).finish();
      return decoder.end(Buffer.from(bufferValue));
    }
  });
};
