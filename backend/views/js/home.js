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

const moneyList = document.getElementById('money-list');

fetch('get-incomes')
    .then(response => response.json())
    .then(data => {
        data.forEach(expense => {
            const tr = document.createElement('tr');

            const titleTd = document.createElement('td');
            titleTd.textContent = expense.title;
            tr.appendChild(titleTd);

            const typeTd = document.createElement('td');
            typeTd.textContent = expense.type;
            tr.appendChild(typeTd);

            const amountTd = document.createElement('td');
            amountTd.textContent = expense.amount;
            tr.appendChild(amountTd);

            const categoryTd = document.createElement('td');
            categoryTd.textContent = expense.category;
            tr.appendChild(categoryTd);

            const descriptionTd = document.createElement('td');
            descriptionTd.textContent = expense.description;
            tr.appendChild(descriptionTd);

            moneyList.appendChild(tr);
        });
    })
    .catch(error => console.error(error));

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

