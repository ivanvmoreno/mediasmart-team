require('dotenv').config();
const mongoose = require('mongoose');
const fetch = require('isomorphic-unfetch');
const Profile = require('./models/profile');

/**
 * This method fetches and populates unexisting profiles to the database
 */
(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, { useNewUrlParser: true, promiseLibrary: Promise })
        .catch(e => console.log('Error during database connection', e));
        let pageNumber = 1;
        // This constant (pageSize) controls the number of profiles fetched per request
        const pageSize = 100;
        const profilesArray = [];
        let allEntriesFetched = false;
        while(!allEntriesFetched) {
            const responseData = await fetch(`http://work.mediasmart.io/?page=${pageNumber}&page_size=${pageSize}`, { headers: { 'Authorization': process.env.API_AUTH_HEADER } })
            .then(res => res.json())
            .catch(e => console.log('Error during profiles fetching', e));
            responseData.forEach(profile => {
                const { age, id, name, bio, image } = profile;
                profilesArray.push(new Profile({ age, id, name, bio, image }));
            })
            console.log(`Fetched page ${pageNumber} (${profilesArray.length} profiles downloaded)`);
            allEntriesFetched = responseData.length < pageSize;
            pageNumber++;
        }
        console.log(`All entries fetched! Total profiles: ${profilesArray.length}`);
        console.log(`Starting database data intake (this may take a while...)`);
        await Profile.bulkWrite(profilesArray.map(profile => {
            const { id, age, name, image, bio } = profile;
            return {
                updateOne: {
                    filter: { id },
                    update: { $set: { id, age, name, image, bio } },
                    upsert: true
                }
            }
        }))
        .catch(e => e => console.log('Error during database documents ingestion', e));
        console.log('All documents saved to the database!');
        process.exit(0);
    } catch(error) {
        console.log('Unexpected error', error);
        process.exit(1);
    }
})();