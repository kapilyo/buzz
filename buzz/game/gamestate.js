/**
 * @TODO PLAY RECORDING OPTION IS a great pleasure to the players 
 */

ns.Gamestate = function(config){
    var MAX_ROUNDS = 10,
    DEFAULT = {
        players: {'$current$': '$current$', '$com$L1$': '$com$L1$'},
        cards : {},
        currentTurn : '',
        nextTurn : '',
        currentRoundNum : 1,
        roundScoreBoard: {
            
        },
        gameScoreBoard : {
            
        }
    };
    
    var scope = this,
        data = {};
    
    var init = function(config){
        $.extend(true, data, DEFAULT, config);
        
        data.nextTurn = 0+','+1;
    };
    
    /****************/
    this.start = function(){
        scope.startRound();
    };
    
    this.reset = function(){
        init(settings);
    };
    
    this.pause = function(){
        
    };
    
    this.exit = function(){
        
    };
    
    /****************/
    this.save = function(){

    };
    
    this.load = function(){
        
    };
    
    /*****************/
    this.getSequence = function(){
        return data.players; // @todo randomize
    };
    
    this.startRound = function(){
        if(scope.hasNextRound()){
            // return @todo players data and cards            
        }else{
            // retunr error message
        }
    };

    this.randomizeCards = function(){
        
    };
    
    this.getCurrentPlayers = function(){
        return data.currentTurn;
    };
    
    this.swapCards = function(p1,p2,c1,c2){
        // @todo validate
        
        // @todo swap cards
        
        // return @todo players data and cards
        
        // scope.isRoundCompleted(); // update flag
    };
    
    this.calculateNextPlayers = function(){
        currentTurn = nextTurn;
        
        var indexes = currentTurn.split(',');
        nextTurn = indexes[1]+','(players.length == indexes[1]+1)?0:indexes[1]+1;
        
        return currentTurn;
    };
    
    this.isRoundCompleted = function(){
        // @todo calculate and update flag
    };
    
    this.buzz = function(player){// player = $timeup$
        // @todo is valid buzz .. basicly check the roundcompleted flag
        
        // @todo is first?
        // @todo if first validate
            // @todo update round count & scoreboard
            // @todo start timer
        
        // @todo if not first
            // set rank
        // @todo if $timeup$ - If a player drops off in the middle
            // set 0 to non buzzers
        
        updateScoreAndRounds();
    };
    
    this.hasNextRound = function(){
        if(data.currentRoundNum < MAX_ROUNDS){
            return true;
        }else{
            false;
        }
    };
    
    var updateScoreAndRounds = function(){
        
    };

    this.getRoundScoreBoard = function(){
        // return round scoreboard
    };

    this.getGameScoreBoard = function(){
        // rerunt game scoreboard
    };
};