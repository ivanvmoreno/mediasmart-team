require('dotenv').config();
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const Profile = require('./models/profile');
    
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
    try {
        await app.prepare();
        const server = express();

        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, { useNewUrlParser: true, promiseLibrary: Promise })
        .catch(e => console.log('Error during database connection', e));
        
        server.get('/profiles', async (req, res) => {
            let { pageNumber, pageSize, name } = req.query;
            pageNumber = pageNumber ? parseInt(pageNumber) : 1;
            pageSize = pageSize ? parseInt(pageSize) : 0;
            const skip = (pageNumber - 1) * pageSize;
            const query = name ? { name: { $regex: name, $options: 'i' } } : {};
            const totalProfiles = await Profile.countDocuments(query);
            const responseData = await Profile.find(query, null, { skip, limit: pageSize }, (error, documents) => documents);
            let formattedProfiles = {};
            responseData.forEach(profile => formattedProfiles[profile.id] = profile);
            res.json({ profiles: formattedProfiles, totalProfiles });
        });

        server.get('/profiles/:id', async (req, res) => {
            const { id } = req.params;
            const responseData = await Profile.find({ id }, (error, documents) => documents);
            res.json(responseData);
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });
        
        server.listen(3000);
    } catch(error) {
        console.log('Unexpected error', error);
        process.exit(1);
    }
})();