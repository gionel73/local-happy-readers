import order from './order';
import moment from 'moment';

const viewLogic = {};

viewLogic.setBookSelected = (book) => {
    const item = document.querySelector('.book[data-book="' + book + '"]');
    if (!item.classList.contains('selected')) {
        item.classList.add('selected');
    }
}

viewLogic.showBooks = (myNode, arrayBooks) => {
    viewLogic.emptyNode(document.getElementById(myNode));
    for (const book of arrayBooks) {
        const html = `<div style="font-size: 1.1em">${book}</div>`;
        document.getElementById(myNode).insertAdjacentHTML('beforeend', html);
    }
}

viewLogic.showHistoryList = (itemHistory) => {
    let str = '';
    for (let book of itemHistory.listBooks) {
        str += book + ', ';
    }
    let html = itemHistory.availableToBorrow ? `<br /><div>You returned ${str} ${moment(itemHistory.created).fromNow()}...</div>` : `<br /><div>You borrowed ${str} ${moment(itemHistory.created).fromNow()}...</div>`;
    document.getElementById('history-list').insertAdjacentHTML('beforeend', html);
}

viewLogic.showCheckout = () => {
    document.getElementById("info-history").style.display = "none";
    document.getElementById("info-return").style.display = "none";
    document.getElementById("info-checkout").style.display = "block";
    viewLogic.showBooks('checkout', order.getOrder());
    order.checkTime();
}

viewLogic.showHistory = () => {
    document.getElementById("info-checkout").style.display = "none";
    document.getElementById("info-return").style.display = "none";
    document.getElementById("info-history").style.display = "block";
    const history = order.getHistory();
    if (history && history.listBooks) {
        viewLogic.showBooks('history', history.listBooks);
        let html = order.isAvailableToBorrow() ? `<br /><div>You returned ${moment(history.created).fromNow()}...</div>` : `<br /><div>You borrowed ${moment(history.created).fromNow()}...</div><div>Return date:   ${moment(history.dueDate).format("MMMM Do YYYY")}</div>`;
        document.getElementById('history').insertAdjacentHTML('beforeend', html);
    }
}

viewLogic.showReturn = () => {
    document.getElementById("info-checkout").style.display = "none";
    document.getElementById("info-history").style.display = "none";
    document.getElementById("info-return").style.display = "block";
    if (!order.isAvailableToBorrow()) {
        const history = order.getHistory();
        if (history && history.listBooks) {
            viewLogic.showBooks('return', history.listBooks);
        }
    } else {
        viewLogic.emptyNode(document.getElementById('return'));
        const html = `<br /><div>You have no books to return...</div> `;
        document.getElementById('return').insertAdjacentHTML('beforeend', html);
    }
}

viewLogic.setAvailableBooks = (book, mode) => {
    switch (mode) {
        case 'in':
            document.querySelector('.book-img[data-img="' + book + '"]').classList.remove(`${book.toLowerCase().replace(/\s+/g, "-")}-bw`);
            document.querySelector('.book-img[data-img="' + book + '"]').classList.add(`${book.toLowerCase().replace(/\s+/g, "-")}`);
            break;
        case 'out':
            document.querySelector('.book-img[data-img="' + book + '"]').classList.remove(`${book.toLowerCase().replace(/\s+/g, "-")}`);
            document.querySelector('.book-img[data-img="' + book + '"]').classList.add(`${book.toLowerCase().replace(/\s+/g, "-")}-bw`);
            break;
    }
}

viewLogic.emptyNode = (myNode) => {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

viewLogic.clearButtons = () => {
    document.querySelectorAll('.btn').forEach((button) => {
        button.classList.remove('active');
    });
}

export default viewLogic;
