// Mock data (simulating the Google Sheets data)
const INVENTORY_DATA = [
    {
        name: 'Paracetamol',
        category: 'Medicine',
        quantity: 100,
        expiryDate: '2025-12-31',
        dateAdded: '2024-03-20',
        addedBy: 'user@example.com'
    }
];

const USERS = {
    'admin@example.com': { password: 'adminpass123', role: 'admin' },
    'staff@example.com': { password: 'staffpass123', role: 'staff' }
};

const ACTIVITY_LOG = [];

let currentUser = null;

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (USERS[email] && USERS[email].password === password) {
        currentUser = { email, role: USERS[email].role };
        document.querySelector('.auth-section').classList.add('hidden');
        document.querySelector('.inventory-section').classList.remove('hidden');
        document.querySelector('.activity-log').classList.remove('hidden');
        loadInventory();
        loadActivityLog();
    } else {
        alert('Invalid credentials');
    }
}

// Inventory functions
function loadInventory() {
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';

    INVENTORY_DATA.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.expiryDate}</td>
            <td>${item.dateAdded}</td>
            <td>${item.addedBy}</td>
            <td>
                <button onclick="editItem('${item.name}')">Edit</button>
                <button onclick="deleteItem('${item.name}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function addItem() {
    const name = document.getElementById('itemName').value;
    const category = document.getElementById('itemCategory').value;
    const quantity = document.getElementById('itemQuantity').value;
    const expiryDate = document.getElementById('itemExpiry').value;

    if (!name || !category || !quantity) {
        alert('Please fill in all required fields');
        return;
    }

    const newItem = {
        name,
        category,
        quantity: parseInt(quantity),
        expiryDate,
        dateAdded: new Date().toISOString().split('T')[0],
        addedBy: currentUser.email
    };

    INVENTORY_DATA.push(newItem);
    logActivity(`Added new item: ${name}`);
    loadInventory();
    clearForm();
}

function editItem(itemName) {
    const item = INVENTORY_DATA.find(i => i.name === itemName);
    if (!item) return;

    const newQuantity = prompt('Enter new quantity:', item.quantity);
    if (newQuantity === null) return;

    item.quantity = parseInt(newQuantity);
    logActivity(`Updated quantity: ${itemName}`);
    loadInventory();
}

function deleteItem(itemName) {
    const index = INVENTORY_DATA.findIndex(i => i.name === itemName);
    if (index === -1) return;

    if (confirm('Are you sure you want to delete this item?')) {
        INVENTORY_DATA.splice(index, 1);
        logActivity(`Deleted item: ${itemName}`);
        loadInventory();
    }
}

// Activity Log functions
function logActivity(action) {
    const timestamp = new Date().toLocaleString();
    ACTIVITY_LOG.push({
        timestamp,
        user: currentUser.email,
        action
    });
    loadActivityLog();
}

function loadActivityLog() {
    const tbody = document.getElementById('activityBody');
    tbody.innerHTML = '';

    ACTIVITY_LOG.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.timestamp}</td>
            <td>${log.user}</td>
            <td>${log.action}</td>
        `;
        tbody.appendChild(tr);
    });
}

function clearForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemCategory').value = 'Medicine';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemExpiry').value = '';
}
