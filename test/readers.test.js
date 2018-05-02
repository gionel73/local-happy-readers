describe('Happy Readers', function () {

    
    it('should not allow to borrow more than 3 books', function () {
        const listBooks = ["Pride and Prejudice", "Fairy Tales", "Moby Dick", "Hunger"];
        order.setListBooks(listBooks);
        const testValid = order.isValidOrder();
        expect(testValid).toBe(false);
    });
    
    it('should allow to borrow maximum 3 books', function () {
        const listBooks = ["Pride and Prejudice", "Fairy Tales", "Moby Dick"];
        order.setListBooks(listBooks);
        const testValid = order.isValidOrder();
        expect(testValid).toBe(true);
    });
    
    it('you can only borrow new books when all others have been returned', function () {
        order.setAvailableToBorrow = false;
        const testValid = order.isAvailableToBorrow();        
        expect(testValid).toBe(false);
    });

        
});
