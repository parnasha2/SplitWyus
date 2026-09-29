"""
settlement.py - Simple Greedy Debt Settlement Algorithm
College Project: 1st Year Mini Project
"""

def calculate_net_balances(people, transactions):
    """
    Step 1: Calculate net balance for each person.
    Formula: net = total_paid - total_owed
    """
    net_balances = {person: 0.0 for person in people}
    
    for tx in transactions:
        payer = tx['payer']
        amount = float(tx['amount'])
        
        # In a simple split, expense is divided equally among all people
        split_among = tx.get('split_among', people)
        if not split_among:
            split_among = people
            
        share = amount / len(split_among)
        
        # Payer gets credit (+)
        net_balances[payer] += amount
        
        # Everyone sharing the expense owes their share (-)
        for person in split_among:
            net_balances[person] -= share

    # Round to 2 decimal places
    for person in net_balances:
        net_balances[person] = round(net_balances[person], 2)
        
    return net_balances


def optimize_debts(net_balances):
    """
    Step 2: Match the largest creditor with the largest debtor until all nets are 0.
    """
    # Create a working copy of balances
    balances = net_balances.copy()
    settlements = []
    
    while True:
        # Find largest creditor (max net balance > 0)
        creditor = max(balances, key=balances.get)
        max_credit = balances[creditor]
        
        # Find largest debtor (min net balance < 0)
        debtor = min(balances, key=balances.get)
        max_debt = balances[debtor]
        
        # If max credit and max debt are virtually zero, everyone is settled
        if round(max_credit, 2) <= 0 or round(max_debt, 2) >= 0:
            break
            
        # Amount to settle is the minimum of debtor's debt and creditor's credit
        settle_amount = round(min(max_credit, -max_debt), 2)
        
        if settle_amount <= 0:
            break
            
        # Record settlement transaction
        settlements.append({
            'debtor': debtor,
            'creditor': creditor,
            'amount': settle_amount
        })
        
        # Update net balances
        balances[creditor] = round(balances[creditor] - settle_amount, 2)
        balances[debtor] = round(balances[debtor] + settle_amount, 2)
        
    return settlements
