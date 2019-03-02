This weeks meditation was to explore oracle decks. While I'm not entirely sure about what it means to invent an oracle deck, I thought it would be interesting to experiment about what it means for a computer to be a "reader" or a "querent". 

The acts of fortune telling and tarot are very human activities. It is a novelty for people to try to divine meaning from objects. I wanted to turn it on its head and have computers try to use the human practice of tarot to better understand humans with a program asking another program for a tarot reading about twitter posts.

<img src="https://sandbox.markofthelam.com/img/tarot-model.png" style="width:400px">

This semester I'm taking connected devices and I learned how to implement RESTful APIs. I wanted to use this project to practice my api structures and learn a little more about web development in general.

For the assignment I wrote two programs to represent the "reader" and the "querent". 

 Reader: The reader is restful api server. I used the provided [tarot json file](https://github.com/dariusk/corpora/blob/master/data/divination/ "link to github") for the readings. My reader program randomly selects three tarot cards for a Basic Three Card Spread which represents the Past, Present, and Future. 

'''

function ranNum(ln){
    return Math.floor(Math.random() * ln);
}

module.exports.drawCard = function drawCard(){
    let _card = tarot.tarot_interpretations[ranNum(78)];
    let _los = ['light', 'shadow'];
    let los = _los[ranNum(2)];

    let card = {
        "name": `${_card.name}`,
        "description": `${_card.fortune_telling[ranNum(_card.fortune_telling.length)]}`,
        "meaning": `${_card.meanings[los][ranNum(_card.meanings[los].length)]}`
    }
    return card;
}
'''
<img src="https://sandbox.markofthelam.com/img/tarotendpoint.png" style="width:400px">

Querent: The querent I created is a twitter bot. I thought it would be fitting for a computer to try to meditate on what humans are saying. (Although it seems most twitter users are actually bots). Essentially the querent program scrapes trending tweets and uses the first returned tweet to make an HTTP request to my rest server which responds with three tarot cards providing their Names, Descriptions, and Meanings.

The programs can be automated so that the readings can continue without any human action. In the current state my endpoints look pretty bare, and looks most interesting when running in the command prompt so that you can see the client request and server responses.

<img src="https://sandbox.markofthelam.com/img/tarot-cmd.png" style="width:800px">

Overall I was pretty pleased with the assignment. I felt a lot more comfortable creating apis and I really liked the assignment and coming up with a model for how computers could perform tarot with one another. I would like to think of a more aesthetic interface though.


server:
'''
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

'''


