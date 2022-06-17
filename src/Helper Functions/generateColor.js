function randomColor(r,g,b){
    return 'rgb('+random(r)+','+random(g)+','+random(b)+')';    
   }

function random(number){
    return Math.floor(Math.random()*number);;
    }
    
export {randomColor};