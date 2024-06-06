
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

async function findExpenseById(id,collection){
    try{
        const expense = await collection.findOne({_id: new ObjectId(id)});
        return expense
    }catch(e){
        console.log(e)
    }
}

async function getExpenses(collection){
    try{
        const expenses = await collection.find().toArray();
        return expenses
    }catch(e){
        console.log(e)
    }
}

async function createExpense(body,collection){
    
    if(!body.amount || !body.name) return 'Invalid data'

    try{
        const data ={
            name:body.name,
            amount:body.amount,
            created_at: new Date(),
        }   
        await collection.insertOne(data)
        return 'Expense added'      
    }catch(e){
        console.log(e)
    }
}

async function updateExpense(id,body,collection){
    try{
        const data = {$set:{}}

        if(body.name) data.$set.name = body.name
        if(body.amount) data.$set.amount = body.amount

       
        result = await collection.updateOne({_id: new ObjectId(id)},data)
        console.log(result)
        return 'Expense updated'
    }catch(e){
        console.log(e)
    }
}

async function deleteExpense(id,collection){
    try{
        await collection.deleteOne({_id: new ObjectId(id)})
        return 'Expense deleted'
    }catch(e){
        console.log(e)
    }
}


module.exports = {initialize,createExpense,getExpenses,findExpenseById,updateExpense,deleteExpense}