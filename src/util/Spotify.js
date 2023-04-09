let userAccessToken = '';
const clientID = '';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        if (!userAccessToken && userAccessToken !== '') {
            return userAccessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            userAccessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return userAccessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

            // return this.getAccessToken();
        }
    },
    search(term) {
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${this.getAccessToken()}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            } else {
                return [];
            }
        });
    }
}

export default Spotify;