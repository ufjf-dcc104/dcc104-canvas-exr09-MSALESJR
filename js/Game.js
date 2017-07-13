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
var player_2 = null;
var ultima_direcao_player_1 = 4;
var ultima_direcao_player_2 = 6;
var tiros = [];


var player_1_img = new Image();
player_1_img.src = './img/player_1.png';

var player_2_img = new Image();
player_2_img.src = './img/player_2.png';

function init(){
    tela = document.getElementById('tela');
    contexto = tela.getContext('2d');

    player_1 = new Player();
    player_1.x = 650;
    player_1.y = 305;
    player_1.tag = 'player_1';
    player_1.img = player_1_img;

    player_2 = new Player();
    player_2.x = 155;
    player_2.y = 305;
    player_2.tag = 'player_2';
    player_2.img = player_2_img;

    grid = new Grid();
    level = new Level();
    level.init(grid, player_1, player_2);
    requestAnimationFrame(drawFrame);
    initControls();
}

function drawFrame(){
    requestAnimationFrame(drawFrame);
    atual = new Date();
    dt = (atual  - anterior) / 1000 ;
    contexto.clearRect(0,0, tela.width, tela.height);
    grid.andar(player_1);
    grid.andar(player_2);
    level.desenha(contexto, dt);
    anterior = atual;
    contexto.fillStyle = 'yellow';
    contexto.font="20px Georgia";
    contexto.fillText("Game - Bombardeador",305,25);
}

function initControls() {
    document.addEventListener('keydown', function(e){
        switch(e.keyCode){
            /*** Controle player 1 **/
            case 37 :
                player_1.direcao = 4;
                ultima_direcao_player_1 = 4;
                break;
            case 38 :
                player_1.direcao = 8;
                ultima_direcao_player_1 = 8;
                break;
            case 39 :
                player_1.direcao = 6;
                ultima_direcao_player_1 = 6;
                break;
            case 40 :
                player_1.direcao = 2;
                ultima_direcao_player_1 = 2;
                break;

            case 96 :
                if(player_1.balas > 0){
                    player_1.balas--;
                    var tiro = new Tiro();
                    tiro.x = player_1.x;
                    tiro.y = player_1.y;
                    tiro.tag = 'player_1';
                    tiro.direcao = ultima_direcao_player_1;
                    tiros.push(tiro);
                }else{
                    if(!grid.temRecarga){
                        grid.sorteiaRecarga()
                    }
                }
                break;

            /*** Controle player 2 **/
            case 65 :
                player_2.direcao = 4;
                ultima_direcao_player_2 = 4;
                break;
            case 87 :
                player_2.direcao = 8;
                ultima_direcao_player_2 = 8;
                break;
            case 68 :
                player_2.direcao = 6;
                ultima_direcao_player_2 = 6;
                break;
            case 83 :
                player_2.direcao = 2;
                ultima_direcao_player_2 = 2;
                break;

            case 32 :
                if(player_2.balas > 0){
                    player_2.balas--;
                    var tiro = new Tiro();
                    tiro.x = player_2.x;
                    tiro.y = player_2.y;
                    tiro.tag = 'player_2';
                    tiro.direcao = ultima_direcao_player_2;
                    tiros.push(tiro);
                }else{
                    if(!grid.temRecarga){
                        grid.sorteiaRecarga()
                    }
                }
                break;

        }
    });

    document.addEventListener('keyup', function(e){
        switch(e.keyCode){
            /*** Controle player 1 **/
            case 37 :
            case 38 :
            case 39 :
            case 40 :
                player_1.direcao = 0;
                break;

            case 96 :
                //player_1.direcao = 2;
                break;

            /*** Controle player 2 **/
            case 65 :
            case 87 :
            case 68 :
            case 83 :
                player_2.direcao = 0;
                break;
            case 32 :
                //player_2.direcao = 2;
                break;
        }
    });
}
