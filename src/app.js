import Scene from 'class/Scene';
import Cube from 'class/Cube';
import ClickIndicator from 'class/ClickIndicator';
import AssetManager from 'class/AssetManager';
import Vector from 'class/Vector';
import { BodyType } from 'class/Constants';

const mgr = new AssetManager();
mgr.load('background', 'https://images6.alphacoders.com/715/715677.png');
mgr.load('https://images6.alphacoders.com/715/715677.png');
console.log(mgr);

// Create Scene
const scene = new Scene();
scene.addToBody();

new ClickIndicator(scene);
// Create Game Objects
const ball = new Cube({
  scene,
  pos: new Vector(150, 100),
  width: 40,
  height: 60,
});
const platform = new Cube({
  scene,
  body: BodyType.STATIC,
  pos: new Vector(100, scene.canvas.height - 100),
  width: 200,
  height: 20,
});

const game = {
  scene,
  paused: false,
};

// debugging
window.game = game;

// Game logic
const gameLoop = () => {
  requestAnimationFrame(gameLoop);

  if (game.paused) {
    return;
  }

  scene.clear();
  scene.draw();
};

gameLoop();
