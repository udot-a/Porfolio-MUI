const graphql = require('graphql');
const Movies = require("../models/movie");
const Directors = require("../models/director");


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean} = graphql;


const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        rate: {type: GraphQLInt},
        watched: {type: new GraphQLNonNull(GraphQLBoolean)},
        directorId: {
            type: DirectorType,
            resolve(parent, args){
                // return directors.find(director => director.id == parent.id)
                return Directors.findById(parent.directorId)
            }
        }
    })
});
const DirectorType = new GraphQLObjectType({
    name: "Director",
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                // return movies.filter(movie => movie.directorId == parent.id)
                return Movies.find({directorId: parent.id})
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
   name: "Mutation",
    fields:{
       addDirector:{
           type: DirectorType,
           args: {
               name: {
                   type: GraphQLNonNull(GraphQLString)
               },
               age: {
                   type: GraphQLNonNull(GraphQLInt)
               }
           },
           resolve(parent, {name, age}){
               const director = new Directors({
                   name,
                   age
               });
               return director.save();
           }
       },
       updateDirector: {
           type: DirectorType,
           args: {
               id: {
                   type: GraphQLID
               },
               name: {
                   type: GraphQLNonNull(GraphQLString)
               },
               age: {
                   type: GraphQLNonNull(GraphQLInt)
               }
           },
           resolve(parent, {id, name, age}) {
               return Directors.findByIdAndUpdate(id, {
                       $set: {
                           name,
                           age
                       }
                   },
                   {new: true}
               );


           }
       },
       updateMovie: {
           type: MovieType,
           args: {
               id: {
                   type: GraphQLID
               },
               name: {
                   type: GraphQLNonNull(GraphQLString)
               },
               genre: {
                   type: GraphQLNonNull(GraphQLString)
               },
               directorId: {
                   type: GraphQLID
               },
               rate: {
                   type: GraphQLInt
               },
               watched: {
                   type: new GraphQLNonNull(GraphQLBoolean)
               }

           },
           resolve(parent, {id, name, genre, directorId, rate, watched}) {
               return Movies.findByIdAndUpdate(id, {
                       $set: {
                           name,
                           genre,
                           directorId,
                           rate,
                           watched
                       }
                   },
                   {new: true}
               );


           }
       },
       delDirector: {
           type: DirectorType,
           args: {id: {type: GraphQLID}},
           resolve(parent, args){
               return Directors.findByIdAndRemove(args.id)
           }
       },
       delMovie: {
           type: MovieType,
           args: {id: {type: GraphQLID}},
           resolve(parent, {id}){
               return Movies.findByIdAndRemove(id)
           }
       },
       addMovie:{
           type: MovieType,
           args: {
               name: {
                   type: GraphQLNonNull(GraphQLString)
               },
               genre: {
                   type: GraphQLNonNull(GraphQLString)
               },
               directorId: {
                   type: GraphQLID
               },
               rate: {
                   type: GraphQLInt
               },
               watched: {
                   type: new GraphQLNonNull(GraphQLBoolean)
               }
           },
           resolve(parent, {name, genre, directorId, rate, watched}){
               const movie = new Movies({
                   name,
                   genre,
                   directorId,
                   rate,
                   watched
               });
               return movie.save();
           }
       }
    }
});

const Query = new GraphQLObjectType({
    name: "Query",
    fields:{
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}){
                return Movies.findById(id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}){
                return Directors.findById(id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            args:{name: {type: GraphQLString}},
            resolve(parent, {name}){
                return Movies.find({name: {$regex: name, $options: "i"}})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            args: {name: {type: GraphQLString}},
            resolve(parent, {name}){
                 return Directors.find({name: {$regex: name, $options: "i"}})
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})