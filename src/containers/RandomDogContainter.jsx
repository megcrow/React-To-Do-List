import { compose, withState, withHandlers, lifecycle } from 'recompose';
import Api from '@bowtie/api';

import RandomDog from '../components/RandomDog/RandomDog';

const api = new Api({
    root: 'https://dog.ceo',
    stage: 'api',
    prefix: 'breeds',
    version: 'image',
    verbose: true,
    defaultOptions: {
        headers: () => ({})
    }
})

api.on('success', (resp) => {
    console.log('GOOD RESP!')
})

api.on('200', (resp) => {
    console.log('200 -- GOOD RESP!')
})

api.on('error', (resp) => {
    console.log('BAD RESP!')
})

api.use(async (response) => {
    try {
        const data = await response.json()
        response['data'] = data
    } catch (e) {
        console.error(e)
    }

    return Promise.resolve(response)
})

api.use(async (response) => {
    try {
        const data2 = { hi: 'there' }
        response['data2'] = data2
    } catch (e) {
        console.error(e)
    }

    return Promise.resolve(response)
})

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
                const response = await api.get('random');
                // const responseJSON = await response.json();
                // const message = responseJSON.message;
                console.log(response.data)
                setDogUrl(response.data.message);
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
