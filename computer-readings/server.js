const express = require('express');
const server = express();
const port = 8000;
const tarot = require('./tarot_interpretations.json');
const card = require('./reader');

server.set('view engine', 'pug');

server.get('/', (req, res)=>{
    //res.send('Server is up');
    res.render('index', { title: 'Computers reading eachother tarot', pTitle: 'Welcome', message: 'Sup' });
});

server.get('/tarot', (req, res)=>{
    //res.send('Server is up');
    let past = card.drawCard();
    let present = card.drawCard();
    let future = card.drawCard();
    
    let pastName = past.name;
    console.log(pastName);
    //res.render('reading', { title: 'I\'ve consulted the bits. Here is what I found', pastTitle: ${past.name}, pastDescription: ${past.description}, pastMeaning: ${past.meaning}})
    res.render('reading',{
        pastName: past.name,
        pastDescription: past.description,
        pastMeaning: past.meaning,
        presentName: present.name,
        presentDescription: present.description,
        presentMeaning: present.meaning,
        futureName: future.name,
        futureDescription: future.description,
        futureMeaning: future.meaning
    })

});

server.listen(port, ()=>(console.log(`Server is up on port ${port}`)));

//console.log(card.drawCard());
