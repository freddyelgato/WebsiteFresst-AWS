from flask_graphql import GraphQLView
from flask_swagger_ui import get_swaggerui_blueprint
from schema import schema

def create_routes(app):
    # GraphQL Endpoint
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
    )

    # Swagger Configuration
    SWAGGER_URL = "/swagger"
    API_URL = "/static/swagger.json"  # JSON file for documentation
    swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)
