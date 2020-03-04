import * as cdk from "@aws-cdk/core";
import * as AppSync from "@aws-cdk/aws-appsync";
import * as Lambda from "@aws-cdk/aws-lambda";
import * as DynamoDb from "@aws-cdk/aws-dynamodb";

// this could be a repeatable stack to make it easy to create new apps

export class ApiStack extends cdk.Stack {
  gameTable: DynamoDb.Table;
  graphQLApi: AppSync.GraphQLApi;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.gameTable = new DynamoDb.Table(this, "GameTable", {
      tableName: "ToPlayTv-Games",
      partitionKey: {
        name: "code",
        type: DynamoDb.AttributeType.STRING
      },
      billingMode: DynamoDb.BillingMode.PAY_PER_REQUEST
    });

    this.graphQLApi = new AppSync.GraphQLApi(this, "ToPlayTvApi", {
      name: "ToPlayTvApi",
      schemaDefinitionFile: "../schema.graphql",
      logConfig: {
        fieldLogLevel: AppSync.FieldLogLevel.ALL
      }
    });

    this.createLambdaResolver("createGame", "Mutation");
    this.createLambdaResolver("joinGame", "Mutation");
  }

  createLambdaResolver(fieldName: string, type: "Mutation" | "Query") {
    const lambda = new Lambda.Function(this, `${fieldName}Lambda`, {
      runtime: Lambda.Runtime.NODEJS_12_X,
      code: Lambda.Code.asset(`../functions/${fieldName}`),
      handler: "index.handler"
    });
    this.gameTable.grantReadWriteData(lambda);

    const dataSource = this.graphQLApi.addLambdaDataSource(
      fieldName,
      "",
      lambda
    );

    dataSource.createResolver({
      typeName: type,
      fieldName: fieldName,
      requestMappingTemplate: AppSync.MappingTemplate.lambdaRequest(
        "$util.toJson($ctx.args)"
      ),
      responseMappingTemplate: AppSync.MappingTemplate.lambdaResult()
    });
  }
}
