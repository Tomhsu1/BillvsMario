var GameOverScreen =  {
    preload : function () {
//        game.load.image = ('assets/images/background khanda.png');
        game.load.image('bg' , 'assets/images/game_background.png' );
        game.load.image('go' , 'assets/images/oops.jpeg')
    },
    create: function () {
        this.bg = game.add.image(0,0, 'bg');
        this.bg.width = game.width;
        this.bg.height = game.height;
        var style = {font: '100px Arial', fill:'#000000', align: 'center'};
        this.text = game.add.text(game.world.centerX-40, game.world.centerY-40, 'GAME OVER');
        this.test = this.add.button(459, 300, 'go', this.startGame, this);
    },

    //this method just start/change to another state call GameOverScreen
    //check in index.html
    //directory.js
    endGame: function() {
        //start the state 'GameScreen', as defined in the directory
        this.state.start('GameOverScreen');
    },

    startGame: function() {
        //start the state 'GameScreen', as defined in the directory
        this.state.start('TitleScreen');
    }

};
