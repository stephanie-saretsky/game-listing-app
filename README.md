# GameListings  

## How to start 

- The project node version is specified at 14.18.0 and React is ^17.0.2
- npm i

Locally:
<br>
- Open two terminals. In the first, run `npm start`. You will see a log that the db is initialized and the server is 
listening on port 3300.
- In the second terminal, run `npm start`.

Docker:
<br>
 - docker-compose up --build

This is a container for the dev server. If time allowed I would have put it behind a proxy. 

## Stack
This project is built with Node, React, Typescript, and Tailwind CSS.

## Process

Database:
<br>
I decided to use MongoDB for the `games` database as it has simple and clear query syntax (in comparison to a db like MySQL) 
and it is good for scaling. I stored the test json provided in a `collection` called listings. This will allow for future 
`collections` to be added to the `games` database as the hypothetical app takes on new features, like a `users` collection 
for a `sign up/login` form for example.   

API:
<br>
For similar reasons, I designed the api so that the router is separate from the server's `api.js`, and the router helpers are separated
from the router file. This allows for code legibility and overall cleanliness, as well as makes adding new endpoints to the api much easier.
Now, if we were to add our new `sign up/login` endpoints, we can easily add a new router with the appropriate helpers. I decided to add
a delete endpoint to showcase how it would work even if I did not have time to make a delete feature on my games list in the frontend.

Frontend:
<br>
I decided to add a main page to the frontend to flesh it out a bit more. I have spent a lot of time working with the library `react-modal`
and really like the added design benefit it lends a regular form on a website. I used the library `formik` as it comes companion libraries like
`yup` for easy form validation. It also lends itself to becoming a common component as the app scales up and adds new forms, as you can pass
the formik `Form` a children prop, allowing for the same Form being used across the site using `formikContext`. For the scope of the challenge I did
not do this.

## Challenges

Form Inputs:
<br>
Designing the form was an interesting challenge as someone who does not know this JSON object extremely well. I made sure to 
type it properly based on the schema given for ease of use, but it wasn't immediately clear which fields should be surfaced to the user,
and which fields should be calculated 'behind the scenes', so to speak. I decided to use this logic for the `images` array,
as I wasn't entirely sure how `type` and `id` were expected to be populated, and it wouldn't really make sense for the user to 
have that knowledge either. I decided to go with giving all images `type: 1` like in the test JSON as I googled for a while to find what 
`Unity Image Type 1` referred to but was unable to find a clear answer. My best guess is that it's an enum that correlates to a type of image file.
On a similar note, I decided to go with a string input for the `image` form field based on the JSON data given. This field could be change to an
uploadFile input if the app was wanting to store the files and then assign the urls based on the server. There were a couple other fields
like `replayJSONURL` that I wasn't sure about but decided to include them as I gave myself idea that the user is a Metacast
employee, who is using it to populate the browser for clients, thereby would have that sort of information on hand and could include it in the form.

I also found a bug with the Field prop in formik that is making the focus highlight buggy. If I do not use the field prop
the highlight works, but then it is not saving the values properly to the formik parent. This is something that I would need more time to debug. 
In my other projects at my current job I built a custom Form Input component that would switch cases based on what type of input was needed, and this 
did not use Formik's field component, so I had not run into this specific issue before. 
