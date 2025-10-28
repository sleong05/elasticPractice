
document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const index = formData.get('index');
    const keyword = formData.get('keyword');

    try {
        const response = await fetch(`/api/search?index=${index}&keyword=${keyword}`);

        const data = await response.json();
        document.getElementById('results').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    } catch (error) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
    }
});

document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); //

    try {
        const response = await fetch('/api/document', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
                index: formData.get('index'),
                docId: formData.get('docId'),
                data: JSON.parse(formData.get('data')) // Parse the JSON string from the input
            })
        });

        const data = await response.json();
        document.getElementById('results').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    } catch (error) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
    }
});

document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const index = formData.get('index');
    const docId = formData.get('docId');

    try {
        const response = await fetch(`/api/document/${index}/${docId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: JSON.parse(formData.get('data'))
            })
        });

        const data = await response.json();
        document.getElementById('results').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    } catch (error) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
    }
});

// DELETE FORM HANDLER
document.getElementById('deleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const index = formData.get('index');
    const docId = formData.get('docId');

    try {
        const response = await fetch(`/api/document/${index}/${docId}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        document.getElementById('results').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    } catch (error) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
    }
});