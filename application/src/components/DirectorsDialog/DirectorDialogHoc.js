import {graphql} from "react-apollo";
import {delDirectorMutation, directorsQuery} from "../queries";
import {compose} from "recompose";

const withGraphQLDelete = graphql(delDirectorMutation, {
    props: ({mutate})=> ({
        delDirector: id => mutate({
            variables: id,
            refetchQueries: [{
                query: directorsQuery,
                variables: {name: ''}
            }]
        })
    })
});

export default compose(withGraphQLDelete)