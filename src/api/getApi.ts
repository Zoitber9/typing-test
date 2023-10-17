import axios from 'axios';

async function getText(sentences: string) {
    return await axios.get<string>('https://baconipsum.com/api/', {
        params: {
            type: 'all-meat',
            sentences,
            format: 'text'
        }
    });
}

export default getText;
