const express = require('express');
const app = express();
const {initialize,createExpense,getExpenses,findExpenseById,updateExpense,deleteExpense} = require('./db.js');

port = process.env.PORT || 3000;

(async()=>{
    
    const client = await initialize();
    const database = client.db('Exun_elite');
    const collection = database.collection('Expenses');


    app.use(express.json());

    app.get('/expenses',async(req,res)=>{
        const expenses = await getExpenses(collection);
        res.send(expenses);
    })

    app.post('/expenses/create',async(req,res)=>{
        const result = await createExpense(req.body,collection);
        res.send(result);
    })

    app.get('/expenses/:id',async(req,res)=>{
        const expense = await findExpenseById(req.params.id,collection);
        res.send(expense);
    })

    app.put('/expenses/:id',async(req,res)=>{
        const result = await updateExpense(req.params.id,req.body,collection);
        res.send(result);
    })

    app.delete('/expenses/:id',async(req,res)=>{
        const result = await deleteExpense(req.params.id,collection);
        res.send(result);
    })
    
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
})()
