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

Interesting Article on the Economics Behind GiftCards:
    -https://thehustle.co/what-happens-to-unused-gift-cards/

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
    -Online Code Table: "/dashboard/"
        -Displays all of the codes currently active
        -Also displays some extra information

9/7/2020 
    -Stopped at input form
    -Stopped at the input styling section 1:38:18 file is views/giftcard/index.hbs




Things to Implement:
    -Editing method, adding/subtracting values from giftcard
    -giftID Lookup input, lookup the exact giftcard and edit values
            -Further Steps:
                Use mongoose find by iD option
                also need to create an additional hamburger bar option to search up the gift card code 
                once you type in the code you could just jump over or something
            -Possible Resource:
                https://masteringjs.io/tutorials/mongoose/find-by-id#:~:text=In%20Mongoose%2C%20the%20Model.,if%20no%20document%20was%20found.
    -generateRandomCode, generate a random giftcard code, and 
        look through the database to make sure the id is unique
        or just use a middleware to give it a unique id
            -Possible resource: 
                https://kb.objectrocket.com/mongo-db/unique-check-in-mongodb-687
                https://masteringjs.io/tutorials/mongoose/unique
                So mongoose has it's own unique key word, it'll return an error
                if the giftCardID is not unique. lol you could just keep on 
                entering random values until a unique value comes up
    -delete giftcard once it's been all used up once a value
        goes to zero, you would either have the option to delete or
        refund the gift card code.

-Okay so Mongo is wierd when it comes to floating point numbers
    -So i'm thinking that one possible solution is to just treat all dollars as 
    -an integer then afterwards append the decimal point sign 2 places afterwards
    -I would need to test if there are any edge cases as well
    -so 9.00 would just be 900
    -10.00 would just be 1000
    -1.00 would just be 100
    -I would also need to have the input edit on the fly potentially.
    -user enters $14.50
        -I remove it to just store 1450
    -User enters $100
        -I edit it so that it is just 100.00