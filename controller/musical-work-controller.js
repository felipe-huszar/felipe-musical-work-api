const express = require('express');
const router = express.Router();
const musicalWorkService = require('../domain/service/musical-work');
const utils = require('../utils');

router.get('/', async (req, res) => {
    try {
        const foundWorks = await musicalWorkService.GetAll(req.params.title);
        
        if(!foundWorks) {            
            console.log('No musical works found for given query');            
        }
        
        res.status(200);
        res.send(foundWorks);        
    } catch(error) {                
        res.status(500);
        res.send(utils.buildErrorMessage('Error fetching musical works', error));
    }       
});

router.get('/:id', async (req, res) => {
    try {
        const foundMusicalWork = await musicalWorkService.GetById(req.params.id);

        if(!foundMusicalWork) {
            res.status(422);
            res.send(utils.buildErrorMessage('No musical work found for that Id'));
        }

        res.status(200);
        res.send(foundMusicalWork);
    } catch(error) {                
        res.status(500);
        res.send(utils.buildErrorMessage('Error fetching musical works', error));
    }       
});


router.post('/', async (req, res) => {
    try {        
        const musicalWork = await musicalWorkService.Create(req.body);
        res.status(201);
        res.send(musicalWork);
    } catch (error) {        
        res.status(500);
        res.send(utils.buildErrorMessage('Error creating musical work', error));
    }
});

router.patch('/:id', async (req, res) => {
    try {        
        const musicalWork = await musicalWorkService.Update(req.params.id, req.body);
        res.status(200);
        res.send(musicalWork);
    } catch (error) {        
        res.status(500);
        res.send(utils.buildErrorMessage('Error updating musical work', error));
    }
});

router.delete('/:id', async (req, res) => {
    try {        
        await musicalWorkService.Delete(req.params.id);
        res.status(200);
        res.send();
    } catch (error) {        
        res.status(500);
        res.send(utils.buildErrorMessage('Error updating musical work', error));
    }
});

module.exports = router;