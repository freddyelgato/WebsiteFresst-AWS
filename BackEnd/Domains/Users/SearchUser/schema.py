import graphene
from search_user import search_user_by_id, search_user_by_name

# Definir tipo de dato para usuarios
class UserType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    email = graphene.String()

# Definir las consultas de GraphQL
class Query(graphene.ObjectType):
    search_user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    search_user_by_name = graphene.List(UserType, name=graphene.String(required=True))

    def resolve_search_user_by_id(self, info, id):
        user = search_user_by_id(id)
        return UserType(id=user[0], name=user[1], email=user[2]) if user else None

    def resolve_search_user_by_name(self, info, name):
        users = search_user_by_name(name)
        return [UserType(id=user[0], name=user[1], email=user[2]) for user in users] if users else []

# Crear esquema GraphQL
schema = graphene.Schema(query=Query)
