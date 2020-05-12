const GameView = require('./game_view.js');

const canvasCtx = document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    
    
    const view = new GameView(ctx);
    view.start();
});