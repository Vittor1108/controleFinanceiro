class ExpensesCalc{

    constructor(){

        this.ulTransactionsEl = document.querySelector('#transactions');
        this.balenceEl = document.querySelector("#balance");
        this.expensesEl = document.querySelector("#money-minus");
        this.revenusEl = document.querySelector('#money-plus');
        this.btnAddTaskEl = document.querySelector('.btn');
        this.nameInputEl = document.querySelector('#text');
        this.amountInputEl = document.querySelector('#amount');

        this.addEventOnBtnAddTask();
    }

    addTransactionsInDOOM(element){
        const operator = element.value > 0 ? '+' : '-';
        const classAdd = operator === '-' ? 'minus' : 'plus';
        const li = document.createElement('li');
        li.classList.add(classAdd);
        li.innerHTML = `${element.name} <span>${operator} R${Math.abs(element.value)}</span><button class="delete-btn" id=" ${element.id}">x</button>`;
        this.ulTransactionsEl.append(li);
    }

    initAddTransactionsInDoom(array){
        array.forEach(element => {
            this.addTransactionsInDOOM(element);
       });
    }

    currentBalence(element){
        const salaryAccount = dummyTransactions.reduce((acumulator, element)=>{return acumulator+= element.value},0);
        element.innerHTML = `R$${salaryAccount.toFixed(2)}`;
    }

    calcExpenses(element){
        const expenses = dummyTransactions.filter(element => element.value < 0);
        const calcExpenses = expenses.reduce((acumulator, element)=>{ return acumulator += element.value},0);
        element.innerHTML = `R$${calcExpenses}`;
    }

    calcRevenus(element){
        const expenses = dummyTransactions.filter(element => element.value > 0);
        const calcExpenses = expenses.reduce((acumulator, element)=>{ return acumulator += element.value},0);
        element.innerHTML = `R$${calcExpenses}`;
    }

    deleteBtn(){
        const deleteBtns = document.querySelectorAll('.delete-btn');
        deleteBtns.forEach((element, indice)=>{
            element.addEventListener('click', event =>{
                event.target.parentNode.remove();
                dummyTransactions = this.removeElementArray(dummyTransactions, "id", Number(event.target.id));
                this.currentBalence(this.balenceEl);
                this.calcExpenses(this.expensesEl);
                this.calcRevenus(this.revenusEl);
                console.log(dummyTransactions);
            })
        })
    }
    
    removeElementArray(arr, prop, value){
        return arr.filter(function(i) { return i[prop] !== value; });
    }

    addEventOnBtnAddTask(){
        let i = 0;
        this.btnAddTaskEl.addEventListener('click', e =>{
            e.preventDefault();
            if(this.validationForm()) return;
            this.addTransactionInArray(i);
            this.addTransactionsInDOOM(dummyTransactions[dummyTransactions.length - 1]);
            this.calcExpenses(this.expensesEl);
            this.calcRevenus(this.revenusEl);
            this.currentBalence(this.balenceEl);
            this.deleteBtn();
            console.log(dummyTransactions);
            i++;
        })
    }

    creatObject(id, name, value){
        return {
            id: Number(id),
            name: name,
            value: Number(value)
        }
    }

    validationForm(){
        if(this.nameInputEl.value === '' || this.amountInputEl.value === ''){
            alert('Por favor insira os valores')
            return true;
        }
    }

    addTransactionInArray(i){
        const transaction = this.creatObject(i, this.nameInputEl.value, this.amountInputEl.value);
        dummyTransactions.push(transaction);
    }

}

const expensesCalc = new ExpensesCalc();