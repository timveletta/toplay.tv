import * as cdk from "@aws-cdk/core";
import * as AppSync from "@aws-cdk/aws-appsync";
import * as Lambda from "@aws-cdk/aws-lambda";
import * as DynamoDb from "@aws-cdk/aws-dynamodb";

// this could be a repeatable stack to make it easy to create new apps

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const gameTable = new DynamoDb.Table(this, "GameTable", {
      tableName: "ToPlayTv-Games",
      partitionKey: { name: "code", type: DynamoDb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const graphqlApi = new AppSync.GraphQLApi(this, "ToPlayTvApi", {
      name: "ToPlayTvApi",
      schemaDefinitionFile: "../schema.graphql",
      logConfig: {
        fieldLogLevel: AppSync.FieldLogLevel.ALL
      }
    });

    const createGameLambda = new Lambda.Function(this, "CreateGameLambda", {
      runtime: Lambda.Runtime.NODEJS_12_X,
      code: Lambda.Code.asset("../functions/createGame"),
      handler: "index.handler"
    });
    gameTable.grantReadWriteData(createGameLambda);

    const createGameDs = graphqlApi.addLambdaDataSource(
      "CreateGame",
      "",
      createGameLambda
    );
    createGameDs.createResolver({
      typeName: "Mutation",
      fieldName: "createGame",
      requestMappingTemplate: AppSync.MappingTemplate.lambdaRequest(
        "$util.toJson($ctx.args.input)"
      ),
      responseMappingTemplate: AppSync.MappingTemplate.lambdaResult()
    });
  }
}
