const invoices = JSON.parse(localStorage.getItem('invoices')) || [];//je récupére les factures dans le localStorage
console.log(invoices);
function createPDF(invoice) {
    const { jsPDF } = window.jspdf ;
    const doc = new jsPDF();

    doc.text(`numéro de facture : ${invoice.invoiceNumber}`, 10, 10);
    doc.text(`nom du client : ${invoice.clientName}`, 10, 20);
    doc.text(`email du client : ${invoice.clientEmail}`, 10, 30);
    doc.text(`montant de la facture : ${invoice.invoiceAmount}`, 10, 40);
    doc.text(`date de la facture : ${invoice.invoiceDate}`, 10, 50);

    const saveName = `facture-${invoice.invoiceNumber}.pdf`;
    doc.save(saveName);
}

//je parcours le tableau invoices
invoices.forEach(invoice => {
    //je crée une div pour chaque facture
    const div = document.createElement('div');
    div.classList.add('invoice');
    //je crée un h3 pour chaque facture
    const h3 = document.createElement('h3');
    h3.textContent = `Facture n° ${invoice.invoiceNumber}`;
    //je crée un p pour chaque facture
    const p = document.createElement('p');
    p.innerHTML = `<p> id : ${invoice.invoiceId}</p>
    <p><strong>Client :</strong> ${invoice.clientName}</p> 
    <p><strong>Email :</strong> ${invoice.clientEmail}</p>
    <p><strong> Montant :</strong>  ${invoice.invoiceAmount}€</p> 
    <p><strong>Date :</strong> ${invoice.invoiceDate}</p>`;

    const divbutton = document.createElement('div');
    divbutton.classList.add('button');

    //je crée un bouton pour chaque facture
    const button = document.createElement('button');
    button.textContent = 'Supprimer';
    button.classList.add('delete');
    //je crée un bouton pour chaque facture
    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = 'Modifier';
    buttonEdit.classList.add('edit');
    //j'ajoute le h3, le p et le bouton à la div
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(divbutton);
    divbutton.appendChild(button);
    divbutton.appendChild(buttonEdit);
    
    //j'ajoute la div au body
    document.body.appendChild(div);
    //j'ajoute un écouteur d'événement sur le bouton
    button.addEventListener('click', () => {
        //je supprime la facture du tableau
        invoices.splice(invoices.indexOf(invoice), 1);
        //je mets à jour le localStorage
        localStorage.setItem('invoices', JSON.stringify(invoices));
        //je supprime la div du DOM
        div.remove();
    });
    //j'ajoute un écouteur d'événement sur le bouton
    buttonEdit.addEventListener('click', () => {
        //je recupère l'id de la facture
        const id = invoice.invoiceId;
        location.href = 'updatefactures.html?id=' + id;
    });

    //permetre de télécharger le fichier en pdf
  
    const pdf = document.createElement('button');
    pdf.textContent = 'Télécharger';
    pdf.classList.add('create-pdf');
    divbutton.appendChild(pdf);
    pdf.addEventListener('click', () => {
       createPDF(invoice);
    });
    
});


document.getElementById('return').addEventListener('click', () => {
    location.href = 'factures.html';
});
