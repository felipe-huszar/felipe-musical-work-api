const repository = require('../../infrastructure/repository/mongo-repository')
const MusicalWork = require('../model/musical-work');
const Author = require('../model/author');

exports.GetAll = async (title) => {
    let searchOptions = {};
    if(title) {
        searchOptions.title = new RegExp(title, 'i');
    }
    
    const foundWorks = await MusicalWork.find(searchOptions);
    return foundWorks;
}

exports.Create = async (musicalWorkData) => {
        
    let titleSearch = {};
    titleSearch.title = new RegExp(`\\b${musicalWorkData.title}\\b`, 'i');
    
    const foundMusicalWorks = await MusicalWork.findOne(titleSearch);
    if(foundMusicalWorks) {
        throw new Error('A musical work already exists with the given title');
    }
    
    const musicalWork = new MusicalWork({
        title: musicalWorkData.title,
        type: musicalWorkData.type,
        author: new Author ({
            name: musicalWorkData.author.name,
        }),
    });
    
    await musicalWork.save();
    
    return musicalWork;
};

exports.Update = async (id, musicalWorkData) => {                
    const foundMusicalWork = await MusicalWork.findById(id);
    if(!foundMusicalWork) {
        throw new Error('Could not find musical work to update with this Id');
    } 
    
    await foundMusicalWork.updateOne({
        $set: {
           title: musicalWorkData.title,
           type: musicalWorkData.type,
           author: new Author({
                name: musicalWorkData.author.name
           })
        }
    });

    const updatedWork = await MusicalWork.findById(id);
    
    return updatedWork;
};

exports.GetById = async (id) => {            
    return MusicalWork.findById(id);    
};

exports.Delete = async (id) => {            
    const foundMusicalWork = await MusicalWork.findById(id);
    if(!foundMusicalWork) {
        throw new Error('Could not find musical work to delete with this Id');
    } 
    
    await Author.deleteOne(foundMusicalWork.author._id);
    await MusicalWork.deleteOne(foundMusicalWork._id);    
};