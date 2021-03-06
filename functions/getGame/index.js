const AWS = require("aws-sdk");

const TableName = "ToPlayTv-Games";

if (typeof dynamoDb === "undefined") {
  var dynamoDb = new AWS.DynamoDB.DocumentClient();
}

exports.handler = async function (event) {
  const id = event.id;

  const params = {
    TableName,
    Key: {
      id,
    },
  };

  const { Item } = await dynamoDb.get(params).promise();

  return {
    ...Item,
    players: Object.keys(Item.players).map((playerId) => ({
      id: playerId,
      ...Item.players[playerId],
    })),
  };
};
