import { compose, withState, withHandlers, lifecycle } from 'recompose';

import RandomDog from './RandomDog';

const enhance = compose(
    withState('apiResponse', 'setApiResponse', {
        response: "",
        loading: false
    }),
    withState('dogUrl', 'setDogUrl', ''),
    withState('isLoadingDog', 'setIsLoadingDog', false),

    withHandlers({
        onGetRandomDog: ({ setDogUrl, setIsLoadingDog, setApiResponse, apiResponse }) => async () => {
            try {
                setIsLoadingDog(true)
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const responseJSON = await response.json();
                const message = responseJSON.message;
                setDogUrl(message);
                setIsLoadingDog(false);
            } catch(error) {
                setIsLoadingDog(false)
                console.log('error', error);
            }
        }
    }),

    lifecycle({
        componentDidMount() {
            this.props.onGetRandomDog();
        }
    })
)
export default enhance(RandomDog)
