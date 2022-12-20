db.createUser(
  {
      user: "root",
      pwd: "example",
      roles:[
          {
              role: "readWrite",
              db:   "film_fest"
          }
      ]
  }
);

let error = false

let dates = []
let locations = []
let films = []
let filminstances = []
  

function locationCreate(name, street1, street2, suburb, state, postcode, latitude, longitude) {
    locationdetail = {name, street1, street2, suburb, state, postcode, latitude, longitude};
    
    locations.push(locationdetail)
    res.push(db.locations.insert(locationdetail))
}

function dateCreate(date) {
  datedetail = {date: date};
  dates.push(datedetail)
  res.push(db.dates.insert(datedetail))
}


function filmCreate(title, blurb, releaseDate, imdbId, imdbRating, imdbVotes, poster, imdbLink) {
    filmdetail = { 
      
      title: title,
        blurb:blurb,
      releaseDate:date, 
      imdbId:imdbId, 
      imdbRating:imdbRating, 
      imdbVotes:imdbVotes, 
      poster:poster, 
      imdbLink:imdbLink
    }
      
    films.push(filmdetail);
    res.push(db.films.insert(filmdetail))
}

function filmInstanceCreate(film, status, location, date) {
  filminstancedetail = { 
    film: film,
    status: status,
    location: location,
    date: date
  }    
  
  if (status != false) filminstancedetail.status = status
    filminstances.push(filminstancedetail);
    res.push(db.filminstances.insert(filminstancedetail))
}

  

let res = [
  db.films.drop(),
  db.locations.drop(),
  db.filminstances.drop(),
  db.dates.drop(),
  
  db.films.createIndex({ title: 1 },{ unique: true }),
  db.films.createIndex({ blurb: 1 }),
  db.films.createIndex({ releaseDate: 1 }),
  db.films.createIndex({ imdbID: 1 }),
  db.films.createIndex({ imdbRating: 1 }),
  db.films.createIndex({ imdbVotes: 1 }),  
  db.films.createIndex({ poster: 1 }),
  db.films.createIndex({ imdbLink: 1 }),
  
  db.locations.createIndex({name:1},{name:"name"}),
  db.locations.createIndex({street1:1},{name:"street1"}),
  db.locations.createIndex({street2:1},{name:"street2"}),
  db.locations.createIndex({suburb:1},{name:"suburb"}),
  db.locations.createIndex({state:1},{name:"state"}),
  db.locations.createIndex({postcode:1},{name:"postcode"}),
  db.locations.createIndex({latitude:1},{name:"latitude"}),
  db.locations.createIndex({longitude:1},{name:"longitude"}),

  db.filminstances.createIndex({status: 1}),
  db.filminstances.createIndex({location: 1}),
  db.filminstances.createIndex({date: 1}),

  db.dates.createIndex({date: 1}),
]
//format: locationCreate('name', 'street1','street2', 'suburb', 'state', 'postcode', 'latitude', 'longitude');
locationCreate('Incident Theatre', 'Cnr Herring','Waterloo Rd', 'Macquarie', 'NSW', '2113', '-33.7774700000', '151.1181600000');

dateCreate(new Date("12-02-2023"));
dateCreate(new Date("16-02-2023"));
dateCreate(new Date("24-02-2023"));

printjson(res);
res = [];

var mylocationCursor = db.locations.find();
var locationsArray = mylocationCursor.toArray();

var mydateCursor = db.dates.find();
var datesArray = mydateCursor.toArray();

//format: filmCreate('Title', 'blurb', 'releaseDate', 'imdbId', 'imdbRating','imdbVotes', 'poster', 'imdbLink');
//                                    new Date('1920-01-02')
filmCreate('The Godfather', '', '1972','tt0068646', '9.2', '1106047', 'http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_SX300.jpg', 'http://www.imdb.com/title/tt0068646/');

printjson(res);
res = [];

var myfilmCursor = db.films.find();
var filmsArray = myfilmCursor.toArray();

//format: filmInstanceCreate(filmsArray[0]._id, 'status, location, date');
filmInstanceCreate(filmsArray[0]._id, 'Available','Incident Theatre', new Date('12-02-2023'));
filmInstanceCreate(filmsArray[0]._id, 'Sold Out', 'Incident Theatre', new Date('16-02-2023'));

printjson(res)

if (error) {
  print('Error, exiting')
  quit(1)
}

