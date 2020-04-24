const AWS = require("aws-sdk");
const uuidv4 = require("uuid").v4;

const TableName = "ToPlayTv-Games";
const IndexName = "gameCodeGSI";

if (typeof dynamoDb === "undefined") {
  var dynamoDb = new AWS.DynamoDB.DocumentClient();
}

exports.handler = async function (event) {
  const gameCode = event.code.toLowerCase();
  const playerName = event.name;

  const playerId = uuidv4();
  const playerItem = {
    name: playerName,
  };

  const getGameId = async () => {
    const result = await dynamoDb
      .query({
        TableName,
        IndexName,
        KeyConditionExpression: "code = :code",
        ExpressionAttributeValues: {
          ":code": gameCode,
        },
      })
      .promise();

    console.log("Get game result: ", result);

    if (result.Items.length === 0) {
      return `Could not find the game with code ${gameCode}.`;
    }

    return result.Items[0];
  };

  const { id } = await getGameId();

  try {
    const params = {
      TableName,
      Key: { id },
      UpdateExpression: "set players.#playerId = :player",
      ExpressionAttributeNames: {
        "#playerId": playerId,
      },
      ExpressionAttributeValues: {
        ":player": playerItem,
      },
      ConditionExpression: "attribute_not_exists(players.#playerId)",
    };

    await dynamoDb.update(params).promise();

    console.log("Result: ", {
      ...playerItem,
      code: gameCode,
      gameId: id,
      id: playerId,
    });

    return {
      ...playerItem,
      code: gameCode,
      gameId: id,
      id: playerId,
    };
  } catch (e) {
    console.log("Cannot add player to game. ID: ", id);
    return `Cannot add player to the game with code ${gameCode}.`;
  }
};
