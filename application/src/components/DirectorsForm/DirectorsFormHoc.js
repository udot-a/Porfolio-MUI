import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {graphql} from "react-apollo";
import {addDirectorMutation, moviesQuery, updateDirectorMutation} from "../queries"
import {directorsQuery} from "../queries";

import { styles } from './styles';

// const withGraphQLAdd = graphql(addDirectorMutation, {
//     props: ({mutate})=> ({
//         addDirector: director => mutate({
//             variables: director,
//             refetchQueries: [{query: directorsQuery}]
//         })
//     })
// });
const withGraphQL = compose(graphql(updateDirectorMutation, {
    props: ({mutate})=> ({
        updateDirector: director => mutate({
            variables: director,
            refetchQueries: [{
                query: directorsQuery,
                variables: {name: ''}
            }]
        })
    })
}),
    graphql(addDirectorMutation, {
        props: ({mutate})=> ({
            addDirector: director => mutate({
                variables: director,
                refetchQueries: [{
                    query: directorsQuery,
                    variables: {name: ''}
                }]
            })
        })
    })
);
export default compose(withStyles(styles), withGraphQL);
