const tarot = require('./tarot_interpretations.json');

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

