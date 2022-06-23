class Calculator {
    
    constructor (prevTextElement, currentTextElement) {
        this.prevTextElement = prevTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    } 

    clear() {
        this.current = ''
        this.prev = ''
        this.operation = undefined
    }

    delete() {
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' &&  this.current.includes('.')) return
            this.current = this.current.toString()  + number.toString()
    }

    chooseOperation(operation) {
        if (this.current === '') return
        if (this.prev !== '' ) {
            this.compute()
        }
        this.operation = operation
        this.prev = this.current
        this.current = ''
    }

    compute() {
        let compute
        const prev = parseFloat(this.prev)
        const current = parseFloat(this.current)

        if (isNaN(prev)|| isNaN(current)) return
        switch (this.operation) {
            case '+':
                compute = prev + current
                break
            
            case '-':
                compute = prev - current
                break
            
            case '*':
                compute = prev * current
                break
            
            case '÷':
                compute = prev / current
                break

            default:
                return
            
        }

        this.current = compute
        this.operation = undefined
        this.prev = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
       let integerDisplay
       if (isNaN(integerDigits)){
           integerDisplay = ''
       } else {
           integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
       }
       if(decimalDigits != null){
           return `${integerDisplay}.${decimalDigits}`
       }else{
           return integerDisplay
       }
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.getDisplayNumber(this.current)
        if(this.operation != null) {
            this.prevTextElement.innerText = `${this.getDisplayNumber(this.prev)} ${this.operation}`  
        }else {
            this.prevTextElement.innerText = ''
        }
    }
}


const numbButtons = document.querySelectorAll ('[data-number]')
const operateButtons = document.querySelectorAll ('[data-operation]')
const equalButton = document.querySelector ('[data-equals]')
const delButton = document.querySelector ('[data-delete]')
const allClearButton = document.querySelector ('[data-all-clear]')
const prevTextElement = document.querySelector ('[data-prev]')
const currentTextElement = document.querySelector ('[data-current]')

const calculator = new Calculator(prevTextElement,currentTextElement)

numbButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operateButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})