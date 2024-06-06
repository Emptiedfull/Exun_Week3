
const { MongoClient, ServerApiVersion } = require('mongodb');
const password = require('./config.json').password;
const uri = `mongodb+srv://atharv:${password}@cluster0.jeozu7q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"`
const {ObjectId} = require('mongodb')

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function initialize(){
    try {
        await client.connect();
        console.log('Connected to database');
        return client
    } catch (e) {
        console.error(e);
    }
}

async function createArticle(body,collection){
    if(!body.article || !body.name) return 'Invalid data'


    try{
        const data ={
            article:body.article,
            name:body.name,
            posted_at: new Date(),
            last_updated: new Date()
        }    
        await collection.insertOne(data)
        return 'Article added'      
    }catch(e){
        console.log(e)
    }
}

async function getArticles(collection){
    try{
        const articles = await collection.find().toArray();
        return articles
    }catch(e){
        console.log(e)
    }
}

async function findArticleById(id,collection){
    try{
        console.log(id)
        const article = await collection.findOne({_id: new ObjectId(id)});
        console.log(article)
        return article
    }catch(e){
        console.log(e)
    }   
}

async function updateArticle(id,body,collection){
    try{
        const data ={
            article:body,
            last_updated: new Date()
        }
        result = await collection.updateOne({_id: new ObjectId(id)},{$set:data})
        return result
    }catch(e){
        console.log(e)
    }
}

async function deleteArticle(id,collection){
    try{
        result = await collection.deleteOne({_id: new ObjectId(id)})
        
        if (result.deletedCount===0) return 'Article not found'
        if (result.deletedCount===1) return 'Article deleted'

    }catch(e){
        console.log(e)
    }
}





module.exports = {initialize,createArticle,getArticles,findArticleById,updateArticle,deleteArticle}
