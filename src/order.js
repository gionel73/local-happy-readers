import viewLogic from './viewLogic';
import Inventory from './inventory';
import moment from 'moment';

class Order {
    constructor() {
        this.listBooks = [];
        this.availableToBorrow = true;
    }

    addBook(book) {
        this.listBooks.push(book);
    }

    setListBooks(arrayBooks) {
        this.listBooks = arrayBooks;
    }

    emptyListBooks() {
        this.listBooks = [];
    }

    getOrder() {
        return this.listBooks;
    }

    deleteBook(book) {
        this.listBooks.splice(this.listBooks.indexOf(book), 1);
    }

    isAvailableToBorrow() {
        return this.availableToBorrow;
    }

    setAvailableToBorrow(cond) {
        this.availableToBorrow = cond;
    }

    getAvailableToBorrow() {
        return this.availableToBorrow;
    }

    checkTime() {
        const lastHistory = this.getHistory();
        if (lastHistory && !lastHistory.availableToBorrow) {
            const now = moment();
            const dateToReturn = moment(lastHistory.dueDate);
            if (now > dateToReturn) {
                window.alert("Your time has expired. Please return the books...");
            }
        }
    }

    storeSelected() {
        // Store local selected books
        localStorage.listBooks = JSON.stringify(this.getOrder());
    }

    reloadOrder() {
        if (typeof localStorage.listBooks != 'undefined') {
            const tempOrder = JSON.parse(localStorage.listBooks);
            if (tempOrder && tempOrder.length) {
                for (const book of tempOrder) {
                    viewLogic.setBookSelected(book);
                }
                this.setListBooks(tempOrder);
            }
        }
    }

    saveOrder(newOrder) {
        //Save in History final order
        const existingHistory = typeof localStorage.history != 'undefined' ? JSON.parse(localStorage.history) : [];
        let history = {};
        history.listBooks = newOrder;
        history.created = moment();
        history.dueDate = history.created.clone().add(1, 'minutes');
        history.availableToBorrow = this.getAvailableToBorrow();
        existingHistory.push(history);
        localStorage.history = JSON.stringify(existingHistory);
    }

    reloadHistory() {
        const lastHistory = this.getHistory();
        if (lastHistory && lastHistory.listBooks) {
            this.setAvailableToBorrow(lastHistory.availableToBorrow);
            if (!lastHistory.availableToBorrow) {
                Inventory.getFromInventory(lastHistory.listBooks);
            }
            Inventory.checkInventory();
        }
        const history = this.getHistory('all');
        if (history) {
            history.forEach(viewLogic.showHistoryList);
        }
    }

    getHistory(cond) {
        if (typeof localStorage.history != 'undefined') {
            const history = typeof localStorage.history != 'undefined' ? JSON.parse(localStorage.history) : [];
            if (history.length) {
                return cond == 'all' ? history : history[history.length - 1];
            }
        }
        return [];
    }

    reset() {
        document.querySelectorAll('.book').forEach((book) => {
            book.classList.remove('selected');
        });
        localStorage.listBooks = JSON.stringify([]);
        this.emptyListBooks();
        viewLogic.showBooks('checkout', []);
    }

    isValidOrder() {
        return (this.listBooks.length < 3);
    }

}

var newOrder = new Order();
export default newOrder;
