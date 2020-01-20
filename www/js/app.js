function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);
    
    StatusBar.hide();
    window.onload = init();
    
    var options = {
      message: 'I found this cool game that helps', // not supported on some apps (Facebook, Instagram)
      subject: 'Cool game', // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.google.com',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }

    var onSuccess = function(result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }

    var onError = function(msg) {
      console.log("Sharing failed with message: " + msg);
    }
    
    // select the right Ad Id according to platform
    var admobid = {};
    if( /(android)/i.test(navigator.userAgent) ) { // for android
		admobid = {
			interstitial: 'ca-app-pub-6844226935157475/8497759824',
            videoforcoins: 'ca-app-pub-6844226935157475/6745694456',
            videoforcontinue: 'ca-app-pub-6844226935157475/7255996197'
        };
    } /*else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
		admobid = {
			banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
			interstitial: 'ca-app-pub-xxx/kkk'
		};
    } else { // for windows phone
		admobid = {
			banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
			interstitial: 'ca-app-pub-xxx/kkk'
		};
    }*/
}

document.addEventListener("deviceready", onDeviceReady, false);


function init() {
    //The entire system
    var mainMenu = document.getElementById('menu');
    var Play = document.getElementById('play');
    var Gameover = document.getElementById('over');
    var playBut = document.getElementById ('button1');
    var levelUp = document.getElementById('levelup');
    var rainbowshield = document.getElementById('itemshield');
    var shieldicon = document.getElementById('iconshield');
    var dualicon = document.getElementById('icondual');
    var slowicon = document.getElementById('iconslow');
    var chance = document.getElementById('chance');
    var volbox = document.getElementById('volbox');
    var volnum = document.getElementById('volnum');

    playBut.addEventListener('mouseup', function(){
        if (localStorage.level > 2) {
            newlev = Math.round(localStorage.level/2);
            document.getElementById('over_tryagain').style.display = "block";
            document.getElementById('againfromlev').innerHTML = "Start from Level " + newlev.toString() + "?";
        } else {
            mainMenu.style.display = "none";
            Play.style.display = "block";
            gameStartOnLevel(1); 
        }       
    });
    
    $('#button2').click(function(){
        mainMenu.style.display = "none";
        Play.style.display = "block";
        gameStart2();
    });     
    
    $('#button3').click(function(){
        mainMenu.style.display = "none";
        Play.style.display = "block";
        gameStart3();
    });
    
    $('#button4').click(function(){
       alert("Sorry, this function is not ready yet!"); 
    });
    
    $('#button5').click(function(){
       window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError); 
    });
    
    $('#button6').click(function(){
       alert("Sorry, this function is not ready yet!"); 
    });
    
    $('#button7').click(function(){
        mainMenu.style.display = "none";
        document.getElementById('shop').style.display = "block";
    });
    
    $('#shoptomenu').click(function(){
        gotomenu();
        document.getElementById('shop').style.display = "none";
    });
    
    $('#button8').click(function(){
       alert("Sorry, this function is not ready yet!"); 
    });
    
    volbox.addEventListener('click', function(){
        if(volnum.style.display === "none") {
            volnum.style.display = "block";
            localStorage.audio = 0;
        } else {
            volnum.style.display = "none";
            localStorage.audio = 1;
        }
    });
    
    $('#buyshield').click(function(){
        var howmany = prompt("How many?", 1); 
        
        if (Number.isInteger(parseInt(howmany)) && parseInt(howmany) > 0) {
            purchase(1, parseInt(howmany));
        } else {
            alert("Error");
        }
    });
    
    $('#buydual').click(function(){
        var howmany = prompt("How many?", 1); 
        
        if (Number.isInteger(parseInt(howmany)) && parseInt(howmany) > 0) {
            purchase(2, howmany);
        } else {
            alert("Error");
        }
    });
    
    $('#buyslow').click(function(){
        var howmany = prompt("How many?", 1); 
        
        if (Number.isInteger(parseInt(howmany)) && parseInt(howmany) > 0) {
            purchase(3, howmany);
        } else {
            alert("Error");
        }
    });
    
    $('#buyall').click(function(){
        var howmany = prompt("How many?", 1); 
        
        if (Number.isInteger(parseInt(howmany)) && parseInt(howmany) > 0) {
            purchase(4, howmany);
        } else {
            alert("Error");
        }
    });
    
    function purchase(which, many) {
        if (which === 1) {
            var coins = parseInt(localStorage.coin);
            var shields = parseInt(localStorage.shield);
            var amount = parseInt(many);
            if (coins >= 30*amount) {
                localStorage.coin = coins-30*amount;
                localStorage.shield = shields + amount;
                alert("Purchase complete!");
            } else {
                alert("You don't have enough coins.");
            }
        } else if (which === 2) {
            var coins = parseInt(localStorage.coin);
            var duals = parseInt(localStorage.dual);
            var amount = parseInt(many);
            if (coins >= 30*amount) {
                localStorage.coin = coins-30*amount;
                localStorage.dual = duals + amount;
                alert("Purchase complete!");
            } else {
                alert("You don't have enough coins.");
            }
        } else if (which === 3) {
            var coins = parseInt(localStorage.coin);
            var slows = parseInt(localStorage.slow);
            var amount = parseInt(many);
            if (coins >= 30*amount) {
                localStorage.coin = coins-30*amount;
                localStorage.slow = slows + amount;
                alert("Purchase complete!");
            } else {
                alert("You don't have enough coins.");
            }
        } else if (which === 4) {
            var coins = parseInt(localStorage.coin);
            var amount = parseInt(many);
            if (coins >= 70*amount) {
                localStorage.coin = coins-70*amount;
                localStorage.shield = parseInt(localStorage.shield) + amount;
                localStorage.dual = parseInt(localStorage.dual) + amount;
                localStorage.slow = parseInt(localStorage.slow) + amount;
                alert("Purchase complete!");
            } else {
                alert("You don't have enough coins.");
            }
        } 
    }
    
    
    function gotomenu() {
        if(localStorage.audio === 0) {
            volnum.style.display = "block";
        } else {
            volnum.style.display = "none";
        }
        
        document.getElementById('coinum').innerHTML = localStorage.coin.toString();
        
        mainMenu.style.display = "block";
        
        // preppare and load ad resource in background, e.g. at begining of game level
        AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false}, function() { 
            Gameover.style.display = "none";
            mainMenu.style.display = "none";
            Play.style.display = "block";
            gameStartOnLevel(newlev); 
        }, null);
    }
    
    //start the game
    function gameStart(scr, lv, spd, n) {
        then = new Date().getTime();
        startTime = then;
        noRepeat();
        drawButtons();
        addEL();
        opacity = 0;
        up = 0;
        if (localStorage.shield > 0) {
            shieldexist = 1;
        } else {
            shieldexist = 0;
        }
        if (localStorage.dual > 0) {
            dualexist = 1;
        } else {
            dualexist = 0;
        }
        if (localStorage.slow > 0) {
            slowexist = 1;
        } else {
            slowexist = 0;
        }
        itemtime = 0;
        itemtime2 = 0;
        itemtime3 = 0;
        score = scr;
        level = lv;
        incY = spd;
        blockArray = [];
        blockArray2 = [];
        createManyBlocks(n);
        startAnimation(animationLoop);
        
        AdMob.prepareRewardVideoAd( {adId:admobid.videoforcontinue, autoShow:false}, function() { 
            
        }, null);
    }
    
    function gameStart2() {
        then = new Date().getTime();
        startTime = then;
        noRepeat();
        drawButtons();
        addEL2();
        incY = spdunit*6;
        score = 0;
        blockArray = [];
        blockArray2 = [];
        createManyBlocks(200);
        startAnimation(animationLoop2);
    }
    
    function gameStart3() {
        then = new Date().getTime();
        startTime = then;
        noRepeat();
        drawButtons();
        addEL3();
        incY = spdunit*6;
        score = 0;
        blockArray = [];
        blockArray2 = [];
        createManyBlocks(200);
        startAnimation(animationLoop3);
    }
    
    function gameStartOnLevel(lev) {
        gameStart(5*lev*(lev-1), lev, (lev+3)*spdunit, 5*lev);
    }
    
    //Main canvas Scripts
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    canvas.width = screen.width;
    canvas.height = screen.height;

    //variable declaration
    var x = canvas.width;
    var y = canvas.height;

    var now, then, delta, startTime, timeElapsed, score, level, incY, opacity, up; 
    var shieldexist, itemtime, dualexist, itemtime2, slowexist, itemtime3;
    
    var retry = 1;
    
    var spdunit = y/30;

    //highest level and score and etc.
    if (localStorage.level === undefined) {
        localStorage.level = 1;
    }

    if (localStorage.score === undefined) {
        localStorage.score = 0;
    }
    
    if (localStorage.score2 === undefined) {
        localStorage.score2 = 0;
    }
    
    if (localStorage.score3 === undefined) {
        localStorage.score3 = 0;
    }
    
    if (localStorage.shield === undefined) {
        localStorage.shield = 3;
    }

    if (localStorage.dual === undefined) {
        localStorage.dual = 3;
    }
    
    if (localStorage.slow === undefined) {
        localStorage.slow = 3;
    }
    
    if (localStorage.coin === undefined) {
        localStorage.coin = 0;
    }
    
    if (localStorage.audio === undefined) {
        localStorage.audio = 1;
    }
    
    var blockArray = [];
    var blockArray2 = [];

    var buttonNo = [0, 0, 0, 0, 0, 0, 0, 0];
    
    //Animation loop
    function animationLoop() {
        //data needed for time-based animation
        now = new Date().getTime();
        delta = now - then;

        //drawing
        ctx.clearRect(y/4, 0, x-y/2, y);
        background();

        blackbar();

        scoreBoard();

        clash();

        levelupfunc();
        
        //item
        itemnums();
        items();

        //for the continuation of time-based animation
        then = now;

        if (id != undefined) {
            id = requestAnimationFrame(animationLoop);
        } 
    }
    
    function animationLoop2() {
        //data needed for time-based animation
        now = new Date().getTime();
        delta = now - then;

        //drawing
        ctx.clearRect(y/4, 0, x-y/2, y);
        ctx.save();
        ctx.fillStyle = "White";
        ctx.fillRect(y/4, 0, x-y/2, y);
        ctx.strokeStyle = "Black";
        threeLines();
        ctx.save();

        regAct();
        
        blackbar();

        scoreBoard2();

        clash2();
        
        incY += spdunit/100;
        
        if ((blockArray[blockArray.length - 1] === "done") && (blockArray2[blockArray2.length - 1] === "done")){
            createManyBlocks(100);
        }
        
        //for the continuation of time-based animation
        then = now;

        if (id != undefined) {
            id = requestAnimationFrame(animationLoop2);
        } 
    }
    
    function animationLoop3() {
        //data needed for time-based animation
        now = new Date().getTime();
        delta = now - then;

        //drawing
        ctx.clearRect(y/4, 0, x-y/2, y);
        ctx.save();
        ctx.fillStyle = "Black";
        ctx.fillRect(y/4, 0, x-y/2, y);
        ctx.strokeStyle = "White";
        threeLines();
        line(x/2-y/16,0,x/2-y/16,y);
        line(x/2+y/16,0,x/2+y/16,y);
        ctx.save();
        
        regAct();
        
        blackbar();

        scoreBoard2();

        clash3();
        
        incY += spdunit/100;
        
        if ((blockArray[blockArray.length - 1] === "done") && (blockArray2[blockArray2.length - 1] === "done")){
            createManyBlocks(100);
        }
        
        //for the continuation of time-based animation
        then = now;

        if (id != undefined) {
            id = requestAnimationFrame(animationLoop3);
        } 
    }
    
    function startAnimation(animation) {
        id = requestAnimationFrame(animation);
    }

    function stopAnimation() {
        if (id) {
            cancelAnimationFrame(id);
            id = undefined;
        }
    }        

    //function that gives time-based speed
    var calcDistanceToMove = function(delta, speed) {
        return (speed*delta)/1000;
    }
    
    function background() {
        if (level%2 === 1) {
            ctx.save();
            ctx.fillStyle = "Black";
            ctx.fillRect(y/4,0,x/2-5*y/16,y);
            ctx.restore();
            
            action();
            ctx.save();
            ctx.strokeStyle = "Black";
            threeLines();
            ctx.restore();
            
            ctx.save();
            ctx.strokeStyle = "White";
            line(y/4,y/4,x/2-y/16,y/4);
            line(y/4,y/2,x/2-y/16,y/2);
            line(y/4,3*y/4,x/2-y/16,3*y/4);
            line(x/2-y/16,0,x/2-y/16,y);
            ctx.restore();
        } else {
            ctx.save();
            ctx.fillStyle = "Black";
            ctx.fillRect(x/2+y/16,0,x/2-5*y/16,y);
            ctx.restore();
                    
            action();
            ctx.save();
            ctx.strokeStyle = "Black";
            threeLines();
            ctx.restore();
            
            ctx.save();
            ctx.strokeStyle = "White";
            line(x/2+y/16,y/4,x-y/4,y/4);
            line(x/2+y/16,y/2,x-y/4,y/2);
            line(x/2+y/16,3*y/4,x-y/4,3*y/4);
            line(x/2+y/16,0,x/2+y/16,y);
            ctx.restore();
        }
    }
    
    //draw and move blocks
    function action() {
        var newspd;
        for (var i=0; i < blockArray.length; i++) {
            if (now - itemtime3 < 20000) {
                newspd = calcDistanceToMove(delta, incY);
                blockArray2[i].x += (newspd/2+newspd/40000*(now-itemtime3));
                blockArray[i].x -= (newspd/2+newspd/40000*(now-itemtime3));
            } else {
                blockArray2[i].x += calcDistanceToMove(delta, incY);
                blockArray[i].x -= calcDistanceToMove(delta, incY);
            }

            if (blockArray[i].x < (x/2-y/16)) {
                ctx.save();
                ctx.fillStyle = blockArray[i].c;
                ctx.fillRect(blockArray[i].x, blockArray[i].y, y/8, y/8);
                ctx.restore();
            }
            if (blockArray2[i].x > (x/2-y/16)) {
                ctx.save();
                ctx.fillStyle = blockArray2[i].c;
                ctx.fillRect(blockArray2[i].x, blockArray2[i].y, y/8, y/8);
                ctx.restore();                     
            }
        }
    }    
    
    function regAct() {
        for (var i=0; i < blockArray.length; i++) {
            blockArray2[i].x += calcDistanceToMove(delta, incY);
            blockArray[i].x -= calcDistanceToMove(delta, incY);
            
            if (blockArray[i].x < (x/2-y/16)) {
                ctx.save();
                ctx.fillStyle = blockArray[i].c;
                ctx.fillRect(blockArray[i].x, blockArray[i].y, y/8, y/8);
                ctx.restore();
            }
            if (blockArray2[i].x > (x/2-y/16)) {
                ctx.save();
                ctx.fillStyle = blockArray2[i].c;
                ctx.fillRect(blockArray2[i].x, blockArray2[i].y, y/8, y/8);
                ctx.restore();                     
            } 
        }
    }
    
    //black bar in the middle
    function blackbar() {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(x/2-y/16, 0, y/8, y);
        ctx.restore();    
    }
    
    //if blocks reach the buttons
    function clash() {
        for (var i=0; i < blockArray.length; i++) {
            if (blockArray[i] === "done") {
                continue;
            } else if (blockArray[i].x < y/4) {
                //blockArray[i] = "done";
                //score++;
                gameOver();
                break;
            }
        }

        for (var i=0; i < blockArray2.length; i++) {
            if (blockArray2[i] === "done") {
                continue;
            } else if (blockArray2[i].x > x-y/4-y/8) {
                //blockArray2[i] = "done";
                //score++;
                gameOver();
                break;
            }
        }
    }

    function clash2() {
        for (var i=0; i < blockArray.length; i++) {
            if (blockArray[i] === "done") {
                continue;
            } else if (blockArray[i].x < y/4) {
                //blockArray[i] = "done";
                //score++;
                gameOver2();
                break;
            }
        }

        for (var i=0; i < blockArray2.length; i++) {
            if (blockArray2[i] === "done") {
                continue;
            } else if (blockArray2[i].x > x-y/4-y/8) {
                //blockArray2[i] = "done";
                //score++;
                gameOver2();
                break;
            }
        }
    }
    
    function clash3() {
        for (var i=0; i < blockArray.length; i++) {
            if (blockArray[i] === "done") {
                continue;
            } else if (blockArray[i].x < y/4) {
                //blockArray[i] = "done";
                //score++;
                gameOver3();
                break;
            }
        }

        for (var i=0; i < blockArray2.length; i++) {
            if (blockArray2[i] === "done") {
                continue;
            } else if (blockArray2[i].x > x-y/4-y/8) {
                //blockArray2[i] = "done";
                //score++;
                gameOver3();
                break;
            }
        }
    }
    
    function levelupfunc() {
        //Level up message
        if (up === 1) {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.drawImage(levelUp, x/6, y/4, 2*x/3, x/4);
            ctx.restore();
            opacity += incY/5000;

            if (opacity >= 1) {
                up = 0;
            }
        } else if (up === 0 && opacity > 0.2) {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.drawImage(levelUp, x/6, y/4, 2*x/3, x/4);
            ctx.restore();

            opacity -= incY/5000;
        }



        //when level ends
        if ((blockArray[blockArray.length - 1] === "done") && (blockArray2[blockArray2.length - 1] === "done")){
            if (localStorage.shield > 0) {
                shieldexist = 1;
            } else {
                shieldexist = 0;
            }
            if (localStorage.dual > 0) {
                dualexist = 1;
            } else {
                dualexist = 0;
            }
            if (localStorage.slow > 0) {
                slowexist = 1;
            } else {
                slowexist = 0;
            }
            level++;
            noRepeat();
            drawButtons();
            incY += spdunit;
            up = 1;
            createManyBlocks(5*level);
        }
    }
    
    //Items
    function items() {
        ctx.drawImage(shieldicon, x/2-y/20, 2*y/5, y/10, y/10);
        ctx.drawImage(dualicon, x/2-y/20, 3*y/5, y/10, y/10);
        ctx.drawImage(slowicon, x/2-y/20, 4*y/5, y/10, y/10);

        if (shieldexist === 0 && now-itemtime > 7000) {
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(x/2-y/20, 2*y/5-y/20, y/10, y/10+y/20);
            ctx.restore();
        }
        if (now - itemtime < 7000) {
            shield();
            shieldexist = 0;
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(x/2-y/20, 2*y/5, y/10, y/70000 * (now-itemtime));
            ctx.restore();
        }

        if (dualexist === 0 && now-itemtime2 > 12000) {
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(x/2-y/20, 3*y/5-y/20, y/10, y/10+y/20);
            ctx.restore();
        }
        if (now - itemtime2 < 12000) {
            dual();
            dualexist = 0;
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(x/2-y/20, 3*y/5, y/10, y/120000 * (now-itemtime2));
            ctx.restore();
        }

        if (slowexist === 0 && now-itemtime3 > 20000) {
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(x/2-y/20, 4*y/5-y/20, y/10, y/10+y/20);
            ctx.restore();
        }
        
        if (now - itemtime3 < 20000) {
            slowexist = 0;
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(x/2-y/20, 4*y/5, y/10, y/200000 * (now-itemtime3));
            ctx.restore();
        }            
    }
    //No.1
    function shield() {
        var xspd = (x/2-x/16-y/4)/7;
        //draw rainbow stick in both ends
        ctx.drawImage(rainbowshield, y/4+calcDistanceToMove(now-itemtime, xspd), 0, y/20, y);
        
        for (var i=0; i < blockArray.length; i++) {
            if (blockArray[i] === "done") {
                continue;
            } else if (blockArray[i].x < y/4+calcDistanceToMove(now-itemtime, xspd)+y/20) {
                blockArray[i] = "done";
                score++;
                break;
            }
        }
        
        ctx.drawImage(rainbowshield, x-y/4-y/20-calcDistanceToMove(now-itemtime, xspd), 0, y/20, y);
        
        for (var i=0; i < blockArray2.length; i++) {
            if (blockArray2[i] === "done") {
                continue;
            } else if (blockArray2[i].x+y/8 > x-y/4-y/20-calcDistanceToMove(now-itemtime, xspd)) {
                blockArray2[i] = "done";
                score++;
                break;
            }
        }
    }
    
    //No.2
    function dual() {
    var where;
        for (var i=0; i < blockArray.length; i++) {
            if (blockArray[i].x < (x/2+y/16)) {
                blockArray[i].c = randColor(buttonNo[1]);                
            }
            
            if (blockArray2[i].x > (x/2-y/8)) {
                blockArray2[i].c = randColor(buttonNo[1]);
            }
            
            if (blockArray[i].x < (x/2+y/16) && blockArray[i].y != 5*y/16 && blockArray[i].y != 9*y/16) {
                where = Math.floor((Math.random() * 1) + 10);
                if (where === 10){
                    blockArray[i].y = 5*y/16;
                } else {
                    blockArray[i].y = 9*y/16;
                }
            }
            
            if (blockArray2[i].x > (x/2-y/8) && blockArray2[i].y != 5*y/16 && blockArray2[i].y != 9*y/16) {
                where = Math.floor((Math.random() * 1) + 10);
                if (where === 10){
                    blockArray2[i].y = 9*y/16;
                } else {
                    blockArray2[i].y = 5*y/16;
                }
            }
        }
    }
    
    /*function dual() {
        var which;
        for (var i=0; i < blockArray.length; i++) {
            if (blockArray[i].x < (x/2+y/16) && blockArray[i].c != "Red" && blockArray[i].c != "Blue") {
                which = Math.floor((Math.random() * 1) + 1);
                if (which === 1){
                    blockArray[i].c = "Red";
                } else {
                    blockArray[i].c = "Blue";
                }
            }
            
            if (blockArray2[i].x > (x/2-y/8) && blockArray2[i].c != "Red" && blockArray2[i].c != "Blue") {
                which = Math.floor((Math.random() * 1) + 1);
                if (which === 1){
                    blockArray2[i].c = "Blue";
                } else {
                    blockArray2[i].c = "Red";
                }
            }
            
            if (blockArray[i].x < (x/2+y/16) && blockArray[i].y != 5*y/16 && blockArray[i].y != 9*y/16) {
                which = Math.floor((Math.random() * 1) + 10);
                if (which === 10){
                    blockArray[i].y = 5*y/16;
                } else {
                    blockArray[i].y = 9*y/16;
                }
            }
            
            if (blockArray2[i].x > (x/2-y/8) && blockArray2[i].y != 5*y/16 && blockArray2[i].y != 9*y/16) {
                which = Math.floor((Math.random() * 1) + 10);
                if (which === 10){
                    blockArray2[i].y = 9*y/16;
                } else {
                    blockArray2[i].y = 5*y/16;
                }
            }
        }
        //for (var i=0; i < 4; i++){
            if (buttonNo[i] != 1 && buttonNo[i] != 6) {
                ctx.save();
                ctx.fillStyle = "Black";
                ctx.fillRect(0,i*y/4,y/4,y/4);
                ctx.restore();
            }

            if (buttonNo[i+4] != 1 && buttonNo[i+4] != 6) {
                ctx.save();
                ctx.fillStyle = "Black";
                ctx.fillRect(x-y/4,i*y/4,y/4,y/4);
                ctx.restore();
            }
        }
        
        ctx.save();
        ctx.fillStyle = "Black";
        ctx.fillRect(y/4,0,x/2-5*y/16,y/4);
        ctx.fillRect(y/4,3*y/4,x/2-5*y/16,y/4);
        ctx.fillRect(x/2+y/16,0,x/2-5*y/16,y/4);
        ctx.fillRect(x/2+y/16,3*y/4,x/2-5*y/16,y/4);
        ctx.restore();//
    }*/
    
    //EL for all
    canvas.addEventListener("click", function(evt){
        var mousePos = getMousePos(canvas, evt);
        if (pointWithinSmallerRect(mousePos.x, mousePos.y, x/2-y/20, 2*y/5) && shieldexist === 1) {
            localStorage.shield -= 1;
            itemtime = new Date().getTime();
        } else if (pointWithinSmallerRect(mousePos.x, mousePos.y, x/2-y/20, 3*y/5) && dualexist === 1) {
            localStorage.dual -= 1;
            itemtime2 = new Date().getTime();
        } else if (pointWithinSmallerRect(mousePos.x, mousePos.y, x/2-y/20, 4*y/5) && slowexist === 1) {
            localStorage.slow -= 1;
            itemtime3 = new Date().getTime();
        } 
    });
    
    //Try Again from half the high level
    var newlev;
    
    document.getElementById('yas').addEventListener("mouseup", function(){
        document.getElementById('over_tryagain').style.display = "none";
        AdMob.showInterstitial();
    });
    
    document.getElementById('nah').addEventListener("mouseup", function(){
        document.getElementById('over_tryagain').style.display = "none";
        Gameover.style.display = "none";
        mainMenu.style.display = "none";
        Play.style.display = "block";
        gameStartOnLevel(1);
    });

    //Menu button of game over
    document.getElementById('gotomenu').addEventListener("click", function(){
        Gameover.style.display = "none";
        Play.style.display = "none";
        gotomenu();
    });

    $('#beginning').click(function(){
        if (localStorage.level > 2 && whichgame === 1) {
            newlev = Math.round(localStorage.level/2);
            document.getElementById('over_tryagain').style.display = "block";
            document.getElementById('againfromlev').innerHTML = "Start from Level " + newlev.toString() + "?";
        } else if (whichgame === 1){
            Gameover.style.display = "none";
            Play.style.display = "block";
            gameStartOnLevel(1);
        } else if (whichgame === 2){
            Gameover.style.display = "none";
            Play.style.display = "block";
            gameStart2();
        } else if (whichgame === 3){
            Gameover.style.display = "none";
            Play.style.display = "block";
            gameStart3();
        }
    });
    
    var whichgame = 1;
    //When dead
    function gameOver() {
        removeEL();
        stopAnimation();
        whichgame = 1;
        navigator.vibrate(200);
        
        if (level > localStorage.level) {
            localStorage.level = level;
        }

        if (score > localStorage.score) {
            localStorage.score = score;
        }

        var scr = score.toString();

        document.getElementById('yourScore').innerHTML = "Your Score: " + "<br>" + "<span id='show_score'>" + scr + "</span>";
        document.getElementById('highScore').innerHTML = "High Score: " + localStorage.score.toString() + " &#40;Lv. " + localStorage.level.toString() + "&#41;";
        
        if (retry === 1 && level > 1) {
            setTimeout(tryagain, 500);
        } else if (retry === 0 || level === 1) {
            setTimeout(function(){Gameover.style.display = "block"; retry = 1; localStorage.coin = parseInt(localStorage.coin) + parseInt(score);}, 1000);
        }
    }
    
    function gameOver2() {
        removeEL2();
        stopAnimation();
        whichgame = 2;
        navigator.vibrate(200);

        localStorage.coin = parseInt(localStorage.coin) + parseInt(Math.round(score/5));
        
        if (score > localStorage.score2) {
            localStorage.score2 = score;
        }
        
        var scr = score.toString();

        document.getElementById('yourScore').innerHTML = "Your Score: " + "<br>" + "<span id='show_score'>" + scr + "</span>";
        document.getElementById('highScore').innerHTML = "High Score: " + localStorage.score2.toString();
        
        setTimeout(function(){Gameover.style.display = "block";}, 1000);
    }
    
    function gameOver3() {
        removeEL3();
        stopAnimation();
        whichgame = 3;
        navigator.vibrate(200);

        localStorage.coin = parseInt(localStorage.coin) + parseInt(Math.round(score/5));
        
        if (score > localStorage.score3) {
            localStorage.score3 = score;
        }
        
        var scr = score.toString();

        document.getElementById('yourScore').innerHTML = "Your Score: " + "<br>" + "<span id='show_score'>" + scr + "</span>";
        document.getElementById('highScore').innerHTML = "High Score: " + localStorage.score3.toString();
        
        setTimeout(function(){Gameover.style.display = "block";}, 1000);
    }
    
    function tryagain() {
        chance.style.display = "block";
    }

    document.getElementById('yup').addEventListener("mouseup", function(){
        AdMob.showRewardVideoAd();
    });
    
    document.addEventListener('onAdPresent', function(data){ if(data.adType == 'rewardvideo') { 
        chance.style.display = "none";
        gameStart(Math.round(score/2)*2,level,(level+3)*spdunit,5*level-(Math.round(score/2)-5*level*(level-1)/2));
        retry = 0;
    } });
    
    document.getElementById('nope').addEventListener("mouseup", function(){
        chance.style.display = "none";
        localStorage.coin = parseInt(localStorage.coin) + parseInt(score);
        Gameover.style.display = "block";
    });
    
    
    /*function createManyBlocks(num) {
        var num1, num2, num3, block;

        for (var i=0; i < num; i++) {
            num1 = Math.floor((Math.random() * 4) + 9);
            num2 = Math.floor((Math.random() * 8) + 1);
            num3 = (x/2-y/16) + (i*y/4) + 50;

            var block = new Block(num3, randPos(num1), randColor(num2));
            blockArray[i] = block;
        }

        for (var i=0; i < num; i++) {
            num1 = Math.floor((Math.random() * 4) + 9);
            num2 = Math.floor((Math.random() * 8) + 1);
            num3 = (x/2-y/16) - (i*y/4) - 50 - y/8;    

            var block = new Block(num3, randPos(num1), randColor(num2));
            blockArray2[i] = block;
        }
    }*/
    
    function createManyBlocks(num) {
        var num1, num2, num3, whnum;

        for (var i=0; i < num*2; i++) {
            num1 = Math.floor((Math.random() * 4) + 9);
            num2 = Math.floor((Math.random() * 8) + 1);
            whnum = Math.floor((Math.random() * 8) + 1);
            
            if (whnum%2 === 0) {
                num3 = (x/2-y/16) + (i*y/5) ;
                var block = new Block(num3, randPos(num1), randColor(num2));
                blockArray[i] = block;
                blockArray2[i] = "done";
            } else {
                num3 = (x/2-y/16) - (i*y/5) ;
                var block = new Block(num3, randPos(num1), randColor(num2));
                blockArray2[i] = block;
                blockArray[i] = "done";
            }
        }
    }

    //for new object of block
    function Block(x1, y1, color) {
        this.x = x1;
        this.y = y1;
        this.c = color;
    }


    //generate random numbers without repeat
    function noRepeat() {
        var i, j;

        for (i=0; i < buttonNo.length; i++) {
            buttonNo[i] = Math.floor((Math.random() * 8) + 1);

            j = 0;
            for (;j < i;) {
                if (buttonNo[j] === buttonNo[i]) {
                    i--;
                    break;
                } else {
                    j++;
                }
            }
        }
    }
    
    //one of four random positions
    function randPos(num) {
        if (num === 9) {
            return y/16;
        } else if (num === 10) {
            return 5*y/16;
        } else if (num === 11) {
            return 9*y/16;
        } else if (num === 12) {
            return 13*y/16;
        }
    }

    //one of four random colors
    function randColor(num) {
        if (num === 1) {
            return "Red";
        } else if (num === 2) {
            return "Orange";
        } else if (num === 3) {
            return "Yellow";
        } else if (num === 4) {
            return "Lime";
        } else if (num === 5) {
            return "Aqua";
        } else if (num === 6) {
            return "Blue";
        } else if (num === 7) {
            return "Magenta";
        } else if (num === 8 || num === 0) {
            return "DarkViolet";
        }
    }

    //drawing functions
    function line(x1, y1, x2, y2) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.restore();
    }
    
    function threeLines() {
        line(y/4,y/4,x-y/4,y/4);
        line(y/4,y/2,x-y/4,y/2);
        line(y/4,3*y/4,x-y/4,3*y/4);
    }

    function drawButtons() {
        for (var i=0; i < 4; i++){
            ctx.save();
            ctx.fillStyle = randColor(buttonNo[i]);
            ctx.fillRect(0,i*y/4,y/4,y/4);
            ctx.restore();

            ctx.save();
            ctx.fillStyle = randColor(buttonNo[i+4]);
            ctx.fillRect(x-y/4,i*y/4,y/4,y/4);
            ctx.restore();
        }
    }

    function scoreBoard() {        
        ctx.save();
        ctx.font = "4.5vh Calibri";
        ctx.textAlign = "center";
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.strokeText("Lv. " + level.toString(), x/2, y/18);
        ctx.fillText("Lv. " + level.toString(), x/2, y/18);
        ctx.restore();
        
        ctx.save();
        ctx.font = "5vh Calibri";
        ctx.textAlign = "center";
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.strokeText(score.toString(), x/2, y/8);
        ctx.fillText(score.toString(), x/2, y/8);
        ctx.restore();
    }
    
    function itemnums() {
        ctx.save();
        ctx.font = "3vh Calibri";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(localStorage.shield, x/2, 2*y/5-y/200);
        ctx.restore();
        
        ctx.save();
        ctx.font = "3vh Calibri";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(localStorage.dual, x/2, 3*y/5-y/200);
        ctx.restore();
        
        ctx.save();
        ctx.font = "3vh Calibri";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(localStorage.slow, x/2, 4*y/5-y/200);
        ctx.restore();
    }
    
    function recycletime(duration) {
        ctx.save();
        ctx.font = "3vh Calibri";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(msToTime(duration), x/2, y/4);
        ctx.restore();
    }
    
    function scoreBoard2() {
        ctx.save();
        ctx.font = "5vh Calibri";
        ctx.textAlign = "center";
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.strokeText(score.toString(), x/2, y/18);
        ctx.fillText(score.toString(), x/2, y/18);
        ctx.restore();
    }
    
    //event listeners
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX,
                y: event.clientY
            };
    }

    function whenMouseDown(evt) {
        var mousePos = getMousePos(canvas, evt);
        for (var i=0; i < 4; i++) {
            if (pointWithinRect(mousePos.x, mousePos.y, 0, i*y/4)) {
                drawButtons();
                ctx.save();
                ctx.fillStyle = "rgba(0,0,0,0.4)";
                ctx.fillRect(0, i*y/4, y/4, y/4);
                ctx.restore();
                break;
            } else if (pointWithinRect(mousePos.x, mousePos.y, x-y/4, i*y/4)) {
                drawButtons();
                ctx.save();
                ctx.fillStyle = "rgba(0,0,0,0.4)";
                ctx.fillRect(x-y/4, i*y/4, y/4, y/4);
                ctx.restore();
                break;
            } else {
                drawButtons();
            }
        }
    }

    function mouseDown() {
        canvas.addEventListener('mousemove', whenMouseDown, false);
    }

    function mouseUp() {
        canvas.removeEventListener('mousemove', whenMouseDown, false);
        drawButtons();
        var mousePos = getMousePos(canvas, event);
        for (var i=0; i < 4; i++) {
            if (pointWithinRect(mousePos.x, mousePos.y, 0, i*y/4)) {
                buttonClicked(i,i*y/4+y/16);
                break;
            } else if (pointWithinRect(mousePos.x, mousePos.y, x-y/4, i*y/4)) {
                buttonClicked(i+4,i*y/4+y/16);
                break;                
            }
        }  
    }
    
    function mouseUp2() {
        canvas.removeEventListener('mousemove', whenMouseDown, false);
        drawButtons();
        var mousePos = getMousePos(canvas, event);
        for (var i=0; i < 4; i++) {
            if (pointWithinRect(mousePos.x, mousePos.y, 0, i*y/4)) {
                buttonClicked2(i);
                break;
            } else if (pointWithinRect(mousePos.x, mousePos.y, x-y/4, i*y/4)) {
                buttonClicked2(i+4);
                break;                
            }
        }  
    }
    
    function mouseUp3() {
        canvas.removeEventListener('mousemove', whenMouseDown, false);
        drawButtons();
        var mousePos = getMousePos(canvas, event);
        for (var i=0; i < 4; i++) {
            if (pointWithinRect(mousePos.x, mousePos.y, 0, i*y/4)) {
                buttonClicked3(i*y/4+y/16);
                break;
            } else if (pointWithinRect(mousePos.x, mousePos.y, x-y/4, i*y/4)) {
                buttonClicked3(i*y/4+y/16);
                break;                
            }
        } 
    }

    function addEL() {
        canvas.addEventListener('mousedown', whenMouseDown, false);

        canvas.addEventListener('mousedown', mouseDown, false);

        canvas.addEventListener('mouseout', drawButtons, false);
        
        canvas.addEventListener('mouseup', mouseUp, false);
    }

    function addEL2() {
        canvas.addEventListener('mousedown', whenMouseDown, false);

        canvas.addEventListener('mousedown', mouseDown, false);

        canvas.addEventListener('mouseout', drawButtons, false);
    
        canvas.addEventListener('mouseup', mouseUp2, false);
    }
    
    function addEL3() {
        canvas.addEventListener('mousedown', whenMouseDown, false);

        canvas.addEventListener('mousedown', mouseDown, false);

        canvas.addEventListener('mouseout', drawButtons, false);
    
        canvas.addEventListener('mouseup', mouseUp3, false);
    }
    
    function removeEL() {
        canvas.removeEventListener('mousedown', whenMouseDown, false);

        canvas.removeEventListener('mousedown', mouseDown, false);

        canvas.removeEventListener('mouseout', drawButtons, false);

        canvas.removeEventListener('mouseup', mouseUp, false);            
    }

    function removeEL2() {
        canvas.removeEventListener('mousedown', whenMouseDown, false);

        canvas.removeEventListener('mousedown', mouseDown, false);

        canvas.removeEventListener('mouseout', drawButtons, false);
   
        canvas.removeEventListener('mouseup', mouseUp2, false);
    }
    
    function removeEL3() {
        canvas.removeEventListener('mousedown', whenMouseDown, false);

        canvas.removeEventListener('mousedown', mouseDown, false);

        canvas.removeEventListener('mouseout', drawButtons, false);
   
        canvas.removeEventListener('mouseup', mouseUp3, false);
    }
    
    function pointWithinRect(px, py, rx, ry) {
        if ((px > rx) && (px < rx+y/4) && (py > ry) && (py < ry+y/4)) {
            return true;
        } else {
            return false;
        }
    }

    function pointWithinSmallerRect(px, py, rx, ry) {
        if ((px > rx) && (px < rx+y/10) && (py > ry) && (py < ry+y/10)) {
            return true;
        } else {
            return false;
        }
    }
        
    //var nope = 0;
    function buttonClicked(num, Ybut) {
        for (var i=0; i < blockArray.length;i++) {
            if (blockArray2[i] === "done" && blockArray[i] === "done") {
                continue;
            } else if (blockArray[i] === "done") {
                if (level%2 === 1) {
                    if (blockArray2[i].c === randColor(buttonNo[num])) {
                        blockArray2[i] = "done";
                        score++;
                        break;                       
                    } else {
                        gameOver();
                        break;                       
                    }
                } else if (level%2 === 0) {
                    if (blockArray2[i].y === Ybut) {
                        blockArray2[i] = "done";
                        score++;
                        break;
                    } else {
                        gameOver();
                        break;                       
                    }
                }
            } else if (blockArray[i] != "done") {
                if (level%2 === 1) {
                    if (blockArray[i].y === Ybut) {
                        blockArray[i] = "done";
                        score++;
                        break;
                    } else {
                        gameOver();
                        break;                       
                    }
                } else if (level%2 === 0) {
                    if (blockArray[i].c === randColor(buttonNo[num])) {
                        blockArray[i] = "done";
                        score++;
                        break;                       
                    } else {
                        gameOver();
                        break;                       
                    }
                }
            }
        }
    }
    
    function buttonClicked2(num) {
        for (var i=0; i < blockArray.length;i++) {
            if (blockArray2[i] === "done" && blockArray[i] === "done") {
                continue;
            } else if (blockArray[i] === "done") {
                if (blockArray2[i].c === randColor(buttonNo[num])) {
                    blockArray2[i] = "done";
                    score++;
                    break;
                } else {
                    gameOver2();
                    break;
                }
            } else if (blockArray[i].c === randColor(buttonNo[num])) {
                blockArray[i] = "done";
                score++;
                break;
            } else {
                gameOver2();
                break;
            }
        }
    }
    
    function buttonClicked3(num) {
        for (var i=0; i < blockArray.length;i++) {
            if (blockArray2[i] === "done" && blockArray[i] === "done") {
                continue;
            } else if (blockArray[i] === "done") {
                if (blockArray2[i].y === num) {
                    blockArray2[i] = "done";
                    score++;
                    break;
                } else {
                    gameOver3();
                    break;
                }
            } else if (blockArray[i].y === num) {
                blockArray[i] = "done";
                score++;
                break;
            } else {
                gameOver3();
                break;
            }
        }
    }
    
    //refresh menu
    gotomenu();
}