const AWS = require("aws-sdk");
const uuidv4 = require("uuid").v4;

const TableName = "ToPlayTv-Games";

if (typeof dynamoDb === "undefined") {
  var dynamoDb = new AWS.DynamoDB.DocumentClient();
}

exports.handler = async function (event) {
  const gameType = event.gameType;
  const generatedCode = Math.random().toString(36).substr(2, 4);

  const Item = {
    id: uuidv4(),
    code: generatedCode,
    createdAt: Math.round(new Date().getTime() / 1000),
    state: {
      status: "LOBBY",
    },
    type: gameType,
    players: {},
  };

  const params = {
    TableName,
    Item,
  };

  await dynamoDb.put(params).promise();

  return {
    ...Item,
    players: [],
  };
};
