const AWS = require("aws-sdk");

const TableName = "ToPlayTv-Games";

if (typeof dynamoDb === "undefined") {
  var dynamoDb = new AWS.DynamoDB.DocumentClient();
}

const buildUpdateParams = (input) => ({
  ExpressionAttributeValues: Object.keys(input).reduce(
    (prev, key) => Object.assign({}, prev, { [`:${key}`]: input[key] }),
    {}
  ),
  UpdateExpression: `SET ${Object.keys(input).reduce(
    (prev, key, index) =>
      `${prev}${index !== 0 ? " AND " : ""}players.#playerId.${key} = :${key}`,
    ""
  )}`,
});

exports.handler = async function (event) {
  const { id, gameId, input } = event;

  console.log("Input: ", input);

  const params = {
    TableName,
    Key: {
      id: gameId,
    },
    ExpressionAttributeNames: {
      "#playerId": id,
    },
    ConditionExpression: "attribute_exists(players.#playerId)",
    ReturnValues: "ALL_NEW",
    ...buildUpdateParams(input),
  };

  console.log("Update params: ", params);

  const { Attributes } = await dynamoDb.update(params).promise();

  const player = Attributes.players[id];

  return player
    ? player
    : `Cannot find player with ID ${id} on game with ID ${gameId}`;
};
