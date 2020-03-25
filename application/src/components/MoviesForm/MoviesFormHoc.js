import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {moviesQuery, addMovieMutation, shortDirectorsQuery, updateMovieMutation} from "../queries"


import { styles } from './styles';
import {graphql} from "react-apollo";


const withGraphQL = compose(graphql(updateMovieMutation, {
    props: ({mutate})=> ({
        updateMovie: movie => mutate({
            variables: movie,
            refetchQueries: [{
                query: moviesQuery,
                variables: {name: ''}
            }]
        })
    })
}), graphql(addMovieMutation, {
        props: ({mutate})=> ({
            addMovie: movie => mutate({
                variables: movie,
                refetchQueries: [{
                    query: moviesQuery,
                    variables: {name: ''}
                }]
            })
        })
    }),
    graphql(shortDirectorsQuery, {
        options: ({name=''})=> ({
            variables: {name}
        })
    })

)
export default compose(withStyles(styles), withGraphQL);
