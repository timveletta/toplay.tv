const AWS = require("aws-sdk");

const TableName = "ToPlayTv-Games";

if (typeof dynamoDb === "undefined") {
  var dynamoDb = new AWS.DynamoDB.DocumentClient();
}

exports.handler = async function(event) {
  const gameType = event.gameType;
  const generatedCode = Math.random()
    .toString(36)
    .substr(2, 4);

  const Item = {
    code: generatedCode,
    createdAt: Math.round(new Date().getTime() / 1000),
    status: "LOBBY",
    type: gameType
  };

  const params = {
    TableName,
    Item
  };

  await dynamoDb.put(params).promise();

  console.log("returning", Item);

  return Item;
};
