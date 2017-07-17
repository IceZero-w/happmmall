var borad = new Array();
var score = 0;
var max;
$(function(){
  newGame();
})
function newGame(){
  score=0;
  $('.end').css('display','none');
  $('.score').text('score:'+score);
  boxPosition();
  addRandNum();
  addRandNum();
}
function boxPosition(){
  for(var i=0;i<4;i++){
    borad[i] = new Array();
    for(var j=0;j<4;j++){
      var boxs = $('#box-'+i+'-'+j);
      borad[i][j] = 0;
      $('#box-'+i+'-'+j).css({
        left:20+120*j,
        top:20+120*i
      })
    }
  }
  numPosition();  
}
function numPosition(){
  $('.num').remove();
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      $('.container').append('<div class="num" id="num-'+i+'-'+j+'"></div>');
      if(borad[i][j] == 0){
        $('#num-'+i+'-'+j).css({
          width:0,
          height:0,
          left:20+120*j,
          top:20+120*i
        })
      }else{
        $('#num-'+i+'-'+j).css({
          width:'100px',
          height:'100px',
          left:20+120*j,
          top:20+120*i,
          backgroundColor:numBackgroundColor(borad[i][j]),
          color:numColor(borad[i][j])
        })
        $('#num-'+i+'-'+j).text(borad[i][j]);
      }
    }
  }
}
function numBackgroundColor(value){
  switch (value) {
		case 2: return '#eee4da'; 
		case 4: return '#ede0c8'; 
		case 8: return '#f2b179'; 
		case 16: return '#f59563'; 
		case 32: return '#f67c5f'; 
		case 64: return '#f65e3b'; 
		case 128: return '#edcf72'; 
		case 256: return '#edcc61'; 
		case 512: return '#9c0'; 
		case 1024: return '#33b5e5'; 
		case 2048: return '#09c'; 
		case 4096: return '#a6c'; 
		case 8192: return '#93c'; 
	}
	return 'black';
}
function numColor(value){
  if(value < 4){
		return '#776e65';
	}else{
		return "white";
	}
}
function addRandNum(){
  var randX = parseInt(Math.floor(Math.random()*4));
  var randY = parseInt(Math.floor(Math.random()*4));
  var randomValue = Math.random() > 0.5 ? 2 : 4;
  while(true){
    if(borad[randX][randY] == 0){
      break;
    }else{
     var randX = parseInt(Math.floor(Math.random()*4));
      var randY = parseInt(Math.floor(Math.random()*4));
    }
  }
  borad[randX][randY] = randomValue;
  randAnimation(randX,randY,borad[randX][randY]);  
}
function randAnimation(i,j,value){
  $('#num-'+i+'-'+j).css({
    backgroundColor:numBackgroundColor(value),
    color:numColor(value)
  });
  $('#num-'+i+'-'+j).text(value);
  $('#num-'+i+'-'+j).animate({
    width:'100px',
    height:'100px',
    left:20+120*j,
    top:20+120*i
  },20);
}
// function maxScore(){
//   var arrMax = new Array();
//   for(var i=0;i<4;i++){
//     for(var j=0;j<4;j++){
//       arrMax.push(borad[i][j]);
//     }
//   }
//   max = Math.max.apply(null,arrMax);
//   $('.score').text('score:'+max);
// }
//游戏结束
function gameOver(){
  if(!canMoveLeft(borad) && !canMoveRight(borad) && !canMoveTop(borad) && !canMoveBottom(borad)){
    $('.end').css('display','block');
    $('#endScore').text('你的最终得分：'+score);
  }
}
//键盘事件
$(document).keydown(function(e){
  gameOver();
  switch(e.keyCode){
    case 37:
      if(canMoveLeft(borad)){
        moveLeft();
        setTimeout('addRandNum()',300);
      }break;
    case 38:
      if(canMoveTop(borad)){
        moveTop();
        setTimeout('addRandNum()',300);
      }break;
    case 39:
      if(canMoveRight(borad)){
        moveRight();
        setTimeout('addRandNum()',300);  
      }break;
    case 40:
      if(canMoveBottom(borad)){
        moveBottom();
        setTimeout('addRandNum()',300);
      }break;
  }
  $('.score').text('score:'+score);
})

//向左
function canMoveLeft(borad){
  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){
      if(borad[i][j] !=0){
        if(borad[i][j-1] == 0 || borad[i][j] == borad[i][j-1])
          return true;
      }
    }
  }
}
function moveLeft(){
  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){
      if(borad[i][j] != 0){
        for(var k=0;k<j;k++){
          if(borad[i][k] == 0 && noMiddleNumberLeft(i,k,j,borad)){
            moveAnimation(i,j,i,k);
            borad[i][k] = borad[i][j];
            borad[i][j] = 0;
          }else if(borad[i][k] == borad[i][j] && noMiddleNumberLeft(i,k,j,borad)){
            moveAnimation(i,j,i,k);
            borad[i][k] += borad[i][j];
            score += borad[i][j];
            borad[i][j] = 0;
          }else if(borad[i][j] == borad[i][j-1]){
            moveAnimation(i,j,i,j-1);
            borad[i][j-1] += borad[i][j];
            score += borad[i][j];
            borad[i][j] = 0;
          }
        }
      }
    }
  }
  setTimeout('numPosition()',200);
}

function noMiddleNumberLeft(i,k,j,borad){
    for(var n=k+1;n<j;n++){
      if(borad[i][n] != 0){
        return false;
      }
    }
  return true;
}
function moveAnimation(fromX,fromY,toX,toY){
  $('#num-'+fromX+'-'+fromY).animate({
    left:20+120*toY,
    top:20+120*toX
  },200)
}

//向上
function canMoveTop(borad){
  for(var i=1;i<4;i++){
    for(var j=0;j<4;j++){
      if(borad[i][j] !=0){
        if(borad[i-1][j] == 0 || borad[i][j] == borad[i-1][j])
          return true;
      }
    }
  }
}
function moveTop(){
  for(var i=1;i<4;i++){
    for(var j=0;j<4;j++){
      if(borad[i][j] != 0){
        for(var k=0;k<i;k++){
          if(borad[k][j] == 0 && noMiddleNumberTop(i,k,j,borad)){
            moveAnimation(i,j,k,j);
            borad[k][j] = borad[i][j];
            borad[i][j] = 0;
          }else if(borad[k][j] == borad[i][j] && noMiddleNumberTop(i,k,j,borad)){
            moveAnimation(i,j,k,j);
            borad[k][j] += borad[i][j];
            score += borad[i][j];
            borad[i][j] = 0;
          }else if(borad[i][j] == borad[i-1][j]){
            moveAnimation(i,j,i-1,j);
            borad[i-1][j] += borad[i][j];
            score += borad[i][j];
            borad[i][j] = 0;
          }
        }
      }
    }
  }
  setTimeout('numPosition()',200);
}
function noMiddleNumberTop(i,k,j,borad){
  for(var n=k+1;n<i;n++){
    if(borad[n][j] !=0){
      return false;
    }
  }
  return true;
}

//向右
function canMoveRight(borad){
  for(var i=0;i<4;i++){
    for(var j=2;j>=0;j--){
      if(borad[i][j] !=0){
        if(borad[i][j+1] == 0 || borad[i][j] == borad[i][j+1])
          return true;
      }
    }
  }
}
function moveRight(){
  for(var i=0;i<4;i++){
    for(var j=2;j>=0;j--){
      if(borad[i][j] != 0){
        for(var k=3;k>j;k--){
          if(borad[i][k] == 0 && noMiddleNumberRight(i,k,j,borad)){
            moveAnimation(i,j,i,k);
            borad[i][k] = borad[i][j];
            borad[i][j] = 0;
          }else if(borad[i][k] == borad[i][j] && noMiddleNumberRight(i,k,j,borad)){
            moveAnimation(i,j,i,k);
            borad[i][k] += borad[i][j];
            score += borad[i][j];
            borad[i][j] = 0;
          }else if(borad[i][j] == borad[i][j+1]){
            moveAnimation(i,j,i,j+1);
            borad[i][j+1] += borad[i][j];
            score += borad[i][j];
            borad[i][j] = 0;
          }
        }
      }
    }
  }
  setTimeout('numPosition()',200);
}

function noMiddleNumberRight(i,k,j,borad){
    for(var n=k-1;n>j;n--){
      if(borad[i][n] != 0){
        return false;
      }
    }
  return true;
}

//向下
function canMoveBottom(borad){
  for(var i=2;i>=0;i--){
    for(var j=0;j<4;j++){
      if(borad[i][j] !=0){
        if(borad[i+1][j] == 0 || borad[i][j] == borad[i+1][j])
          return true;
      }
    }
  }
}
function moveBottom(){
  for(var i=2;i>=0;i--){
    for(var j=0;j<4;j++){
      if(borad[i][j] != 0){
        for(var k=3;k>i;k--){
          if(borad[k][j] == 0 && noMiddleNumberBottom(i,k,j,borad)){
            moveAnimation(i,j,k,j);
            borad[k][j] = borad[i][j];
            borad[i][j] = 0;
          }else if(borad[k][j] == borad[i][j] && noMiddleNumberBottom(i,k,j,borad)){
            moveAnimation(i,j,k,j);
            borad[k][j] += borad[i][j];
            score += borad[i][j];
            borad[i][j] = 0;
          }else if(borad[i][j] == borad[i+1][j]){
            moveAnimation(i,j,i+1,j);
            borad[i+1][j] += borad[i][j];
            score += borad[i][j];
            borad[i][j] = 0;
          }
        }
      }
    }
  }
  setTimeout('numPosition()',200);
}
function noMiddleNumberBottom(i,k,j,borad){
  for(var n=k-1;n>i;n--){
    if(borad[n][j] !=0){
      return false;
    }
  }
  return true;
}
