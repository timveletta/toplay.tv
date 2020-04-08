const AWS = require("aws-sdk");

const TableName = "ToPlayTv-Games";

if (typeof dynamoDb === "undefined") {
  var dynamoDb = new AWS.DynamoDB.DocumentClient();
}

exports.handler = async function (event) {
  const code = event.code;

  const params = {
    TableName,
    Key: {
      code,
    },
  };

  const { Item } = await dynamoDb.get(params).promise();
  return Item;
};
