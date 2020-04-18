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

  const getCurrentGame = async () =>
    (
      await dynamoDb
        .get({
          TableName,
          Key: {
            code: gameCode,
          },
        })
        .promise()
    ).Item;

  const { type, players } = await getCurrentGame();
  // if it is a team based game, add teams
  if (type === "CODEBREAKERS") {
    playerItem.team = (players.length % 2) + 1;
  } // TODO else, assign player color

  try {
    const params = {
      TableName,
      Key: { code: gameCode },
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

    await dynamoDb.update(params).promise();

    console.log("Return result", {
      ...playerItem,
      code: gameCode,
    });

    return {
      ...playerItem,
      code: gameCode,
    };
  } catch (e) {
    return `Could not find the game with code ${gameCode}.`;
  }
};
