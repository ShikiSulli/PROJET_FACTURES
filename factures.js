const form = document.getElementById('invoiceForm');
const createMessage = document.getElementById('createMessage');
const h2 = document.querySelector('h2');

// h2.addEventListener('click', () => {
//     location.href = 'https://www.google.fr';// lacation.href permet de rediriger vers une autre pages
// }
// );



// Lorsque le formulaire est soumis, empêche le comportement par défaut
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupère les valeurs des champs du formulaire (invoiceNumber, clientName, clientEmail, invoiceAmount, invoiceDate)
    // et les stocke dans un objet
    //creation invoiceId qui regarde le nombre de facture dans le local storage et ajoute 1
    const invoiceId = JSON.parse(localStorage.getItem('invoices')).length + 1;
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const invoiceAmount = document.getElementById('invoiceAmount').value;
    const invoiceDate = document.getElementById('invoiceDate').value;
     
    const invoice = {
        invoiceId,
        invoiceNumber,
        clientName,
        clientEmail,
        invoiceAmount,
        invoiceDate
    };

    // Récupère les factures existantes depuis le localStorage, ou initialise un tableau vide
    let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

    // Ajoute la nouvelle facture au tableau des factures
    invoices.push(invoice);

    // Stocke le tableau des factures dans le localStorage
    localStorage.setItem('invoices', JSON.stringify(invoices));

    console.log(invoices);

    createMessage.textContent = 'La facture a bien été créée';
    createMessage.classList.add('message');
    createMessage.style.display = 'block';
    setTimeout(() => {
        createMessage.textContent = '';
        createMessage.classList.remove('message');
    }, 3000);
   ;
});

// Lorsque le bouton "showInvoices" est cliqué, redirige vers la page "allInvoices.html"
const showInvoices = document.getElementById('showInvoices');
showInvoices.addEventListener('click', () => {
    location.href = 'allInvoices.html';
});

