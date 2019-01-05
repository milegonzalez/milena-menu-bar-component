const faker = require('faker');

let userDataGenerator = function () {
  let allDataArray = [];
  for (let i = 0; i < 1; i++) {
    allDataArray.push(faker.fake("{{internet.userName}}, {{image.avatar}}, {{image.image}}, {{commerce.department}}, {{random.number}}, {{random.number}}"));
  }
  return allDataArray;
}

console.log(userDataGenerator());

let followersGenerator = function (countOfFollowers) {
  countOfFollowers = countOfFollowers || 100;
  let allFollowersArray = [];
  for (let i = 0; i < countOfFollowers; i++) {
    allFollowersArray.push(faker.fake(["{{internet.userName}}, {{image.avatar}}, {{image.image}}"]));
  }
  return allFollowersArray;
}


const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'milenita1809!',
  database: 'users'
});

connection.connect(function(err) {
  if(err) {
    return console.error('error ' + err.message);
  }

  console.log('Connected to the MySQL server. ');

  let sql = 'Insert into users (display_name, logo, profile_image_url,  category, followers, following) values ?';
  let values = userDataGenerator();

  connection.query(sql, [values], function(err, result) {
    // console.log('this is the sql' + sql, 'this is the values' + values);
    if (err) {
      console.log('error inserting values');
    }
    console.log('Records inserted');
  });
});


// connect to the database and seed the database.



