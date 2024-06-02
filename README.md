# review-in

A really simple web app for movie reviews
<br> _This web app is part of my challenge submission for a bootcamp I'm currently enrolling in_
<br>

## App Features

1. Using Responsive Web Design
2. REST API
3. Initial Page:
   - Search bar for movies
   - API Documentation button (upper-left corner)
4. Movies Page
   - Movies card catalogue
     <br>_it'll show `"NO RESULTS FOUND..."` instead of an empty page when the movie can't be found_
5. Reviews Page
   - Movie details
   - Reviews (CREATE review, READ reviews, , UPDATE review rating, DELETE review)
     <br>_if there's no review, the review list will show `"No Reviews Yet!"`_
   - Redirect to 404 Not Found Page if the movieId can't be found
6. API Documentation Page
   - Detailed Explanation of each available API on this web app
     <br>_i've also provided the [postman_collection.json](https://github.com/imfauzan14/24001157-44-IMF-REVIEWIN-GOLD/blob/main/docs/postman_collection.json) and [postman documenter](https://documenter.getpostman.com/view/23290974/2sA3Qwbpeb) so you can import it to your [Postman](https://www.postman.com/)_

_Shoutout to [aubm](https://github.com/aubm) and any of the contributors for creating [postmanerator](https://github.com/aubm/postmanerator)! , it saved me big time to generate HTML for my Postman API Documentation Page_

## How to start the app

_NOTICE: THIS APP REQUIRES AN ACTIVE INTERNET CONNECTION_

1. Install [Node.js](https://nodejs.org/en/download), [PostgreSQL](https://www.postgresql.org/download), and [git](https://www.git-scm.com/downloads) _(optional, you can also download this repo then extract it manually instead of cloning it in step 2)_
   - for `PostgreSQL`, you must remember your configuration before proceeding to the next step since it will be used in the step 5
2. Open a terminal then run `git clone https://github.com/imfauzan14/24001157-44-IMF-REVIEWIN-GOLD`
3. Run `cd 24001157-44-IMF-REVIEWIN-GOLD`
4. Run `npm i`
5. Open the `.env` file using any text editor app and customize it based on your preference
   - for the `DB_AUTO_SETUP` , you can set it to `false` if you don't want the app to generate the database automatically by using its latest migration, this means that you need to setup the database table manually by following the format written in `./database/migrations/20240526051242_create_empty_tables.js`
   - for the `MOVIEDB_ACCESS_TOKEN`, you can get it from [themoviedb](https://www.themoviedb.org/settings/api)
     <br> _for bootcamp facilitator, the source code in form of a .zip file i've submitted through the bootcamp web should've the MOVIEDB_ACCESS_TOKEN included in it already, although i've also sent you my `MOVIEDB_ACCESS_TOKEN` through whatsapp DM so you may use that too_
6. Run `npm start` or `npm run dev` for development mode using [nodemon](https://nodemon.io)
7. The web app address should be appeared on your terminal log, you can open it by using a browser
