var isFacingRight = true;
var isFacingRight2 = true;
var charaFacingRight = true;
var mrokill = true;
var counter = 9;

var background;
var floors;
var bullets;
var mbls;
var grgcount = 2;

var time = 60;


var GameScreen = {
    preload: function() {
        game.load.spritesheet('gr', 'assets/images/guy_walk_spritesheet.png', 58, 87, 8);
        game.load.spritesheet('mo', 'assets/images/marioWalk.png', 40, 34, 8);
        game.load.image('floor', 'assets/images/floor.jpg');
        game.load.image('bullet', 'assets/images/bullet.png');
        game.load.image('pl', 'assets/images/platforms.png', 100, 100, 45);
        game.load.image('bg', 'assets/images/background.png', 1000, 100);
        game.load.image('mbl', 'assets/images/mario_bullet.png');
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
        
        game.input.onDown.add(this.createBullet, this);
             
        //bullet function
        bullets = game.add.group();
        bullets.enableBody = true;
        mbls = game.add.group();
        mbls.enableBody = true;
        
        this.grg = game.add.sprite(0, 10, 'gr');

        game.physics.arcade.enable(this.grg);
        this.grg.animations.add('walk');
        this.grg.animations.play('walk', 10, true);
        
        this.mro = game.add.sprite(1000, 400, 'mo');
        game.physics.arcade.enable(this.mro);
        this.mro.body.allowGravity = true;
        
        this.pl = game.add.sprite(710, 210, 'pl');
        
        this.ts = game.add.sprite(410, 290, 'pl');
        
        this.io = game.add.sprite(95, 210, 'pl');
        
        this.la = game.add.sprite(95, 380, 'pl');
        
        
        this.ru = game.add.sprite(710, 380, 'pl');
        
        game.physics.arcade.enable(this.mro);
        game.physics.arcade.enable(this.pl);
        game.physics.arcade.enable(this.ts);
        game.physics.arcade.enable(this.io);
        game.physics.arcade.enable(this.la);
        game.physics.arcade.enable(this.ru);
        
        this.mro.animations.add('walk2');

        this.mro.animations.play('walk2', 8, true);
        
        this.grg.body.collideWorldBounds = true;
        this.mro.body.collideWorldBounds = true;
        
        this.pl.body.immovable = true;
        this.pl.body.collideWorldBounds = true;
        this.pl.height = 30;
        this.pl.width = 200;
        this.pl.body.allowGravity = false;
        this.pl.body.checkCollision.down = false;

        this.ts.body.immovable = true;
        this.ts.body.collideWorldBounds = true;
        this.ts.height = 30;
        this.ts.width = 200;
        this.ts.body.allowGravity = false;
        this.ts.body.checkCollision.down = false;
        
        this.io.body.immovable = true;
        this.io.body.collideWorldBounds = true;
        this.io.height = 30;
        this.io.width = 200;
        this.io.body.allowGravity = false;
        this.io.body.checkCollision.down = false;
        
        this.la.body.immovable = true;
        this.la.body.collideWorldBounds = true;
        this.la.height = 30;
        this.la.width = 200;
        this.la.body.allowGravity = false;
        this.la.body.checkCollision.down = false;
        
        this.ru.body.immovable = true;
        this.ru.body.collideWorldBounds = true;
        this.ru.height = 30;
        this.ru.width = 200;
        this.ru.body.allowGravity = false;
        this.ru.body.checkCollision.down = false;
        

        this.platforms = game.add.group();
        
        this.platforms.add(this.pl);
        this.platforms.add(this.ts);
        this.platforms.add(this.io);
        this.platforms.add(this.la);
        this.platforms.add(this.ru);


    },
    
    update: function() {
        time++;
        game.physics.arcade.collide(floors, this.grg);
        game.physics.arcade.collide(floors, this.mro);
        game.physics.arcade.collide(this.platforms, this.grg);
        game.physics.arcade.collide(this.platforms, this.mro);

//        game.physics.arcade.collide(this.grg, this.mro, this.lit, null, this);
        
        game.physics.arcade.collide(this.grg, [this.mro, this.mgm], this.endGame, null, this);

        
        game.physics.arcade.collide(this.grg, [this.mro], this.endGame, null, this);


        game.physics.arcade.collide(bullets, this.mro, this.hit, null, this);
        
        game.physics.arcade.collide(mbls, this.grg, this.destroy, null, this);
        
        game.physics.arcade.collide (mbls, bullets, this.tall, null, this);
        
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
            this.mro.body.velocity.y = 350;
        } else {
            this.grg.body.velocity.x = 0;
        }
        
        if (this.mro.body.x <= game.world.width - 50 && isFacingRight) {
            this.mro.body.velocity.x = 400;//is going to right of screen going this fast
            this.mro.anchor.setTo(.5,1);//will flip to the left
            
            this.mro.scale.x = 1;//will flip to the left
        } else if (this.mro.body.x !== 0){//makes mario flip
            isFacingRight = false;//causes him to go left
            this.mro.anchor.setTo(.5,1);//will flip to the right
            this.mro.scale.x = -1;//will flip to the right
            this.mro.body.velocity.x = -400;//is going to the left of the screen going this fast
        } else {
            isFacingRight = true;
        }
        
        if (this.wasd.up.isDown && game.time.now > this.jumpTimer) {
            
            this.grg.body.velocity.y = -850;
            this.jumpTimer = game.time.now + 900;

        }
        
        if (game.time.now > this.mroJumpTimer) {
            this.mro.body.velocity.y = -850;
            this.mroJumpTimer = game.time.now + 1100;
            this.createMarioBullet();
        }
        
        for (var i = 0; i < this.platforms.length; i++) {
            for (var j = 0; j < bullets.length; j++) {
                if (Phaser.Rectangle.intersects(this.platforms.getChildAt(i).getBounds(), bullets.getChildAt(j).getBounds())) {
                    bullets.getChildAt(j).kill();    
                }
            }
        }
    },
    
    createMarioBullet: function() {
        if (isFacingRight) {
            help = game.add.sprite(this.mro.x+30, this.mro.y - 30, 'mbl', 0, mbls);
            help.body.allowGravity = false;
//           help.body.velocity.x = 50;
//            help.body.velocity.y = 50;
            game.physics.arcade.moveToObject(help, this.grg, 200);
        } else {
            help = game.add.sprite(this.mro.x-30, this.mro.y - 30, 'mbl', 0, mbls);
            help.body.allowGravity = false;
//            help.body.velocity.x = -50;
//            help.body.velocity.y = -50;
            game.physics.arcade.moveToObject(help, this.grg, 200);
        }
    },

    
    createBullet: function() {
        
        if (time > 17) {
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
    
    hit: function(chara, bullet) {
        if (counter < 1) {
            chara.kill();
            this.winGame();
            counter = 9;
            grgcount = 2;
        } else {
            bullet.kill();
            counter--;
        }
    },
    
    destroy: function(grg, mbls) {
        if (grgcount < 1) {
            grg.kill();
            //call endscreen
            this.endGame();
            grgcount = 2;
            counter = 9;
        } else {
            mbls.kill();
            grgcount--;
        }
    },
    
    tall: function(mbls, bullets) {
        mbls.kill();
        bullets.kill();
    },
    
    //this method just start/change to another state call GameOverScreen
    //check in index.html
    //directory.js
    endGame: function() {
        //start the state 'GameScreen', as defined in the directory
        this.state.start('GameOverScreen');
    },
    
    winGame: function() {
        //start the state 'GameScreen', as defined in the directory
        this.state.start('WinScreen');
    }
    
};