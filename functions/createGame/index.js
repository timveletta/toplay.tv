exports.handler = async function(event) {
  console.log("lambda handler invoked", JSON.stringify(event));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({
      code: "ABCD",
      createdAt: new Date().getTime() / 1000,
      status: "LOBBY",
      type: "TWOROOMSONEBOOM"
    })
  };
};
