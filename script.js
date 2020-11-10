const app = new PIXI.Application(
  {
    width: 512,
    height: 512,
    backgroundColor: 0x7799CC,
    antialias: true
  }
);

document.body.appendChild(app.view);

const sUtil = new SpriteUtilities(PIXI);
const keys = {}
let player;
let tileTextures;

app.loader.add('tilesheet', 'assets/images/tilesheet.png');
app.loader.load(setup);

function setup() {
  tileTextures = sUtil.filmstrip(
    app.loader.resources['tilesheet'].url,
    64, 64
  );

  createMap();
  createPlayer();

  app.ticker.add(gameLoop);
}

function createMap() {
  let i = 0;
  let floorContainer = sUtil.grid(
    8, 8, 64, 64,
    false, 0, 0,
    () => {
      let sprite = new PIXI.Sprite(
        tileTextures[levels[0].floor[i]]
      );
      i++;
      return sprite;
    }
  )
  app.stage.addChild(floorContainer);

  i = 0;
  let wallsContainer = sUtil.grid(
    8, 8, 64, 64,
    false, 0, 0,
    () => {
      let sprite = new PIXI.Sprite(
        tileTextures[levels[0].walls[i]]
      );
      i++;
      return sprite;
    }
  )
  app.stage.addChild(wallsContainer);
}

function createPlayer() {
  player = new PIXI.AnimatedSprite([
    tileTextures[52],
    tileTextures[53],
    tileTextures[54],
    tileTextures[52]
  ]);
  player.animationSpeed = 0.3;
  player.loop = false;
  player.x = 64;
  player.y = 64;
  app.stage.addChild(player);
}

window.addEventListener('keydown', event => {
  keys[event.keyCode] = true;
});

window.addEventListener('keyup', event => {
  keys[event.keyCode] = false;
});

function gameLoop() {
  // Seta para a esquerda
  if (keys['37']) {
    if (!player.playing) {
      player.textures = [
        tileTextures[81],
        tileTextures[82],
        tileTextures[83],
        tileTextures[81]
      ];
      player.play();
    }
    player.x -= 2;
  }
  // Seta para a cima
  if (keys['38']) {
    if (!player.playing) {
      player.textures = [
        tileTextures[55],
        tileTextures[56],
        tileTextures[57],
        tileTextures[55]
      ];
      player.play();
    }
    player.y -= 2;
  }
  // Seta para a direita
  if (keys['39']) {
    if (!player.playing) {
      player.textures = [
        tileTextures[78],
        tileTextures[79],
        tileTextures[80],
        tileTextures[78]
      ];
      player.play();
    }
    player.x += 2;
  }
  // Seta para a baixo
  if (keys['40']) {
    if (!player.playing) {
      player.textures = [
        tileTextures[52],
        tileTextures[53],
        tileTextures[54],
        tileTextures[52]
      ];
      player.play();
    }
    player.y += 2;
  }
}