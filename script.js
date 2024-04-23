document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();

    const siteNameInput = document.getElementById('siteName');
    const siteURLInput = document.getElementById('siteURL');

    const siteName = siteNameInput.value;
    const siteURL = siteURLInput.value;

    const bookmark = {
        name: siteName,
        url: siteURL
    };

    let bookmarks = getBookmarksFromLocalStorage();
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    clearForm(siteNameInput, siteURLInput);
    fetchBookmarks();
}

function deleteBookmark(url) {
    let bookmarks = getBookmarksFromLocalStorage();
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    const bookmarks = getBookmarksFromLocalStorage();
    const bookmarkList = document.getElementById('bookmarkList');
    bookmarkList.innerHTML = '';

    bookmarks.forEach(bookmark => {
        const { name, url } = bookmark;
        const listItem = document.createElement('li');
        const visitButton = document.createElement('button');
        visitButton.textContent = 'Visit';
        visitButton.className = 'visit-btn';
        visitButton.style.backgroundColor = Math.random() < 0.5 ? '#007bff' : '#4CAF50'; // Randomly choose blue or green color
        visitButton.addEventListener('click', function() {
            window.open(url, '_blank');
        });
        listItem.innerHTML = `
            <span>${name}</span>
            <button onclick="deleteBookmark('${url}')" class="delete-btn">Delete</button>`;
        listItem.appendChild(visitButton);
        bookmarkList.appendChild(listItem);
    });
}

function getBookmarksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
}

function clearForm(...inputs) {
    inputs.forEach(input => input.value = '');
}

fetchBookmarks();
