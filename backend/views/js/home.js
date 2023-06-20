const greeting = document.querySelector('.greeting');

window.onload = () => {
    if (!sessionStorage.name) {
        location.href = '/login';
    } else {
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

        const dateTd = document.createElement('td');
        const date = new Date(money.date);
        dateTd.textContent = date.toLocaleDateString();
        tr.appendChild(dateTd);

        const titleTd = document.createElement('td');
        titleTd.textContent = money.title;
        tr.appendChild(titleTd);

        const categoryTd = document.createElement('td');
        categoryTd.textContent = money.category;
        tr.appendChild(categoryTd);

        const amountTd = document.createElement('td');
        amountTd.textContent = `$${money.amount}`;
        tr.appendChild(amountTd);

        List.appendChild(tr);
    });
}

function sortTable() {
    const rows = Array.from(List.getElementsByTagName('tr'));
    rows.sort((a, b) => {
        const aAmount = parseFloat(a.lastElementChild.textContent.replace('$', ''));
        const bAmount = parseFloat(b.lastElementChild.textContent.replace('$', ''));
        return aAmount - bAmount;
    });

    rows.forEach(row => {
        List.appendChild(row);
    });
}

function sortTable1() {
    const rows = Array.from(List.getElementsByTagName('tr'));
    rows.sort((a, b) => {
        const aAmount = parseFloat(a.lastElementChild.textContent.replace('$', ''));
        const bAmount = parseFloat(b.lastElementChild.textContent.replace('$', ''));
        return bAmount - aAmount;
    });

    rows.forEach(row => {
        List.appendChild(row);
    });
}

function sortTableByAlphabet() {
    const rows = Array.from(List.getElementsByTagName('tr'));
    rows.sort((a, b) => {
        const aCategory = a.children[1].textContent.toLowerCase();
        const bCategory = b.children[1].textContent.toLowerCase();
        return aCategory.localeCompare(bCategory);
    });

    rows.forEach(row => {
        List.appendChild(row);
    });
}

function sortTableByReverseAlphabet() {
    const rows = Array.from(List.getElementsByTagName('tr'));
    rows.sort((a, b) => {
        const aCategory = a.children[1].textContent.toLowerCase();
        const bCategory = b.children[1].textContent.toLowerCase();
        return bCategory.localeCompare(aCategory);
    });

    rows.forEach(row => {
        List.appendChild(row);
    });
}

function sortByDateNew() {
    const rows = Array.from(List.getElementsByTagName('tr'));
    rows.sort((a, b) => {
        const aDate = new Date(a.children[0].textContent.split('.').reverse().join('-'));
        const bDate = new Date(b.children[0].textContent.split('.').reverse().join('-'));
        return bDate - aDate;
    });

    rows.forEach(row => {
        List.appendChild(row);
    });
}

function sortByDateOld() {
    const rows = Array.from(List.getElementsByTagName('tr'));
    rows.sort((b, a) => {
        const aDate = new Date(a.children[0].textContent.split('.').reverse().join('-'));
        const bDate = new Date(b.children[0].textContent.split('.').reverse().join('-'));
        return bDate - aDate;
    });

    rows.forEach(row => {
        List.appendChild(row);
    });
}

function sortByFood() {
    const rows = List.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const categoryTd = rows[i].getElementsByTagName('td')[2];

        if (categoryTd.textContent !== 'food') {
            rows[i].style.display = 'none';  
        } else {
            rows[i].style.display = '';  
        }
    }
}

function sortByTransportation() {
    const rows = List.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const categoryTd = rows[i].getElementsByTagName('td')[2];

        if (categoryTd.textContent !== 'transportation') {
            rows[i].style.display = 'none'; 
        } else {
            rows[i].style.display = '';  
        }
    }
}

function sortByHousing() {
    const rows = List.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      const categoryTd = rows[i].getElementsByTagName('td')[2];
  
      if (categoryTd.textContent !== 'housing') {
        rows[i].style.display = 'none';  
      } else {
        rows[i].style.display = ''; 
      }
    }
  }

  function sortByEducation() {
    const rows = List.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      const categoryTd = rows[i].getElementsByTagName('td')[2];
  
      if (categoryTd.textContent !== 'education') {
        rows[i].style.display = 'none';  
      } else {
        rows[i].style.display = ''; 
      }
    }
  }
  

  function sortByHealth() {
    const rows = List.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      const categoryTd = rows[i].getElementsByTagName('td')[2];
  
      if (categoryTd.textContent !== 'health') {
        rows[i].style.display = 'none';  
      } else {
        rows[i].style.display = ''; 
      }
    }
  }  

  function sortByClothing() {
    const rows = List.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      const categoryTd = rows[i].getElementsByTagName('td')[2];
  
      if (categoryTd.textContent !== 'clothing') {
        rows[i].style.display = 'none';  
      } else {
        rows[i].style.display = ''; 
      }
    }
  }  

  function sortByTravelling() {
    const rows = List.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      const categoryTd = rows[i].getElementsByTagName('td')[2];
  
      if (categoryTd.textContent !== 'travelling') {
        rows[i].style.display = 'none';  
      } else {
        rows[i].style.display = ''; 
      }
    }
  }  

function getMoneyAndRender() {
    fetch('get-money')
        .then(response => response.json())
        .then(data => {
            renderMoneyList(data);
        })
        .catch(error => console.error(error));
}

getMoneyAndRender()

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

    