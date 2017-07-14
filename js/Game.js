/**
 * Created by Marcus on 21/06/2017.
 */
var level  = null;
var tela = null;
var contexto = null;
var atual    = new Date();
var anterior = new Date();
var dt       = 0;

var grid = null;

var player_1 = null;

var player_1_img = new Image();
player_1_img.src = './img/player_1.png';


function init(){
    tela = document.getElementById('tela');
    contexto = tela.getContext('2d');

    player_1 = new Player();
    player_1.x = 50;
    player_1.y = 335;
    player_1.tag = 'player_1';
    player_1.img = player_1_img;


    grid = new Grid();
    level = new Level();
    level.init(grid, player_1);
    requestAnimationFrame(drawFrame);
    initControls();
}

function drawFrame(){
    requestAnimationFrame(drawFrame);
    atual = new Date();
    dt = (atual  - anterior) / 1000 ;
    contexto.clearRect(0,0, tela.width, tela.height);
    grid.andar(player_1);
    level.desenha(contexto, dt);
    anterior = atual;
    contexto.fillStyle = 'yellow';
    contexto.font="20px Georgia";
    contexto.fillText("Game - Plataforma",32,25);

    contexto.font="20px Georgia";
    contexto.fillText("Vidas : " + grid.vidas,500,25);

    contexto.font="20px Georgia";
    contexto.fillText("Tesouros : " + grid.tesouros,625,25);
}

function initControls() {
    document.addEventListener('keydown', function(e){

        switch(e.keyCode){
            /*** Controle player 1 **/
            case 37 :
                player_1.direcao = 4;
                break;
            case 39 :
                player_1.direcao = 6;
                break;
            case 32 :
                break;
        }
    });

    document.addEventListener('keyup', function(e){
        switch(e.keyCode){
            /*** Controle player 1 **/
            case 37 :
            case 39 :
                break;

            case 32 :
                break;

        }
    });
}
