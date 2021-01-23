// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax. 
//Tells us how many question marks we need in our query
function printQuestionMarks(num) {  
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}


// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) { 
  var arr = [];

  // loops through the object keys and push the key/value as a string int arr
  for (var key in ob) { 
    var value = ob[key];
    // check to skip the prototype properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // adds the = to key=value 
      arr.push(key + "=" + value);  // !! push the key and value into the array
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;  //this does the SQL query

    queryString += " (";
    queryString += cols.toString(); //when we call toString on an array, we get a comma-separated list of items
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals); //!! the objColVals turns this into name=whopper,devour=true for our query
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;