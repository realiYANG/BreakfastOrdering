const menuItems = [
    { name: "白糖馒头", price: 1 },
    { name: "椒盐花卷", price: 1.5 },
    { name: "红枣红糖馒头", price: 1.5 },
    { name: "花生芝麻糖包", price: 1.5 },
    { name: "白菜素包子", price: 1.5 },
    { name: "香辣芽菜包(微辣)", price: 1.5 },
    { name: "酸菜粉丝包(微辣)", price: 1.5 },
    { name: "酱肉大包", price: 2 },
    { name: "鲜肉大包", price: 2 },
    { name: "红豆卷", price: 2 },
    { name: "奶香玉米", price: 2 },
    { name: "椰奶包", price: 2 },
    { name: "绿豆米糕", price: 2 },
    { name: "桂花米糕", price: 2 },
    { name: "红糖米糕", price: 2 },
    { name: "紫薯米糕", price: 2 },
    { name: "玉米蒸饺", price: 1, special: "1元1个 4元5个" },
    { name: "烧麦", price: 1.5 },
    { name: "稀饭", price: 2 },
    { name: "现磨豆浆", price: 2 },
    { name: "五香卤鸡蛋", price: 2 }
];

window.onload = function() {
    const menuDiv = document.getElementById('menu');
    menuItems.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'menu-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item.name;
        checkbox.onchange = function() {
            const numberInput = document.getElementById(`num-${item.name}`);
            numberInput.style.display = this.checked ? 'inline' : 'none';
        };

        const label = document.createElement('label');
        label.htmlFor = item.name;
        label.textContent = `${item.name} ${item.price}元`;

        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.id = `num-${item.name}`;
        numberInput.min = 1;
        numberInput.value = 1;
        numberInput.style.display = 'none';

        menuItemDiv.appendChild(checkbox);
        menuItemDiv.appendChild(label);
        menuItemDiv.appendChild(numberInput);

        menuDiv.appendChild(menuItemDiv);
    });
};

function generateOrder() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    let orderText = '';
    let totalPrice = 0;

    menuItems.forEach(item => {
        const checkbox = document.getElementById(item.name);
        if (checkbox.checked) {
            const quantity = parseInt(document.getElementById(`num-${item.name}`).value, 10);
            orderText += `${item.name} ${quantity}个 `;
            totalPrice += item.price * quantity;
        }
    });

    orderText += `总价为${totalPrice.toFixed(2)}元`;
    outputDiv.textContent = orderText;
}

function copyToClipboard() {
    const outputDiv = document.getElementById('output');
    const textToCopy = outputDiv.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(function() {
        alert('订单已复制到剪切板');
    }, function(err) {
        console.error('复制失败', err);
    });
}
