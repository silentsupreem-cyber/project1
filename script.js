
function formatNaira(amount) {
    return '₦' + amount.toLocaleString();
}


function updateTotal() {
    let grandTotal = 0;
    document.querySelectorAll('.product-card').forEach(card => {
        const price = parseInt(card.dataset.price);
        const qty = parseInt(card.querySelector('.qty-display').textContent);
        grandTotal += price * qty;
    });
    document.getElementById('grand-total').textContent = formatNaira(grandTotal);
}


document.querySelectorAll('.product-card').forEach(card => {
    const price = parseInt(card.dataset.price);
    const qtyDisplay = card.querySelector('.qty-display');
    const itemTotal = card.querySelector('.item-total');
    const plusBtn = card.querySelector('.plus');
    const minusBtn = card.querySelector('.minus');
    
    let qty = 0;

    plusBtn.addEventListener('click', () => {
        qty++;
        qtyDisplay.textContent = qty;
        itemTotal.textContent = formatNaira(price * qty);
        updateTotal();
    });

    minusBtn.addEventListener('click', () => {
        if (qty > 0) {
            qty--;
            qtyDisplay.textContent = qty;
            itemTotal.textContent = formatNaira(price * qty);
            updateTotal();
        }
    });
});


function placeOrder() {
    const items = [];
    document.querySelectorAll('.product-card').forEach(card => {
        const name = card.querySelector('.product-name').textContent;
        const qty = parseInt(card.querySelector('.qty-display').textContent);
        const price = parseInt(card.dataset.price);
        if (qty > 0) {
            items.push(`${name} × ${qty} = ${formatNaira(price * qty)}`);
        }
    });

    if (items.length === 0) {
        alert('🛒 Your cart is empty! Add some items first.');
        return;
    }

    const total = document.getElementById('grand-total').textContent;
    const orderText = `🌿 NEW ORDER - SUCCESSFUL WELLNESS HERBS 🌿\n\n${items.join('\n')}\n\n----------------------------------------\nTOTAL: ${total}\n\nThank you for your order! ✅`;
    
    alert(orderText);
}