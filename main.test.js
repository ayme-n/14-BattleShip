import { Ship } from "./main"
import { Gameboard } from "./main"

test('ship length =  2 +  hit 2 =  sinked',()=>{

    const ship = Ship(2)


    ship.hit()
    ship.hit()


    expect(ship.isSunk()).toBe(true)


})


test('hit all ships > gameOver',()=>{
    board = Gameboard()


    const ship1 = Ship(2)
    const ship2 = Ship(5)
    const ship3 = Ship(2)

 board.init()

    board.addShip(ship1,10,10,"top")
    board.addShip(ship2,1,1,"bottom")
    board.addShip(ship3,5,5,"left")

    
    board.receiveAttack(1,1)
    board.receiveAttack(4,9)
    board.receiveAttack(2,10)
    board.receiveAttack(4,9)
    board.receiveAttack(2,1)
    board.receiveAttack(3,1)
      board.receiveAttack(4,1)
        board.receiveAttack(5,1)
    board.receiveAttack(5,4)
    board.receiveAttack(5,5)
    board.receiveAttack(10,10)
    board.receiveAttack(9,10)

    expect(board.gameOver()).toBe(true)


})

