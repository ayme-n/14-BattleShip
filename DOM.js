


export function Init(){

    const grids = document.querySelectorAll(".grid")
    let j = 0

grids.forEach(grid => {
    if (j==0){

          for(let i=0;i<100;i++){
        const cell = document.createElement("div")
        cell.id = i
        grid.appendChild(cell)
        j++
    }
    }
    else{
          for(let i=0;i<100;i++){
        const cell = document.createElement("div")
        cell.id = i + 100
        grid.appendChild(cell)
    }
    }
    
});


}


export function Synch_Board(board,Player){


    const grid = document.getElementById(Player)

        

        if(Player=='grid_1'){
            
        for(let i=0;i<10;i++){
           

            for(let j=0;j<10;j++){
                
                 if(typeof board[i][j] !== "string") {
                    let index = ((i*10))+j

                    const div = grid.querySelector('[id="' + index + '"]');
                    
                    
                
                    div.style["backgroundColor"] ="black"
                 }
                
            } 
        }
        
        }
        else{
            
        for(let i=0;i<10;i++){
           

            for(let j=0;j<10;j++){
                
                 if(typeof board[i][j] !== "string") {
                    let index = ((i*10))+j + 100

                    const div = document.getElementById(index)
                    
                    
                    
                    div.style["backgroundColor"] ="black"
                 }

            } 
        }
        
        }



}

