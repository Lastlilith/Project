'use strict';

let startBtn = document.getElementById('start');
let budget = document.getElementsByClassName('budget-value')[0];
let dayBudget = document.getElementsByClassName('daybudget-value')[0];
let levelBudget = document.getElementsByClassName('level-value')[0];
let expenses = document.getElementsByClassName('expenses-value')[0];
let optionalExpenses = document.getElementsByClassName('optionalexpenses-value')[0];
let incomeVal = document.getElementsByClassName('income-value')[0];
let monthSavings = document.getElementsByClassName('monthsavings-value')[0];
let yearSavings = document.getElementsByClassName('yearsavings-value')[0];

let expensesItem = document.getElementsByClassName('expenses-item');

let expensesBtn = document.getElementsByTagName('button')[0];
let optionalExpensesBtn = document.getElementsByTagName('button')[1];

let countingBtn = document.getElementsByTagName('button')[2];
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');

let incomeItem = document.querySelector('.choose-income');
let checkSavings = document.querySelector('#savings');
let sumVal = document.querySelector('.choose-sum');
let percentVal = document.querySelector('.choose-percent');
let yearVal = document.querySelector('.year-value');
let monthVal = document.querySelector('.month-value');
let dayVal = document.querySelector('.day-value');

let money;
let time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countingBtn.disabled = true;


startBtn.addEventListener('click', function(){
    time = prompt('Введите дату в формате YYYY-MM-DD',"");
    money = +prompt("Ваш бюджет на месяц?", '');


    while( isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    appData.budjet = money;
    appData.timeData = time;
    budget.textContent = money.toFixed();
    yearVal.value = new Date(Date.parse(time)).getFullYear();
    monthVal.value = new Date(Date.parse(time)).getMonth() + 1;
    dayVal.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countingBtn.disabled = false;
});

expensesBtn.addEventListener('click', function(){
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        if ((typeof(a)) === 'string' && typeof(a) != null && typeof(b) != null && 
        a != '' && b != '' && a.length < 50) {
            console.log('Все верно');
            appData.expenses[a] = b;
            sum += +b;
        } else {
            console.log('Неверный результат');
            i--;
        }   
    }
    expenses.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function(){
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let question = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = question;
        optionalExpenses.textContent += appData.optionalExpenses[i] + ' ';
    }
})

countingBtn.addEventListener('click', function(){
    if (appData.budjet != undefined) {
        appData.moneyPerDay = ((+appData.budjet - +expenses.textContent)/30).toFixed();
        dayBudget.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelBudget.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelBudget.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            levelBudget.textContent = 'Высокий уровень достатка';
        } else {
            levelBudget.textContent = 'Произошла ошибка';
        }
    } else {
        dayBudget.textContent = ' Произошла ошибка';
    }
});

incomeItem.addEventListener('change', function () {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeVal.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumVal.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumVal.value,
            percent = +percentVal.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});

percentVal.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumVal.value,
        percent = +percentVal.value;

    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;

    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed(1); 
    }
});


let appData = {
    budjet : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false,
};

