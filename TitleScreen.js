//creates a TitleScreen object
var TitleScreen = {
    
    //the preload method runs first
    //it is where we load our assets
    preload : function() {
        //loads an image named 'logo'
        game.load.image('chr', 'assets/images/walk_animation.gif');
        //loads an image named 'start'   
        game.load.image('start1', 'assets/images/start1.png');
        game.load.image('bg' , 'assets/images/game_background.png' );
    },
    
    
    //the create method is run after the preload method
    //it is where we set up the basics of the game, essentially what it will look like when we start the game
    create: function () {
        this.bg = game.add.image(0,0, 'bg');
        this.bg.width = game.world.width;
        this.bg.height = game.world.height;
        //adds an image with image 'logo' at (290, 100)
        this.chr = this.add.image(800, 279, 'chr');
        this.chr.width = 70;
        this.chr.height = 40;
        this.chr.scale.x = 0.5;
        this.chr.scale.y = 0.5;
        //adds a button with image 'start' at location (200, 180) that calls the method startGame when it is clicked on
        this.test = this.add.button(1100, game.world.centerY+50, 'start1', this.startGame, this);
        var style = {font: '80px Arial', fill:'#FFFFFF', align: 'center'};
        this.text = game.add.text(1100, game.world.centerY+100, 'Start');
    
        
        
        //makes the background color of the whole screen periwinkle
    },
    
    update: function() {
        if (this.test.x > 500) 
            this.test.x -= 5;
       if (this.text.x > 500) {
           this.text.x -= 5;
        if (this.chr.x > 500) {
            this.chr.x -= 20
        }
            
       }
    
    },

    //this is a method we created and named ourselves
    //it will only run when it is told to by some other method
    startGame: function() {
        //start the state 'GameScreen', as defined in the directory
        this.state.start('GameScreen');
    }
    
};