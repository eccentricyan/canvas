var sound = new Audio();
sound.src = "sound.mp3";
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

//変数の設定と初期化
var frame = 0;											// 全体のフレームカウント
var target = {x:250, y:100,dir:1};  	// ターゲット（位置と移動方向）
var player = {x:250, y:400};					// プレイヤー（位置）
var ball = {x:-10, y:-10};					// ボール（位置）
var point = 0;											// 得点
var balls = [ball];

setInterval(anime, 50);

function anime(){									//アニメ関数
  frame++;
  //★画面をクリア
  myClear();
  //★targetを描画
  myTarget(target.x, target.y);
  //★得点表示
  myPoint(point, target.x, target.y);
  //★playerを描画
  myPlayer(player.x, player.y);

  // myHeart(player.x, player.y);
  //★ballを描画
  for(let i = 0; i < balls.length; i++) {
    myBall(balls[i].x - 5, balls[i].y);
    balls[i].y -= 5;
    //得点ゲット
    if ((100 == balls[i].y) && (Math.abs(target.x - balls[i].x)<25)){
      point++;
      sound.play();
      balls.splice(i, 1);
    }
  }

  //移動計算
  target.x += target.dir;

  //壁衝突計算
  if(target.x < 25 || 295 < target.x){target.dir *= -1;}

}

//独自関数
function myClear(){
  c.clearRect(0, 0, canvas.width, canvas.height);
}

function myTarget(x,y){
  c.fillStyle = "black";
  c.fillRect(x - 25, y - 5, 50, 10);
}

function myPoint(point,x,y){
  c.fillStyle = "black";
  c.font = "20px sans-serif ";
  c.fillText(point, x, y - 5);
}

function myPlayer(x, y){
  c.fillStyle = "blue";
  c.fillRect(x - 25, y - 5, 50, 10);
}

function myBall(x, y){
  c.fillStyle = "red";
  c.fillRect(x - 5, y - 5, 10, 10);
}

function addBall(x, y) {
  balls.push({x: x - 10, y: y - 10});
}

//シュートする関数
canvas.addEventListener("mousedown",function(e){
  addBall(player.x, player.y);
});

canvas.addEventListener("mousemove",function(e){
  var rect = e.target.getBoundingClientRect();
  player.x = e.clientX-rect.left;
});
