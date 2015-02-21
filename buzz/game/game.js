ns = {com:{moregames:{buzz:{}}}};

ns.Game = function(con){
    var gameState = new ns.GameState;
    
    this.init = function(state){
        gameState = state?state:{};
        
        start();
    };
    
    var start = function(){
        
    };
};