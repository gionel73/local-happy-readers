import order from './order';
import viewLogic from './viewLogic';

class Inventory {
    constructor() {
        this.stock = {
            "Pride and Prejudice": 1,
            "Fairy Tales": 2,
            "One Hundred Years of Solitude": 1,
            "Moby Dick": 1,
            "Hunger": 2,
            "Wuthering Heights": 3,
            "The Trial": 3,
            "To the Lighthouse": 2,
            "Ulysses": 1,
            "The Decameron": 2,
            "The Divine Comedy": 3,
            "The Possessed": 1
        }
    }

    getQuantity(book) {
        return this.stock[book];
    }

    addBook(book) {
        this.stock[book]++;
    }

    getBook(book) {
        this.stock[book]--;
    }

    getFromInventory(listBooks) {
        for (const book of listBooks) {
            this.getBook(book);
        }
    }

    addToInventory(listBooks) {
        for (const book of listBooks) {
            this.addBook(book);
        }
    }

    checkInventory() {
        for (const [book, quantity] of Object.entries(this.stock)) {
            if (quantity) {
                viewLogic.setAvailableBooks(book, 'in');
            } else {
                viewLogic.setAvailableBooks(book, 'out');
            }
        }
    }

}

var thisInventory = new Inventory();
export default thisInventory;
