const { StringDecoder } = require("string_decoder");
const protobufjs = require("protobufjs");

let previousProtoFilePath;

module.exports = ({ fixtureBody, message, protoFilePath } = {}) => {
      if(protoFilePath) {
        previousProtoFilePath = protoFilePath;
      }
      const protoPath = previousProtoFilePath;
      if(!protoPath) {
        throw new Error("No proto file path has been provided.");
      }

      // allows to set the proto file path in advance
      if(!message || !fixtureBody) {
        return null;
      }

      const proto = protobufjs.loadSync(protoPath);
      const protoMessage = proto.lookupType(message);
      const decoder = new StringDecoder("utf8");
      const bufferValue = protoMessage.encode(fixtureBody).finish();
      return decoder.end(Buffer.from(bufferValue));
    }
