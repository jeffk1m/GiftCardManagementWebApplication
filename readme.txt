Dependencies:
    -Express.js
    -Mongoose.js

Set Up Project:
    -Install all packages required
    -Set up .gitignore
    -Include all applications required
    -Plan the routes

Setting up Routes:
    -login page route
    -dashboard route

Setting up Basic Frontend:


Routes:
    -Login Page: "/"
        -Essentially the landing page where you sing in via google+
    -Menu Page: "/dashboard"
        -A page where you can access several different functions
        -Lookup Code Button:
            -Takes you to the "Codes" specific page where you can do stuff to the Code
        -Display Database Button:
            -Displays all the codes and associated values
    -Lookup Code Page: "/codes/{codeid}"
        -If it's a valid code you get the specific code information with some functionality
            -Functionality includes, subtract amount, add amount
            -Once a code reaches zero delete it from the database
        -If it's not a valid code you get an error message
    -Online Code Table: "/codes/"
        -Displays all of the codes currently active
        -Also displays some extra information
        