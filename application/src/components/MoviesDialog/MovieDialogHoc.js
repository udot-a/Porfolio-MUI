import {graphql} from "react-apollo";
import {delMovieMutation, moviesQuery} from "../queries";
import {compose} from "recompose";

const withGraphQLDelete = graphql(delMovieMutation, {
    props: ({mutate})=> ({
        delMovie: id => mutate({
            variables: id,
            refetchQueries: [{
                query: moviesQuery,
                variables: {name: ''}
            }]
        })
    })
});

export default compose(withGraphQLDelete)