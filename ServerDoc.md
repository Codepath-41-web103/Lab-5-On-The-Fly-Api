# Server Documentation

Hello Mike 🫡, this is a quick documentation of the APIs in the backend. Please review the ERD before reading this.

We only have two tables, users, and chats. Since the Message Table will be in a real-time database, it would not be included in the backend API, but it will remain in the ERD for reference and points : ) .

## Users API

- API Base URL: `localhost:3001/api/users`

1. This API endpoint will be useful for users to search for other users by their email.

   - **GET** `/search/:email`

2. This API endpoint get all the users in the database.

   - **GET** `/`

3. This API endpoint gets user information based on their ID.

   - **GET** `/:id`

4. This API endpoint creates the user in our database. Make sure you include these parameters, also Keep in mind that the `id` should be the `localID` provided by Firebase Auth.

   - **POST** `/`

     Request Body:

     ```json
     {
       "name",
       "email",
       "avatar_url",
       "bio",
       "id"
     }
     ```

5. This API endpoint edits the user's information based on their ID. Users cannot edit their email or ID.

   - **PATCH** `/:id`

     Request Body:

     ```json
     {
       "name",
       "avatar_url",
       "bio"
     }
     ```

6. This API endpoint deletes the user by ID.

   - **DELETE** `/:id`

## Chats API

- API Base URL: `localhost:3001/api/chats`

1. This API endpoint gets all the chats by the user ID.

   - **GET** `/user/:id`

2. This API endpoint creates a chat with two users (if the chat with two users already exists, then it will ignore the request). To create the `chat_id` ideally combine both sender and recipient `id`s together and sort them. This will create a unique ID that can only be replicated if both IDs are correct, essentially making a two-part key. for example sender_id = `1sawd` recipient_id = `aaaa` chat_id = `1aaaaadws`

   - **POST** `/`

     Request Body:

     ```json
     {
       "sender_id",
       "recipient_id",
       "chat_id"
     }
     ```

3. This API endpoint gets the chat by ID.

   - **GET** `/:id`

Hope you enjoy the documentation! If you have questions or problems with the endpoints, simply email me @..... just slack me 🙄
