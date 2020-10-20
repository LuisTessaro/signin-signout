# Signin Singup

## running the project

#### Required Env vars: 


- MONGO_URI= MongoDb of you choosing

- SECRET= JWT sign secret

#### Optional vars:

- PORT= Any available port (can be ommited and server will run on either startup arg or 3000 fallback)
---

### install and run:

- Clone repo

install
- yarn

run
- yarn dev (npx's nodemon)
- yarn start (simply runs app with node)

---

## Docs

### Creating user

- POST: /api/user/

Expected request Body:

```
{
    "name": String,
    "email": String - Valid email,
    "password": String,
    "telephones": Object Array - [{ number: String, ddd: String }] 
}
```

Response:

```
{
    "message": "User criado",
    "data": {
        "telephones": Object Array,
        "creation_date": Date,
        "last_login": Date,
        "last_edit": Date,
        "_id": MongodbID,
        "name": String,
        "email": String,
        "password": String - hash,
        "token": String",
        "__v": 0
    }
}
```

### Authing

- POST: /api/auth/

Expected request Body:

```
{
   "email": String,
   "password": String
}
```

Response:

```
{
    "message": "Autenticado com sucesso",
    "data": {
        "telephones": Object Array,
        "creation_date": Date,
        "last_login": Date,
        "last_edit": Date,
        "_id": MongodbID,
        "name": String,
        "email": String,
        "password": String - hash,
        "token": String",
        "__v": 0
    }
}
```

### Searching

- Get: /api/user/:id (where id is a valid mongodbID)

Expected request Header:

```
Authorization Bearer (String JWT token)
```

Response:

```
{
    "message": "User Found",
    "data": {
        "telephones": Object Array,
        "creation_date": Date,
        "last_login": Date,
        "last_edit": Date,
        "_id": MongodbID,
        "name": String,
        "email": String,
        "password": String - hash,
        "token": String",
        "__v": 0
    }
}
```