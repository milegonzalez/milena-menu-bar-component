const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var promise = mongoose.connect('mongodb://localhost/repoSchema', {
  useMongoClient: true,
});

promise.once('open', function () {
  console.log('hey, its open!')
});

let repoSchema = mongoose.Schema({
  username: String,
  repoName: String,
  repos: [String],

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, err) => {
  var newUser = new Repo({
    'username': data.username,
    'repos': data.repos
  })

  newUser.save((err) => {
    if (err) console.log('err');
  });
};


let find = (username, err) => {
  Repo.findOne({ "username": username }, function (err, docs) {
    if (err) {
      console.log('error');
    }
    console.log('these are docs', docs.repos);
  })
// let find = (data, err) => {
//   console.log('this is data from database', data)
//   let info = Repo.findOne({ "username": data })
//   if(err) {
//     console.log('error')
//   }
// console.log('this is info', info.schema.obj.repos)
// console.log('this is info', info)
// return info;
};


module.exports.save = save;
module.exports.find = find;