// Simulated data (replace this with actual API data)
const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 1, name: 'User 1', email: 'user1@example.com' }
    // Add more user data here...
  ];
  
  let currentPage = 1;
  const pageSize = 10;
  
  function renderUsers(page) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = users.slice(start, end);
  
    const tableBody = document.getElementById('userTable');
    tableBody.innerHTML = '';
  
    paginatedUsers.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" onclick="selectRow(${user.id})"></td>
        <td>${user.id}</td>
        <td contenteditable="true">${user.name}</td>
        <td contenteditable="true">${user.email}</td>
        <td>
          <button class="edit" onclick="editRow(${user.id})">Edit</button>
          <button class="delete" onclick="deleteRow(${user.id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function renderPagination() {
    const totalPages = Math.ceil(users.length / pageSize);
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
  
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.onclick = () => {
        currentPage = i;
        renderUsers(currentPage);
      };
      pagination.appendChild(button);
    }
  }
  
  function search() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = users.filter(user => {
      return user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
    });
  
    currentPage = 1;
    users.length = 0;
    users.push(...filteredUsers);
    renderUsers(currentPage);
    renderPagination();
  }
  
  function editRow(id) {
    // Handle editing functionality here
    // For simplicity, editing is done directly in the table cells (contenteditable)
  }
  
  function deleteRow(id) {
    // Handle deleting a row
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      renderUsers(currentPage);
      renderPagination();
    }
  }
  
  function deleteSelectedRows() {
    // Handle deleting selected rows
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
      const id = parseInt(checkbox.parentNode.parentNode.cells[1].textContent);
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
      }
    });
  
    renderUsers(currentPage);
    renderPagination();
  }
  
  function selectRow(id) {
    // Handle selecting a row
    const row = document.querySelector(`#userTable tr td input[type="checkbox"][onclick="selectRow(${id})"]`);
    row.checked ? row.parentNode.parentNode.classList.add('selected') : row.parentNode.parentNode.classList.remove('selected');
  }
  
  function selectAllRows() {
    // Handle selecting/deselecting all rows in current page
    const checkboxes = document.querySelectorAll('#userTable input[type="checkbox"]');
    const selectAllCheckbox = document.getElementById('selectAll');
  
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAllCheckbox.checked;
      selectRow(parseInt(checkbox.parentNode.parentNode.cells[1].textContent));
    });
  }
  
  // Initial rendering
  renderUsers(currentPage);
  renderPagination();
  