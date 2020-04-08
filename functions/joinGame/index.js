const AWS = require("aws-sdk");
const uuidv4 = require("uuid").v4;

const TableName = "ToPlayTv-Games";

if (typeof dynamoDb === "undefined") {
  var dynamoDb = new AWS.DynamoDB.DocumentClient();
}

exports.handler = async function (event) {
  const gameCode = event.code.toLowerCase();
  const playerName = event.name;

  const playerItem = {
    id: uuidv4(),
    name: playerName,
  };

  try {
    const params = {
      TableName,
      Key: { code: gameCode },
      ReturnValues: "ALL_NEW",
      UpdateExpression:
        "set #players = list_append(if_not_exists(#players, :empty_list), :player)",
      ExpressionAttributeNames: {
        "#players": "players",
      },
      ExpressionAttributeValues: {
        ":player": [playerItem],
        ":empty_list": [],
      },
      ConditionExpression: "attribute_exists(code)",
    };

    const updateResult = await dynamoDb.update(params).promise();
    console.log("Update result", updateResult);
    return {
      ...playerItem,
      code: gameCode,
    };
  } catch (e) {
    return `Could not find the game with code ${gameCode}.`;
  }
};
