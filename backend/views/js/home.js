const greeting = document.querySelector('.greeting');

window.onload = () => {
    if(!sessionStorage.name){
        location.href = '/login';
    } else{
        greeting.innerHTML = `${sessionStorage.name}`;
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}

const select = document.querySelector('#category');
const otherCategory = document.querySelector('#new-category-container');

select.addEventListener('change', () => {
    if (select.value === 'Other') {
        otherCategory.style.display = 'block';
    } else {
        otherCategory.style.display = 'none';
    }
});

const incomeSum = document.getElementById('income-sum');

fetch('get-incomes')
  .then(response => response.json())
  .then(data => {
    const sum = data.reduce((acc, income) => acc + income.amount, 0);
    const sumDiv = document.createElement('div');
    sumDiv.textContent = `$${sum}`;
    incomeSum.appendChild(sumDiv);

    
  })
  .catch(error => console.error(error));

  const expenseSum = document.getElementById('expense-sum');

fetch('get-expenses')
  .then(response => response.json())
  .then(data => {
    const sum = data.reduce((acc, expense) => acc + expense.amount, 0);
    const sumDiv = document.createElement('div');
    sumDiv.textContent = `$${sum}`;
    expenseSum.appendChild(sumDiv);

    
  })
  .catch(error => console.error(error));

const allBalance = document.getElementById('all-balance');

Promise.all([fetch('get-expenses'), fetch('get-incomes')])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
        const expenses = data[0];
        const incomes = data[1];

        const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
        const balance = totalIncomes - totalExpenses;

        const balanceDiv = document.createElement('div');
        balanceDiv.textContent = `$${balance}`;
        allBalance.appendChild(balanceDiv);
    })
    .catch(error => console.error(error));

const List = document.getElementById('list');

function renderMoneyList(moneys) {
    List.innerHTML = '';
    moneys.forEach(money => {
        const tr = document.createElement('tr');

        const titleTd = document.createElement('td');
        titleTd.textContent = money.title;
        tr.appendChild(titleTd);

        const amountTd = document.createElement('td');
        amountTd.textContent = money.amount;
        tr.appendChild(amountTd);

        const categoryTd = document.createElement('td');
        categoryTd.textContent = money.category;
        tr.appendChild(categoryTd);

        const descriptionTd = document.createElement('td');
        descriptionTd.textContent = money.description;
        tr.appendChild(descriptionTd)

        List.appendChild(tr);
    });
}
function getMoneyAndRender() {
    fetch('get-money')
        .then(response => response.json())
        .then(data => {
            renderMoneyList(data);
        })
        .catch(error => console.error(error));
}

getMoneyAndRender();

