document.querySelector('#contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('/submit-contact', {
        method: 'POST',
        body: formData
    })
   .then(response => response.text())
   .then(message => {
        alert(message);
    });
});
