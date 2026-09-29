from flask import Flask, render_template, request, jsonify
from settlement import calculate_net_balances, optimize_debts

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/optimize', methods=['POST'])
def optimize():
    try:
        data = request.get_json()
        people = [p.strip() for p in data.get('people', []) if p.strip()]
        
        # Validation for 1st year project requirements
        if len(people) < 2:
            return jsonify({'success': False, 'error': 'Enter at least 2 people.'}), 400
        if len(people) > 6:
            return jsonify({'success': False, 'error': 'Maximum 6 people allowed.'}), 400
        if len(people) != len(set(people)):
            return jsonify({'success': False, 'error': 'All names must be unique.'}), 400

        transactions = data.get('transactions', [])
        if not transactions:
            return jsonify({'success': False, 'error': 'Add at least one transaction.'}), 400

        # Step 1: Calculate Net Balance (net = paid - owed)
        net_balances = calculate_net_balances(people, transactions)
        
        # Step 2: Match Largest Creditor with Largest Debtor
        settlements = optimize_debts(net_balances)
        
        return jsonify({
            'success': True,
            'people': people,
            'net_balances': net_balances,
            'settlements': settlements
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
