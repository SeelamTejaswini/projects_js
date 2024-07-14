
document.getElementById('add-transaction').addEventListener('click', function() {
    // Get input values
    const transactionName = document.getElementById('transaction-name').value;
    const transactionAmount = document.getElementById('transaction-amount').value;
    const transactionType = document.getElementById('transaction-type').value;

    if (transactionName === '' || transactionAmount === '') {
        alert('Please enter both name and amount.');
        return;
    }

    // Add new transaction to list
    const transactionList = document.getElementById('transaction-list');
    const li = document.createElement('li');
    li.classList.add(transactionType);
    li.innerHTML = `${transactionName} - $${transactionAmount} <button class="delete-transaction">X</button>`;
    transactionList.appendChild(li);

    // Update totals
    updateTotals();

    // Clear input fields
    document.getElementById('transaction-name').value = '';
    document.getElementById('transaction-amount').value = '';

    // Delete transaction
    li.querySelector('.delete-transaction').addEventListener('click', function() {
        li.remove();
        updateTotals();
    });
});

function updateTotals() {
    const transactions = document.querySelectorAll('#transaction-list li');
    let totalExpenses = 0;
    let totalIncome = 0;

    transactions.forEach(transaction => {
        const amount = parseFloat(transaction.innerText.split(' - $')[1].split(' ')[0]);
        if (transaction.classList.contains('expense')) {
            totalExpenses += amount;
        } else if (transaction.classList.contains('income')) {
            totalIncome += amount;
        }
    });

    const balance = totalIncome - totalExpenses;

    document.getElementById('total-expenses').innerText = totalExpenses.toFixed(2);
    document.getElementById('total-income').innerText = totalIncome.toFixed(2);
    document.getElementById('balance').innerText = balance.toFixed(2);
}
