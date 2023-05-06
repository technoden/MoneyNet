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
