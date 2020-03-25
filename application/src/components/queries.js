import {gql} from 'apollo-boost'

export const moviesQuery = gql`
    query moviesQuery($name:String){
        movies(name:$name){
            id
            name
            genre
            rate
            watched
            directorId{
                id
                name
            }
        }
    }    
`;

export const  directorsQuery = gql`
    query directorsQuery($name: String){
        directors(name: $name){
            id
            name
            age
            movies{
                name
                id
            }
        }
    }    
    
`;

export const addDirectorMutation = gql`
    mutation addDirector($name: String!, $age: Int!){
        addDirector(name: $name, age: $age){
            id
            name
        }
    }
`;
export const updateDirectorMutation = gql`
    mutation updateDirector($id: ID, $name: String!, $age: Int!){
        updateDirector(id: $id, name: $name, age: $age){
            id
            name
        }
    }
`;

export const addMovieMutation = gql`
    mutation addMovie($name: String!,$genre: String!, $rate: Int, $watched: Boolean!, $directorId: ID){
        addMovie(name: $name, genre: $genre, rate: $rate, watched: $watched, directorId: $directorId){
            id
            name
        }
    }
`;
export const updateMovieMutation = gql`
    mutation updateMovie($id:ID, $name: String!,$genre: String!, $rate: Int, $watched: Boolean!, $directorId: ID){
        updateMovie(id: $id, name: $name, genre: $genre, rate: $rate, watched: $watched, directorId: $directorId){
            id
            name
        }
    }
`;
export const delMovieMutation = gql`
    mutation delMovie($id:ID){
        delMovie(id: $id){
            id
        }
    }
`;
export const delDirectorMutation = gql`
    mutation delDirector($id:ID){
        delDirector(id: $id){
            id
        }
    }
`;

export const  shortDirectorsQuery = gql`
    query directorsQuery($name: String){
        directors(name: $name){
            id
            name
        }
    }    
    
`;
