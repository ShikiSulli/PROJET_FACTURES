//je recupère l'id de la page qui est dans l'url
const id = location.search.length > 1 ? location.search.split('=')[1] : null;
console.log(id);

const invoicesform = document.getElementById('invoicesForm');


//je récupère les infos de la facture lié à l'id depuis le localStorage
const invoice = JSON.parse(localStorage.getItem('invoices'))[id - 1];
console.log(invoice);
//parcours chaque élément de l'objet invoice et je les affiche dans les champs du formulaire sauf l'id
for (invoiceElement in invoice) {
    if (invoiceElement !== 'invoiceId') {
        document.getElementById(invoiceElement).value = invoice[invoiceElement];
    }
}


    //je récupère le bouton du formulaire
    const button = document.getElementById('updateInvoice');
    //j'ajoute un écouteur d'événement sur le bouton
      
    button.addEventListener('click', function (e) {
        e.preventDefault();
        //je récupère les valeurs du formulaire
        const formValues = {
            invoiceId: id,
            invoiceNumber: document.getElementById('invoiceNumber').value,
            invoiceDate: document.getElementById('invoiceDate').value,
            invoiceAmount: document.getElementById('invoiceAmount').value,
            clientEmail : document.getElementById('clientEmail').value,
            clientName : document.getElementById('clientName').value,
        };
        console.log(formValues);
        //je récupère les factures du localStorage
        const invoices = JSON.parse(localStorage.getItem('invoices'));
        //je modifie la facture dans le tableau
        invoices[id - 1] = formValues;
        //je sauvegarde le tableau dans le localStorage
        localStorage.setItem('invoices', JSON.stringify(invoices));
        //je redirige vers la page d'accueil
        location.href = 'allInvoices.html';
    }
    );