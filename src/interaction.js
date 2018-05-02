import order from './order';
import viewLogic from './viewLogic';
import Inventory from './inventory';

function initialize(document) {

    order.reloadOrder();
    order.reloadHistory();
    document.getElementById('btn-checkout').classList.add('active');
    viewLogic.showCheckout();

    document.querySelectorAll('.book').forEach(book => {
        book.addEventListener('click',
            () => {
                if (book.classList.contains('selected')) {
                    book.classList.remove('selected');
                    order.deleteBook(book.getAttribute('data-book'));
                } else if (order.isValidOrder()) {
                    if (Inventory.getQuantity(book.getAttribute('data-book'))) {
                        book.classList.add('selected');
                        order.addBook(book.getAttribute('data-book'));
                    }
                } else {
                    window.alert("You can borrow maximum 3 books...");
                }
                order.storeSelected();
                viewLogic.showBooks('checkout', order.getOrder());
            });
    });

    document.getElementById('btn-history').addEventListener('click',
        () => {
            viewLogic.clearButtons();
            document.getElementById('btn-history').classList.add('active');
            viewLogic.showHistory();
        });

    document.getElementById('btn-return').addEventListener('click',
        () => {
            viewLogic.clearButtons();
            document.getElementById('btn-return').classList.add('active');
            viewLogic.showReturn();
        });

    document.getElementById('btn-checkout').addEventListener('click',
        () => {
            viewLogic.clearButtons();
            document.getElementById('btn-checkout').classList.add('active');
            viewLogic.showCheckout();
        });

    document.getElementById('btn-order').addEventListener('click', () => {
        if (order.isAvailableToBorrow()) {
            const listBooks = order.getOrder();
            if (listBooks.length) {
                order.setAvailableToBorrow(false);
                order.saveOrder(listBooks);
                Inventory.getFromInventory(listBooks);
                order.reset();
                Inventory.checkInventory();
                const lastHistory = order.getHistory();
                viewLogic.showHistoryList(lastHistory);
                window.alert('Thank you for borrowing books from us!');
            }
        } else {
            window.alert('You need to return borrowed books first.');
        }
    });

    document.getElementById('btn-return-books').addEventListener('click', () => {
        if (!order.isAvailableToBorrow()) {
            const history = order.getHistory();
            if (history && history.listBooks) {
                Inventory.addToInventory(history.listBooks);
                Inventory.checkInventory();
                order.setAvailableToBorrow(true);
                viewLogic.showBooks('return', []);
                order.saveOrder(history.listBooks);
                const lastHistory = order.getHistory();
                viewLogic.showHistoryList(lastHistory);
                window.alert('Thank you. Now you can borrow others books.');
            }
        }
    });

};


export default {
    initialize: initialize

};
