export default class HttpClient {
    constructor(url, apiKey) {
        this.url = url;
        this.apiKey = apiKey;
    }

    async get(endpoint) {
        const response = await fetch(`${this.url}/${endpoint}&api_key=${this.apiKey}`);
        const data = await response.json();
        return data;
    }
}