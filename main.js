


export function Ship (L){

    let length=L,nbr_hit=0,sunk=false,name="ship"


    function hit(){nbr_hit++}

    function GetLength(){return length}

        function GetName(){return name}

        function SetName(NewName){name=NewName}

    function isSunk(){

        if(nbr_hit==length) {sunk=true}

        return sunk
    }



    return{hit,isSunk,GetLength,SetName,GetName}
}


export function Gameboard  (){

    let board = []

    const row=10,column=10

    function init(){

        for(let i=0;i<row;i++){
            board[i]=[]

            for(let j=0;j<column;j++){
                board[i][j] = "...."
            } 
        }


    }

function display() {
    board.forEach(row => {
        console.log(row.map(cell => {
            if (typeof cell === 'string') return cell;
            return cell.GetName();  // show "Hit" or "ship"
        }).join(' '));
    });
}



    function addShip(ship,x1,y1,direction){

        const Lenght = ship.GetLength()

        if (direction == "right"){ 

            for(let j =y1;j<y1+Lenght;j++){

                board[x1-1][j-1] = ship
            }


        }
        else{
            
            if(direction =="left"){

                for(let j =y1-Lenght+1;j<=y1;j++){

                board[x1-1][j-1] = ship
            }
            }

            else if(direction =="bottom"){

                  

                for(let j =x1;j<x1+Lenght;j++){

                board[j-1][y1-1] = ship
            }
            }
                
             else{//top
                
                for(let j =x1-Lenght+1;j<=x1;j++){

                board[j-1][y1-1] = ship
            }
            }

        }
    }

    let miss = [] 

    function receiveAttack(x,y){

        let cell = board[x-1][y-1]

        if(typeof cell !== 'string'){
            cell.hit()
           board[x-1][y-1] = "HIT"
        }
        else{
            
             board[x-1][y-1] ="Miss"
                miss.push([x, y]);
                          
        }



    }

    function gameOver(){

        for(let i=0;i<row;i++){
           

            for(let j=0;j<column;j++){
                if(typeof board[i][j] !== "string") return false
            } 
        }
        

        return true
    }

    function getBoard(){return board}


    function overBoard(x,y,random_diretion,L){

        if(random_diretion=="top")
        {

            if((x-L) < 0 ){return true}

        }
        else
        {
            if(random_diretion=="bottom"){

                 if((x+L) > 10 ){return true}


            }
            else
            {
                if(random_diretion=="right"){
                    if((y+L) >  10 ){return true}
                }
                else{//left
                    if((y-L) <  0 ){return true}
                }
            }
        }


        return false
    }


    function contains(array, x, y, L, direction) {
    if (direction === "top") {
        for (let i = x - L+1 ; i <= x; i++) {
            if (array.some(sub => 
                (sub[0] === i && sub[1] === y) ||
                (sub[0] === i && sub[1] === y + 1) ||
                (sub[0] === i && sub[1] === y - 1)
            )) {
                return true;
            }
        }
    } else if (direction === "bottom") {
        for (let i = x+1; i <= x + L; i++) {
            if (array.some(sub => 
                (sub[0] === i && sub[1] === y) ||
                (sub[0] === i && sub[1] === y + 1) ||
                (sub[0] === i && sub[1] === y - 1)
            )) {
                return true;
            }
        }
    } else if (direction === "right") {
        for (let i = y ; i <= y + L; i++) {
            if (array.some(sub =>
                (sub[0] === x && sub[1] === i) ||
                (sub[0] === x - 1 && sub[1] === i) ||
                (sub[0] === x + 1 && sub[1] === i)
            )) {
                return true;
            }
        }
    } else if (direction === "left") {
        for (let i = y - L ; i <= y; i++) {
            if (array.some(sub =>
                (sub[0] === x && sub[1] === i) ||
                (sub[0] === x - 1 && sub[1] === i) ||
                (sub[0] === x + 1 && sub[1] === i)
            )) {
                return true;
            }
        }
    }

    return false;
}


    function random(ship1,ship2,ship3,ship4,ship5,board2){


        let direction = ["top","bottom","left","right"]
        let ships = [ship1,ship2,ship3,ship4,ship5]
        let point = [1,2,3,4,5,6,7,8,9,10]

        let taken = []
      
        let i = 0;

           do{
                
                let random_diretion = direction[Math.floor(Math.random()*direction.length)]
                let x = point[Math.floor(Math.random()*point.length)]
                let y = point[Math.floor(Math.random()*point.length)]

               let L = ships[i].GetLength()

                if((overBoard(x,y,random_diretion,L)==false)&&((contains(taken,x,y,L,random_diretion)==false))){

                    board2.addShip(ships[i],x,y,random_diretion)

                    //save coord taken for collapse immune

                    if(random_diretion == "top" || random_diretion == "bottom")
                        
                    {
                       
                         //first
                        //above line of first head
                        if(random_diretion == "top"){



                            taken.push([x+1,y])
                            taken.push([x+1,y+1])
                            taken.push([x+1,y-1])
                        
                        }
                        else{

                            if(random_diretion=="bottom"){

                                taken.push([x-1,y])
                                taken.push([x-1,y+1])
                                taken.push([x-1,y-1])
                            }
                           
                        }

                        for(let i=0;i<=L-1;i++)
                        {
                           if(random_diretion == "top"){

                            taken.push([x-i,y])


                            taken.push([x-i,y+1])//right side
                             taken.push([x-i,y-1]) //left side

                             if(i == L-1){

                                taken.push([x-2,y])
                                taken.push([x-2,y+1])
                                taken.push([x-2,y-1])


                             }



                           }
                           else{//bottom


                            taken.push([x+i,y])


                            taken.push([x+i,y+1])//right side
                            taken.push([x+i,y-1]) //left side

                            if(i == L-1){

                                taken.push([x+2,y])
                                taken.push([x+2,y+1])
                                taken.push([x+2,y-1])


                             }




                           }
                        }
                    }
                    else{ //right/left


                        if(random_diretion=="right"){
                                    taken.push([x,y-1])
                                    taken.push([x+1,y-1])
                                    taken.push([x-1,y-1])
                                    
                                }
                                else{
                                    if(random_diretion=="left"){
                                        taken.push([x,y+1])
                                    taken.push([x+1,y+1])
                                    taken.push([x-1,y+1])
                                        
                                    }
                                }

                        
                        for(let i=0;i<=L-1;i++)
                        {

                             if(random_diretion == "right"){


                            taken.push([x,y+i])


                            taken.push([x+1,y+i])//right side
                             taken.push([x-1,y+i]) //left side

                             if(i == L-1){

                                taken.push([x,y+2])
                                taken.push([x+1,y+2])
                                taken.push([x-1,y+2])


                             }

                           }
                           else{

                            taken.push([x,y-i])


                            taken.push([x+1,y-i])//right side
                             taken.push([x-1,y-i]) //left side

                             if(i == L-1){

                                taken.push([x,y-2])
                                taken.push([x+1,y-2])
                                taken.push([x-1,y-2])


                             }


                           }
                        }

                    }

                    console.log(taken)

                    i++
                }


            }while(i<5)




    }

    let Computer = [] //coord played by computer to not duplicated

    function Computer_turn(board1,b1){



          
        let div_index;


        do{

            div_index = String(Math.floor(Math.random()*100))


        }while(Computer.includes(div_index))

        
            Computer.push(div_index)


        console.log(div_index)
         
          if(turn=="grid_1"){
              const div = document.getElementById(div_index);

            let ligne,coloumn

            if((div_index/10)<1){

                
             ligne = 0

             coloumn = parseInt(div_index.charAt(0));


            }
            else{

                
             ligne = parseInt(div_index.charAt(0));

             coloumn = parseInt(div_index.charAt(1));

            }

            

            if ((board1[ligne][coloumn]) ==="....") {

                 div.style["backgroundColor"] = "grey";
            }
            else{ //hitted

                
                div.style.backgroundColor = "red";
                b1.receiveAttack(ligne+1,coloumn+1)

                            


            

        }
        turn = "grid_2"
          }
        
    }

    

let turn = "grid_2"; // état global

function Start_Listener(board1,board2,b1,b2) { //first 2 = board last 2 object
    const grid1 = document.getElementById("grid_1");
    const grid2 = document.getElementById("grid_2");



    
    grid2.addEventListener("click", (e) => {
        if (turn === "grid_2" && e.target.id !== "grid_2") {
                        let div_index = e.target.id 

            const div = document.getElementById(div_index);

             let ligne,coloumn

            if((div_index/100)<1){

                
             ligne = 0

             coloumn = parseInt(div_index.charAt(0));


            }
            else{

                
             ligne = parseInt(div_index.charAt(1));

             coloumn = parseInt(div_index.charAt(2));

            }

            

            if ((board2[ligne][coloumn]) ==="....") {

                 div.style["backgroundColor"] = "grey";
            }
            else{

                            div.style.backgroundColor = "red";
                            b2.receiveAttack(ligne+1,coloumn+1)


            }

            turn = "grid_1";

            console.log("haha")

            Computer_turn(board1,b1)

             // changement de tour
        }
    });
    
}



    return{init,display,addShip,receiveAttack,gameOver,getBoard,Start_Listener,random}
}


export function player(){
 

let gameBoard=null

function getBoard() {return gameBoard}
function setBoard(board){gameBoard = board}

function display() {
    gameBoard.forEach(row => {
        console.log(row.map(cell => {
            if (typeof cell === 'string') return cell;
            return cell.GetName();  // show "Hit" or "ship"
        }).join(' '));
    });
}

return{getBoard,setBoard,display}

}
