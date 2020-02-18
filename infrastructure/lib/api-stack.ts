import * as cdk from "@aws-cdk/core";
import * as AppSync from "@aws-cdk/aws-appsync";

const TABLE_NAME = "ToPlayTV-Lobby";

// this could be a repeatable stack to make it easy to create new apps

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const graphqlApi = new AppSync.GraphQLApi(this, "ToPlayTvApi", {
      name: "ToPlayTvApi",
      schemaDefinitionFile: "../schema.graphql"
    });
  }
}
