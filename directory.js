// Initialize Phaser game with screen size 650 x 480 in the gameDiv tag
var game = new Phaser.Game(1000, 580, Phaser.AUTO, 'gameDiv');

//adds the TitleScreen object as a Phaser state to the game
game.state.add('TitleScreen', TitleScreen);

//adds the GameScreen object as a Phaser state to the game
game.state.add('GameScreen', GameScreen);

//add this new gameover screen state
game.state.add('GameOverScreen', GameOverScreen);

game.state.add('WinScreen', WinScreen);

//to add more states
//game.state.add('what the state will be named', the object that the state is contained within)

//begins the game at the TitleScreen state
game.state.start('TitleScreen');