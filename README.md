# SplitWyus

## Python Essentials Course Project

SplitWyus is a Python and Flask-based web application designed to simplify the settlement of shared expenses among friends.

When multiple people in a group pay for different expenses, several people may end up owing money to one another. Instead of settling every individual transaction separately, SplitWyus calculates the net amount each person owes or should receive and generates a simplified set of transactions.

The main objective of SplitWyus is to **clear all outstanding balances using a minimal number of transactions**, making expense settlement easier and more efficient among friends.

---

## Problem Statement

When friends share expenses, different people may pay for different items. This can create multiple outstanding payments between members of the group.

For example:

```text
A owes B ₹500
B owes C ₹300
C owes A ₹200
```

Handling every transaction separately can become complicated.

SplitWyus simplifies the process by calculating the net balance of each person and determining how the debts can be settled using fewer transactions.

---

## Objectives

- Calculate the net balance of each person in a group.
- Identify who needs to pay and who needs to receive money.
- Simplify multiple outstanding debts.
- Minimize the number of transactions required to settle the group.
- Provide the results through a simple web interface.
- Apply Python programming and algorithmic concepts to a practical problem.
- Use Flask to connect the Python backend with the web interface.

---

## Features

- Add and process transactions between friends.
- Calculate the net balance of each participant.
- Separate participants into debtors and creditors.
- Generate simplified settlement transactions.
- Reduce unnecessary transactions.
- Display the final settlement clearly.
- Flask-based web interface.
- Input validation for invalid transaction details.

---

## Technologies Used

- **Python** – Core programming and transaction-settlement logic
- **Flask** – Web framework and backend
- **HTML** – Structure of the web interface
- **CSS** – Styling and layout
- **Git & GitHub** – Version control and project submission

---

## How SplitWyus Works

The application follows these general steps:

```text
Enter Participants
        ↓
Enter Transactions
        ↓
Calculate Net Balances
        ↓
Separate Debtors & Creditors
        ↓
Match Debtors with Creditors
        ↓
Generate Simplified Transactions
        ↓
Display Final Settlement
```

---

## Example

Suppose three friends have the following transactions:

```text
A pays B ₹500
B pays C ₹300
C pays A ₹200
```

SplitWyus processes these transactions and calculates the net balance of each person.

The application then determines the payments required to settle the balances instead of asking the users to process every original transaction separately.

The final output contains only the transactions necessary to clear the outstanding balances.

---

## Core Algorithm

SplitWyus uses a net-balance approach.

For every transaction:

```text
Payer → Receiver : Amount
```

the payer's balance is reduced by the amount and the receiver's balance is increased by the same amount.

After processing all transactions:

```text
Positive balance → Person should receive money
Negative balance → Person needs to pay money
```

The application then matches people who need to pay with people who need to receive money and generates settlement transactions.

The process continues until all balances are settled.

---

## Python Concepts Used

The project applies several Python concepts:

- Variables
- Data types
- Lists
- Dictionaries
- Functions
- Loops
- Conditional statements
- Arithmetic operators
- Input validation
- Type conversion
- String formatting
- Flask routes
- Form handling
- Algorithmic problem solving

---

## Project Structure

```text
splitwise/
├── .gitignore
├── app.py
├── README.md
├── requirements.txt
├── settlement.py
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── templates/
        └── index.html
```

---

## Requirements

The following are required to run SplitWyus:

- Python 3.x
- pip
- Flask
- Web browser
- Git (for cloning the repository)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/parnasha2/SplitWyus
```

### 2. Open the project directory

```bash
cd SplitWyus
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

---

## Running the Application

Run the Flask application using:

```bash
python app.py
```

Flask will provide a local address in the terminal, usually:

```text
http://127.0.0.1:5000/
```

Open this address in a web browser to use SplitWyus.

---

## Usage

1. Open SplitWyus.
2. Enter the number of participants.
3. Enter the participants' names.
4. Enter the expenses/transactions.
5. Submit the information.
6. SplitWyus calculates the net balance of each participant.
7. The application generates the simplified settlement transactions.
8. Follow the displayed transactions to clear the group's outstanding balances.

---

## Input Validation

The application should handle invalid inputs such as:

- Empty participant names
- Invalid transaction amounts
- Negative or zero transaction values where not allowed
- Transactions involving unknown participants
- Incomplete transaction details
- Invalid number of participants

---

## Testing

| Test Case                  | Input                                | Expected Result                 |
| -------------------------- | ------------------------------------ | ------------------------------- |
| Simple transaction         | A pays B ₹500                        | B receives ₹500 from A          |
| Multiple transactions      | Several transactions among 3+ people | Net balances calculated         |
| Circular transactions      | A → B, B → C, C → A                  | Transactions simplified         |
| Multiple creditors/debtors | Several positive/negative balances   | Simplified settlement generated |
| Invalid amount             | Non-numeric amount                   | Validation message              |
| Unknown participant        | Transaction contains unknown name    | Validation message              |
| Empty input                | Missing required fields              | Validation message              |

---

## Advantages

- Reduces the number of payments required among friends.
- Avoids manually calculating multiple debts.
- Makes group expense settlement easier to understand.
- Automates repetitive calculations.
- Demonstrates practical use of Python algorithms.

---

## Future Enhancements

Possible future improvements include:

- Unequal expense splitting
- Automatic expense categorization
- Expense history
- Database storage
- User accounts
- Exporting settlement results
- Sharing settlement results with friends
- Mobile-friendly interface
- More advanced transaction-minimization algorithms

---

## Author

**Name:** Parnasha Majumder
**Course:** Python Essentials
**Institution:** VIT Bhopal University
**Project:** SplitWyus

---

## License

This project was developed as part of the Python Essentials course for educational purposes.
