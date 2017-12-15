
var charaFacingRight = true;

var background;
var floors;


var WinScreen = {
    preload: function() {
        game.load.spritesheet('gr', 'assets/images/guy_walk_spritesheet.png', 58, 87, 8);
        game.load.spritesheet('mo', 'assets/images/marioWalk.png', 40, 34, 8);
        game.load.image('floor', 'assets/images/floor.jpg');
        game.load.image('bullet', 'assets/images/bullet.png');
        game.load.image('pl', 'assets/images/platforms.png', 100, 100, 45);
        game.load.image('bg', 'assets/images/background.png', 1000, 100);
        game.load.image('mbl', 'assets/images/mario_bullet.png');
        game.load.image('tr', 'assets/images/trophy.jpg');
    },
    create: function() {
       
        
        //Keyboard
        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
              
         };
        
        background = game.add.tileSprite(0, 0, 1000, 800, 'bg');
        floors = game.add.tileSprite(0, 548, 1000, game.width, 'floor');
        floors.physicsType = Phaser.SPRITE;
        game.physics.arcade.enable(floors);
        
        floors.collideWorldBounds = true;
        floors.body.immovable = true;
        floors.body.allowGravity = false;
        
        this.jumpTimer = 0;
        this.mroJumpTimer = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 2000;

        
        this.grg = game.add.sprite(0, 10, 'gr');

        game.physics.arcade.enable(this.grg);
        this.grg.animations.add('walk');
        this.grg.animations.play('walk', 10, true);
        
        this.grg.body.collideWorldBounds = true;

        this.tr = game.add.sprite (400, 300, 'tr');
        game.physics.arcade.enable(this.tr);
        this.tr.body.allowGravity = false;
        
                this.text = game.add.text(game.world.centerX-190, game.world.centerY-60, 'YOU WIN! GET YOUR PRIZE HERE ');



    },
    
    update: function() {
        time++;
        game.physics.arcade.collide(floors, this.grg);
        game.physics.arcade.collide(this.tr, this.grg, this.title, null, this);
        
        if (charaFacingRight) {
        background.tilePosition.x -= 2;
        floors.tilePosition.x -= 2;
        } else {
            background.tilePosition.x += 2;
        floors.tilePosition.x += 2;
        }
        
        if (this.wasd.right.isDown) {
            charaFacingRight = true;
            this.grg.body.velocity.x = 350;
            this.grg.anchor.setTo(.5,1);
            this.grg.scale.x = 1;
        } else if (this.wasd.left.isDown) { //if the left arrow is pressed, move to the left
            charaFacingRight = false;
            this.grg.anchor.setTo(.5,1);
            this.grg.scale.x = -1;
            this.grg.body.velocity.x = -350;
        } else if (this.wasd.down.isDown) { //if the down arrow is pressed, move downwards
            this.grg.body.velocity.y = 350;
        } else {
            this.grg.body.velocity.x = 0;
        }
        
       
        if (this.wasd.up.isDown && game.time.now > this.jumpTimer) {
            
            this.grg.body.velocity.y = -850;
            this.jumpTimer = game.time.now + 900;

        }
        
    },
    
    createBullet: function() {
        
        if (time > 30) {
            time = 0;
            if (charaFacingRight) {    
                temp = game.add.sprite(this.grg.x+50, this.grg.y - 50, 'bullet', 0, bullets);
                temp.body.allowGravity = false;
                temp.body.velocity.x = 50; 
            } else {
                temp = game.add.sprite(this.grg.x-50, this.grg.y - 50, 'bullet', 0, bullets);
                temp.body.allowGravity = false;
                temp.body.velocity.x = -50; 
            }

            //  Our bullet group
                bullets.setAll('anchor.x', 0.5);
                bullets.setAll('anchor.y', 0.5);
                bullets.setAll('outOfBoundsKill', true);
                bullets.setAll('checkWorldBounds', true);
                game.physics.arcade.moveToPointer(temp, 300);
        }
    },
    
    
    //this method just start/change to another state call GameOverScreen
    //check in index.html
    //directory.js
    title: function() {
        //start the state 'GameScreen', as defined in the directory
        this.state.start('TitleScreen');
    }
    
};