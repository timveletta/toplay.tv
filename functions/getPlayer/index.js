const AWS = require("aws-sdk");

const TableName = "ToPlayTv-Games";

if (typeof dynamoDb === "undefined") {
  var dynamoDb = new AWS.DynamoDB.DocumentClient();
}

exports.handler = async function (event) {
  const { id, gameId } = event;

  const params = {
    TableName,
    Key: {
      id: gameId,
    },
  };

  const { Item } = await dynamoDb.get(params).promise();

  console.log("input", id, gameId, "result", Item);

  const player = Item.players[id];

  return player
    ? player
    : `Cannot find player with ID ${id} on game with ID ${gameId}`;
};
