export class HttpService {
    _handleErrors(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url : string) {
        return fetch(url)
            .then(res => this._handleErrors(res));
    }

    getJSON(url) {
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }
    post(url, data, options) {
        let optionsPost = {
            method: 'POST',
            body: data
        };

        if (options) {
            optionsPost = Object.assign(optionsPost, options);
        }

        return fetch(url, optionsPost)
            .then(res => this._handleErrors(res))
    }
    postJSON(url, data, options) {
        return this.post(url, data, options)
            .then(res => {
                debugger;
                return res.json()
            });
    }
}

//window.HttpService = HttpService;