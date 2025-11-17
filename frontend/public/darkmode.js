let currentUser = JSON.parse(localStorage.getItem('user')) || null;
let tasks = [];
let currentTaskId = null;

const taskModal = document.getElementById('taskModal');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveTaskBtn = document.getElementById('saveTaskBtn');
const tasksContainer = document.getElementById('tasksContainer');
const modalTitle = document.getElementById('modalTitle');
const saveBtnText = document.getElementById('saveBtnText');
const themeToggle = document.getElementById('themeToggle');
const userAvatar = document.getElementById('userAvatar');
const dropdownMenu = document.getElementById('dropdownMenu');
const logoutBtn = document.getElementById('logoutBtn');

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    if (!currentUser) {
        window.location.href = '/'; // redirige vers Next.js login
        return;
    }
    loadTasks();

    const firstNameEl = document.getElementById('userFirstName');
    if (firstNameEl && currentUser.firstname) {
        firstNameEl.textContent = currentUser.firstname;
    }

    const emailEl = document.getElementById('userEmail');
    if (emailEl && currentUser.email) {
        emailEl.textContent = currentUser.email;
    }

    loadTasks();
});


themeToggle.addEventListener('click', () => {
    const body = document.body;
    const isLight = body.classList.toggle('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        themeToggle.textContent = '☀️';
    }
}

userAvatar.addEventListener('click', e => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('active');
});

document.addEventListener('click', e => {
    if (!dropdownMenu.contains(e.target) && e.target !== userAvatar) {
        dropdownMenu.classList.remove('active');
    }
});

logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        localStorage.removeItem('user');
        window.location.href = '/'; // redirige vers Next.js login
    }
});

function loadTasks() {
    if (!currentUser) return;
    fetch(`http://localhost:8000/tasks/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            tasks = data;
            renderTasks();
            updateStats();
        })
        .catch(err => console.error('Erreur chargement tâches:', err));
}

function openModal(taskId = null) {
    currentTaskId = taskId;
    const titleInput = document.getElementById('taskTitle');
    const descInput = document.getElementById('taskDescription');
    const dueDateInput = document.getElementById('taskDueDate');

    if (taskId) {
        const task = tasks.find(t => t.id === taskId);
        modalTitle.textContent = 'Modifier la tâche';
        saveBtnText.textContent = 'Modifier';
        titleInput.value = task.title;
        descInput.value = task.description || '';
        dueDateInput.value = task.due_time ? task.due_time.split('T')[0] : '';
    } else {
        modalTitle.textContent = 'Nouvelle tâche';
        saveBtnText.textContent = 'Créer';
        titleInput.value = '';
        descInput.value = '';
        dueDateInput.value = '';
    }

    taskModal.classList.add('active');
    titleInput.focus();
}

function closeModalFn() {
    taskModal.classList.remove('active');
    currentTaskId = null;
}

function saveTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const due_time = document.getElementById('taskDueDate').value;

    if (!title) return alert('⚠️ Le titre est obligatoire');

    const payload = { title, description, due_time, user_id: currentUser.id };

    const url = currentTaskId 
        ? `http://localhost:8000/tasks/${currentTaskId}` 
        : 'http://localhost:8000/tasks';
    const method = currentTaskId ? 'PUT' : 'POST';

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) throw new Error('Erreur lors de la sauvegarde');
        return fetch(`http://localhost:8000/tasks/${currentUser.id}`);
    })
    .then(res => res.json())
    .then(data => {
        tasks = data;
        renderTasks();
        updateStats();
        closeModalFn();
    })
    .catch(err => alert(err.message));
}

function deleteTask(id) {
    if (!confirm('⚠️ Supprimer cette tâche ?')) return;

    fetch(`http://localhost:8000/tasks/${id}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la suppression');
            return fetch(`http://localhost:8000/tasks/${currentUser.id}`);
        })
        .then(res => res.json())
        .then(data => {
            tasks = data;
            renderTasks();
            updateStats();
        })
        .catch(err => alert(err.message));
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    const newStatus = task.status === 'done' ? 'not started' : 'done';

    fetch(`http://localhost:8000/tasks/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    })
    .then(res => {
        if (!res.ok) throw new Error('Erreur lors du changement de statut');
        return fetch(`http://localhost:8000/tasks/${currentUser.id}`);
    })
    .then(res => res.json())
    .then(data => {
        tasks = data;
        renderTasks();
        updateStats();
    })
    .catch(err => alert(err.message));
}

function renderTasks() {
    if (!tasks.length) {
        tasksContainer.innerHTML = `<div class="empty-state">
            <p>📝 Aucune tâche pour le moment</p>
            <button class="btn-secondary" id="createFirstTask">Créer votre première tâche</button>
        </div>`;
        document.getElementById('createFirstTask')?.addEventListener('click', () => openModal());
        return;
    }

    tasksContainer.innerHTML = tasks.map(t => `
        <div class="task-item" data-id="${t.id}">
            <div class="task-checkbox ${t.status === 'done' ? 'checked' : ''}" onclick="toggleTask(${t.id})"></div>
            <div class="task-content">
                <div class="task-title ${t.status === 'done' ? 'completed' : ''}">${t.title}</div>
                ${t.description ? `<div class="task-description">${t.description}</div>` : ''}
                <div class="task-due">${t.due_time ? t.due_time.split('T')[0] : ''}</div>
            </div>
            <div class="task-actions">
                <button onclick="openModal(${t.id})">✏️</button>
                <button onclick="deleteTask(${t.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const pending = total - completed;
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('completionRate').textContent = total ? Math.round(completed / total * 100) + '%' : '0%';
}

addTaskBtn.addEventListener('click', () => openModal());
closeModalBtn.addEventListener('click', closeModalFn);
cancelBtn.addEventListener('click', closeModalFn);
saveTaskBtn.addEventListener('click', saveTask);
taskModal.addEventListener('click', e => { if(e.target === taskModal) closeModalFn(); });