import { Gameboard } from "./main.js";
import { Ship } from "./main.js";
import { player } from "./main.js";
import { Init } from "./DOM.js";
import { Synch_Board } from "./DOM.js";
(function Start(){



   Init() //init 2 grids DOM


    const P1 = player()
    const P2 = player()





    const ship1 = Ship(2)
    const ship2 = Ship(3)
    const ship3 = Ship(3)
    const ship4 = Ship(4)
    const ship5 = Ship(5)

    
    const board1 = Gameboard()

    const board2 = Gameboard() //computer

    board1.init() //add divs for each grid
    board2.init()

    
    board1.random(ship1,ship2,ship3,ship4,ship5,board1)


    board2.random(ship1,ship2,ship3,ship4,ship5,board2)

    P1.setBoard(board1.getBoard())
    P2.setBoard(board2.getBoard())

    board2.Start_Listener(P1.getBoard(),P2.getBoard(),board1,board2)



    Synch_Board(P1.getBoard(),"grid_1") //copy array to DOM grid
    Synch_Board(P2.getBoard(),"grid_2")


    
})()