
let people = ["Alice", "Bob", "Charlie"];
let transactions = [];

// DOM References
const numPeopleSelect = document.getElementById("numPeople");
const namesContainer = document.getElementById("namesContainer");
const payerSelect = document.getElementById("payerSelect");
const descInput = document.getElementById("descInput");
const amountInput = document.getElementById("amountInput");
const txTableBody = document.getElementById("txTableBody");
const resultsBox = document.getElementById("resultsBox");
const balancesTableBody = document.getElementById("balancesTableBody");
const settlementsList = document.getElementById("settlementsList");

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    renderPeopleInputs();
    updatePayerDropdown();
});

// Update participant count
function onPeopleCountChange() {
    const count = parseInt(numPeopleSelect.value);
    
    // Adjust people array
    const defaultNames = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank"];
    while (people.length < count) {
        people.push(defaultNames[people.length] || `Person ${people.length + 1}`);
    }
    people = people.slice(0, count);

    renderPeopleInputs();
    updatePayerDropdown();
}

// Render dynamic input boxes for names
function renderPeopleInputs() {
    namesContainer.innerHTML = "";
    people.forEach((name, index) => {
        const div = document.createElement("div");
        div.className = "form-group";
        div.innerHTML = `
            <label>Person ${index + 1} Name:</label>
            <input type="text" class="name-input" data-index="${index}" value="${name}" required />
        `;
        namesContainer.appendChild(div);
    });

    // Add listeners to name inputs
    document.querySelectorAll(".name-input").forEach(input => {
        input.addEventListener("input", (e) => {
            const idx = parseInt(e.target.dataset.index);
            people[idx] = e.target.value.trim() || `Person ${idx + 1}`;
            updatePayerDropdown();
        });
    });
}

// Update Payer dropdown options
function updatePayerDropdown() {
    payerSelect.innerHTML = "";
    people.forEach(person => {
        const option = document.createElement("option");
        option.value = person;
        option.textContent = person;
        payerSelect.appendChild(option);
    });
}

// Add a transaction
function addTransaction(e) {
    e.preventDefault();
    const desc = descInput.value.trim() || `Expense #${transactions.length + 1}`;
    const payer = payerSelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount greater than 0.");
        return;
    }

    transactions.push({
        description: desc,
        payer: payer,
        amount: amount,
        split_among: [...people] // Split equally among all members
    });

    renderTransactionsTable();
    descInput.value = "";
    amountInput.value = "";
    descInput.focus();
}

// Render the list of added transactions
function renderTransactionsTable() {
    txTableBody.innerHTML = "";
    if (transactions.length === 0) {
        txTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #888;">No transactions added yet.</td></tr>';
        return;
    }

    transactions.forEach((tx, idx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tx.description}</td>
            <td><strong>${tx.payer}</strong></td>
            <td>₹${tx.amount.toFixed(2)}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteTransaction(${idx})">Delete</button></td>
        `;
        txTableBody.appendChild(row);
    });
}

// Delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    renderTransactionsTable();
}

// Call Flask backend to optimize transactions
async function optimizeTransactions() {
    if (transactions.length === 0) {
        alert("Please add at least one transaction before optimizing.");
        return;
    }

    try {
        const res = await fetch("/optimize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                people: people,
                transactions: transactions
            })
        });

        const data = await res.json();
        if (!data.success) {
            alert(data.error || "Optimization failed.");
            return;
        }

        displayResults(data.net_balances, data.settlements);
    } catch (err) {
        alert("Error connecting to server.");
        console.error(err);
    }
}

// Display Net Balances and Final Settlements
function displayResults(netBalances, settlements) {
    // 1. Render Net Balances Table
    balancesTableBody.innerHTML = "";
    for (const [person, net] of Object.entries(netBalances)) {
        const row = document.createElement("tr");
        let status = "";
        if (net > 0) {
            status = `<span class="badge-green">+₹${net.toFixed(2)} (Gets Back)</span>`;
        } else if (net < 0) {
            status = `<span class="badge-red">-₹${Math.abs(net).toFixed(2)} (Owes)</span>`;
        } else {
            status = `<span class="badge-gray">₹0.00 (Settled)</span>`;
        }

        row.innerHTML = `
            <td><strong>${person}</strong></td>
            <td>${status}</td>
        `;
        balancesTableBody.appendChild(row);
    }

    // 2. Render Optimized Settlements List
    settlementsList.innerHTML = "";
    if (settlements.length === 0) {
        settlementsList.innerHTML = '<li class="settlement-item" style="background:#f1f3f4; color:#333;">All balances are already 0. No transfers needed!</li>';
    } else {
        settlements.forEach(s => {
            const li = document.createElement("li");
            li.className = "settlement-item";
            li.innerHTML = `<strong>${s.debtor}</strong> pays <strong>${s.creditor}</strong>: <strong>₹${s.amount.toFixed(2)}</strong>`;
            settlementsList.appendChild(li);
        });
    }

    resultsBox.style.display = "block";
    resultsBox.scrollIntoView({ behavior: "smooth" });
}

// Reset everything
function resetAll() {
    transactions = [];
    people = ["Alice", "Bob", "Charlie"];
    numPeopleSelect.value = "3";
    renderPeopleInputs();
    updatePayerDropdown();
    renderTransactionsTable();
    resultsBox.style.display = "none";
}
