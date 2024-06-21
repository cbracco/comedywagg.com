const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
    try {
        let url = `https://www.eventbriteapi.com/v3/organizations/2048015915213/events/?token=${process.env.EVENTBRITE_API_KEY}&expand=venue`;

        let json = EleventyFetch(url, {
            duration: '1d',
            type: 'json',
            verbose: true,
        });

        return json;
    } catch (error) {
        return error;
    }
};
