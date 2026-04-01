class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement, historyListElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.historyListElement = historyListElement;
        this.history = [];
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
            return;
        }
        if (this.shouldResetScreen) {
            this.currentOperand = number.toString();
            this.shouldResetScreen = false;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === 'Error') return;
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
            case '-':
                computation = prev - current;
                break;
            case '×':
            case '*':
                computation = prev * current;
                break;
            case '÷':
            case '/':
                if (current === 0) {
                    this.currentOperand = 'Error';
                    this.operation = undefined;
                    this.previousOperand = '';
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Fix floating point errors
        computation = Math.round(computation * 100000000) / 100000000;

        const equation = `${this.getDisplayNumber(prev)} ${this.operation} ${this.getDisplayNumber(current)}`;
        this.addToHistory(equation, computation);

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    getDisplayNumber(number) {
        if (number === 'Error') return number;
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else if (integerDigits === 0 && stringNumber === '-') {
             return '-0'; // Edge case
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    addToHistory(equation, result) {
        this.history.unshift({ equation, result: this.getDisplayNumber(result) });
        this.renderHistory();
    }

    clearHistory() {
        this.history = [];
        this.renderHistory();
    }

    renderHistory() {
        this.historyListElement.innerHTML = '';
        if (this.history.length === 0) {
            this.historyListElement.innerHTML = '<div class="history-empty">There\'s no history yet</div>';
            return;
        }

        this.history.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('history-item');
            
            const eqDiv = document.createElement('div');
            eqDiv.classList.add('history-item-equation');
            eqDiv.innerText = item.equation + ' =';

            const resDiv = document.createElement('div');
            resDiv.classList.add('history-item-result');
            resDiv.innerText = item.result;

            li.appendChild(eqDiv);
            li.appendChild(resDiv);
            this.historyListElement.appendChild(li);
        });
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.getElementById('btn-equals');
const deleteButton = document.getElementById('btn-delete');
const allClearButton = document.getElementById('btn-clear');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const historyListElement = document.getElementById('history-list');
const btnClearHistory = document.getElementById('btn-clear-history');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, historyListElement);
calculator.renderHistory();

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
        
        // Remove active class from operations
        operationButtons.forEach(btn => btn.classList.remove('active'));
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operation);
        calculator.updateDisplay();
        
        // Visual indicator for active operation
        operationButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
    operationButtons.forEach(btn => btn.classList.remove('active'));
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
    operationButtons.forEach(btn => btn.classList.remove('active'));
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

btnClearHistory.addEventListener('click', () => {
    calculator.clearHistory();
});

// Keyboard support
document.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9 || e.key === '.') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        let op = e.key;
        if (op === '*') op = '×';
        if (op === '/') op = '÷';
        if (op === '-') op = '−';
        calculator.chooseOperation(op);
        calculator.updateDisplay();
    }
});
