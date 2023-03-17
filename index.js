const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

/*

BACK OFFICE
<!doctype html>
<html lang="it">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD Agenda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <style>
        .form-text {
            display: none;
        }

        form.validated input:valid,
        form.validated textarea:valid {
            border-color: green;
            }

        form.validated input:invalid,
        form.validated textarea:invalid {
            border-color: red;
        }

        form.validated input:invalid+div,
        form.validated textarea:invalid+div {
            display: block;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid px-5">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto d-flex flex-grow-1 mb-2 mb-lg-0">
                    <li class="nav-item me-auto">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="./backoffice.html">Backoffice</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <h2 class="d-inline-block">Backoffice</h2>
                <h5 id="subtitle" class="d-inline-block"> — Crea nuovo appuntamento </h5>
                <div class="spinner-border text-info float-end d-none" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <hr class="border-secondary">
                <form class="mt-4" onsubmit="handleSubmit(event)">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nome Appuntamento</label>
                        <input type="text" class="form-control" id="name" placeholder="Inserisci un nome"
                            aria-describedby="name" required>
                        <div class="form-text text-danger">Ti manca di inserire un nome per l'evento</div>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Descrizione</label>
                        <textarea class="form-control" id="description" aria-describedby="description"
                            placeholder="Inserisci una descrizione" row="4" required></textarea>
                        <div class="form-text text-danger">Ti manca la descrizione</div>
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Prezzo</label>
                        <input type="number" class="form-control" id="price" aria-describedby="price" placeholder="1€"
                            required>
                        <div class="form-text text-danger">Ti manca il prezzo</div>
                    </div>
                    <div class="mb-3">
                        <label for="time" class="form-label">Data e ora</label>
                        <input type="datetime-local" class="form-control" id="time" aria-describedby="time"
                            placeholder="1€" required>
                        <div class="form-text text-danger">Ti manca la data/ora</div>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-outline-secondary">Cancel</button>
                        <button type="submit" class="btn btn-primary me-auto" onclick="handleValidate()">Submit</button>
                        <button id="delete-btn" type="button" class="btn btn-danger d-none"
                            onclick="handleDelete()">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"></script>
        <script>

        // vedi pagina details.html per spiegazione delle prossime due righe
        const URLParams = new URLSearchParams(window.location.search)
        const selectedId = URLParams.get("id")

        const endpoint = selectedId ? "https://striveschool-api.herokuapp.com/api/agenda/" + selectedId : "https://striveschool-api.herokuapp.com/api/agenda/"
        const method = selectedId ? "PUT" : "POST"


        // funzione lanciata dall'onclick del bottone, che bypassa il meccanismo che impedisce al onsubmit di azionarsi se i campi non sono validi
        // così riusciamo a stabilire il momento giusto per mostrare la colorazione dei campi all'utente
        // quantomeno dopo che prova ad inviare un form incompleto e non al caricamento della pagina (per non trovare un form rosso senza avere ancora fatto niente)
        const handleValidate = () => {
            const form = document.querySelector("form")
            form.classList.add("validated")
            // quando il form riceverà la calsse validated il css troverà corrispondenza e colorerà in verde i campi validi e in rosso quelli incompleti/non validi
        }

        window.onload = async () => {

            if (selectedId) {

                document.getElementById("subtitle").innerText = " — Modifica appuntamento" // cambia testo sottotitolo se siamo arrivati sulla pagina per modificare una risorsa esistente
                document.getElementById("delete-btn").classList.remove("d-none") // abilita il bottone delete solo sulla pagina di modifica

                try {
                    const resp = await fetch(endpoint) // fetch di tipo GET su endpoint con id incorporato
                    const appointmentData = await resp.json()
                    const { name, description, price, time } = appointmentData


                    // pre popolazione dei campi del form con dati pre-esistenti (per evitare errori di battitura)
                    document.getElementById("name").value = name
                    document.getElementById("description").value = description
                    document.getElementById("price").value = price
                    document.getElementById("time").value = time.split(".")[0]

                    // modifica aspetto del bottone submit
                    const sbmtBtn = document.querySelector("button[type='submit']")
                    sbmtBtn.classList.remove("btn-primary")
                    sbmtBtn.classList.add("btn-success")
                    sbmtBtn.innerText = "Modifica"

                } catch (error) {
                    console.log(error)
                }
            }

        }

        const handleSubmit = async (event) => {
            event.preventDefault();

            // creazione dell'oggetto che invieremo come payload
            // N.B. la creazione di newAppointment viene fatta ad ogni submit del form
            const newAppointment = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                price: document.getElementById("price").value,
                time: document.getElementById("time").value,
            }

            console.log("HERE ON SUBMIT", newAppointment)

            try {
                // attivo lo stato di caricamento
                isLoading(true)

                // qui l'endpoint dipende da come siamo arrivati su questa pagina, se per creazione sarà solo l'url normale, se per modifica avrà anche l'id
                // questo è deciso dal ternary operator alla creazione della variabile "endpoint" in alto
                const resp = await fetch(endpoint, {
                    method, // uguale a scrivere method: method,
                    body: JSON.stringify(newAppointment), // è fondamentale fare la stringhifizzazione dell'oggetto nativo o invieremo "[object Object]"
                    // un header in particolare è importantissimo, il Content-Type, per specificare il formato di invio, altrimenti non verrà riconosciuto dal server
                    // l'Authorization header serve in caso di API che richiedono autenticazione tramite una API Key
                    headers: {
                        // "Authorization" : "Bearer [YOUR API KEY]", // metodo di autenticazione con API Key standard
                        "Content-Type": "application/json"
                    }
                })

                if (resp.ok) {
                    const newAppObj = await resp.json()
                    // Aspettiamo il valore di newAppObj per estrarre un'informazione nuova generata dal server ossia l'_id


                    // in base a se siamo qui per creazione o modifica creeremo il messaggio più appropriato alla fine della richiesta
                    if (selectedId) {
                        alert("Risorsa con l'id " + newAppObj._id + ", modificata con successo")
                    } else {
                        alert("Risorsa con l'id " + newAppObj._id + ", creata con successo")
                    }
                } else {
                    throw new Error("La richiesta non è andata a buon fine")
                }

            } catch (error) {
                alert(error)
            } finally {
                // spengo il loader di caricamento sia quando la richiesta va a buon fine, sia quando abbiamo un errore e si attiva il catch
                // poco prima di uscire dall'esecuzione del contesto, il metodo finally si attiva a sua volta
                isLoading(false)
            }
        }

        const handleDelete = async () => {
            isLoading(true) // loader diventa visibile

            // chiediamo conferma all'utente
            const hasAccepted = confirm("Sei convinto di voler elimilare l'appuntamento?")

            // se accetta procediamo all'effettiva rimozione
            if (hasAccepted) {
                try {
                    console.log("DELETE")

                     // ricorda: basta una fetch con l'endpoint e il metodo corretti per rimuovere già qualcosa, l'await in questo caso non è obbligatorio
                    // ma se ci serve un qualche dato di ritorno allora lo useremo per aspettare la resp e per ricavarne il body
                    const resp = await fetch(endpoint, { method: "DELETE" })
                    const deletedObj = await resp.json()

                    alert("Hai eliminato l'appuntamento " + deletedObj.name)
                    // se non usassimo un alert qui servirebbe ritardare l'esecuzione del metodo assign di window, 
                    // ma siccome alert è "bloccante" in questo specifico caso non occorre
                    window.location.assign("./index.html")

                } catch (error) {
                    console.log(error)
                }
                finally {
                    isLoading(false)
                }
            }
        }

        const isLoading = loadingState => {
            // loading state è un boolean true/false
            // l'elemento è inizialmente invisibile quindi un loadingState === true gli rimuoverà la classe d-none
            const spinner = document.querySelector(".spinner-border")
            if (loadingState) {
                spinner.classList.remove("d-none")
            } else {
                spinner.classList.add("d-none")
            }
             }
    </script>
</body>

</html>

DETAILS

<!doctype html>
<html lang="it">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD Agenda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>

<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid px-5">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto d-flex flex-grow-1 mb-2 mb-lg-0">
                    <li class="nav-item me-auto">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./backoffice.html">Backoffice</a>
                         </li>
                </ul>
            </div>
        </div>
    </nav>

    <img src="https://images.unsplash.com/photo-1529651737248-dad5e287768e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1301&q=80"
        alt="" style="height: 30vh; width:100%; object-fit: cover">
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <h4>Appuntamento</h4>
                <div id="appointment-details">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <!-- 
                    <h1 class="fw-bold">Nome Appuntamento</h1>
                    <p class="font-monospace">20/06/2023</p>
                    <p>123€</p>
                    <h6 class="bg-light py-3 ps-2">Server Details</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item ps-2"><strong>id:</strong> 129812397123</li>
                        <li class="list-group-item ps-2"><strong>id:</strong> 129812397123</li>
                        <li class="list-group-item ps-2"><strong>id:</strong> 129812397123</li>
                    </ul>
 -->

                </div>
                 </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"></script>

    <script>
        // Appena si avvia lo script cercherà nell'oggetto window il riferimento alla location.search, che è una stringa
        // questa stringa viene passata al costruttore URLSearchParams per generare un oggetto avanzato con cui possiamo 
        // gestire il singolo parametro che abbiamo nella URL in questo momento
        // o una serie di parametri che potrebbero esserci nella URL in uno scenario più realistico.
        const URLParams = new URLSearchParams(window.location.search) // creazione dell'oggetto a partire dalla stringa search --> es. ?id=2938123

        const selectedId = URLParams.get("id") // estrazione dall'oggetto del valore associato alla chiave "id"
        console.log("SELECTED ID: ", selectedId) // la variabile ora contiene un id oppure null


        window.onload = async () => {
            const container = document.getElementById("appointment-details")
            try {
                const resp = await fetch("https://striveschool-api.herokuapp.com/api/agenda/" + selectedId)
                const appointmentData = await resp.json()

                // destrutturazione dell'oggetto in variabili contenenti valori delle sue proprietà
                const { _id, name, description, price, time, createdAt, updatedAt } = appointmentData

                container.innerHTML = `
                    <h1 class="fw-bold">${name}</h1>
                    <p class="font-monospace">${new Date(time).toLocaleString("it-IT")}</p>
                    <p>${price}€</p>
                    <h6 class="bg-light py-3 ps-2">Server Details</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item ps-2"><strong>id:</strong> ${_id}</li>
                        <li class="list-group-item ps-2"><strong>createdAt:</strong> ${createdAt}</li>
                        <li class="list-group-item ps-2"><strong>updatedAt:</strong> ${updatedAt}</li>
                    </ul>
                    <button class="btn btn-success mt-3" onclick="handleClick()">Modifica appuntamento</button>
                    `
            }
            catch (err) {
                console.log(err)
            }
        }

        const handleClick = () => {

            // il metodo .assign() sposta l'utente su un'altra pagina, come fosse un href su un <a>
            window.location.assign("./backoffice.html?id=" + selectedId)
        }


    </script>
</body>
</html>

INDEX HTML

<!doctype html>
<html lang="it">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD Agenda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>

<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid px-5">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto d-flex flex-grow-1 mb-2 mb-lg-0">
                 <li class="nav-item me-auto">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./backoffice.html">Backoffice</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2 class="display-4">Prossimi appuntamenti</h2>
                <ul id="appointment-list" class="list-group">
                    <!-- GLI ELEMENTI DELLA LISTA VERRANNO CREATI QUI PROGRAMMATICAMENTE -->

                    <!-- questo loader verrà nascosto dal blocco finally quando arrivano gli elementi dinamici o nel caso di un errore -->
                    <div class="spinner-grow text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </ul>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"></script>
        <script>

        // la fetch da sola fa già una richiesta HTTP di tipo GET(implicito)
        // fetch("https://striveschool-api.herokuapp.com/api/agenda/")
        //     .then(resp => {
        //         console.log(resp)
        //         if (resp.ok) {
        //             return resp.json() // parsa il body e ci torna un formato usabile nel parametro della prossima callback
        //         }
        //     })
        //     .then(appointments => {
        //         // a questo punto abbiamo 1. ottenuto i dati; 2. li abbiamo convertiti in un formato usabile; 3. siamo pronti ad utilizzarli
        //         // qui dentro possiamo farci quello che vogliamo, come ad esempio visualizzarli sulla pagina!
        //         const list = document.getElementById("appointment-list")
        //         appointments.forEach(el => {
        //             const li = document.createElement("li")
        //             li.className = "list-group-item d-flex justify-content-between"
        //             li.innerHTML = `<span>${el.name}</span> <span class="badge text-bg-dark">${el.price}€</span>`
        //             list.appendChild(li)
        //         })
        //     }).catch(err => console.log(err))

        // ASYNC / AWAIT è utilizzabile solo all'interno di una funzione dichiarata come asincrona...
        const fetchData = async () => {
            console.log("pre")
            // una volta dichiarata una funzione come async, il suo contesto si comporterà in modo particolare
            // congelerà tutte le linee di codice successive alla keyword "await"
            // anche la variabile associata al suo risultato aspetterà a crearsi e solo dopo che la promise diventa "settled" 
            // verrà creata con l'effettivo valore di ritorno della Promise
            try {
                const resp = await fetch("https://striveschool-api.herokuapp.com/api/agenda/")
                // aspettando la risoluzione di fetch riceviamo il response object dentro la variabile "resp"
                console.log("RESP", resp)

                if (resp.status === 400) throw new Error("Errore nella richiesta, probabilmente mal formata (400)")
                if (resp.status === 404) throw new Error("Non abbiamo trovato la risorsa (404)")
                if (!resp.ok) throw new Error("Abbiamo un problema con la fetch")

                // il throw è come un return, interrompe in quel punto l'esecuzione del contesto della funzione


                const appointments = await resp.json()
                // anche json è una Promise che va aspettata, useremo anche qui la keyword "await"
                // per funzioni normali (sincrone) che chiamerai in questo contesto NON SERVE l'"await"

                const list = document.getElementById("appointment-list")
                appointments.forEach(appointment => {
                    const li = document.createElement("li")
                    li.className = "list-group-item d-flex align-items-center"
                    li.innerHTML = `<span class="me-auto">${appointment.name}</span> <span class="badge text-bg-dark me-3">${appointment.price}€</span> <a href="./details.html?id=${appointment._id}">Vedi dettagli</a>`
                    list.appendChild(li)
                })
                console.log(appointments)


                // questo catch fa da gestore di errori singolo, per errori differenti che possono scaturire all'interno del contesto del try
            } catch (err) {
                alert("QUI SIAMO NEL CATCH " + err.message)
                } finally {
                // settiamo la classe del loader a d-none e quindi si nasconderà
                document.querySelector(".spinner-grow").classList.add("d-none")
            }

            console.log("post")
        }

        window.onload = () => {
            // occorre chiamare fetchData e far partire l'esecuzione del codice asincrono
            fetchData() // una funzione async diventa di fatto una Promise che si risolverà come le altre Promise
            // se avete un valore di ritorno da fetchData, dovrà essere aspettato come una qualasiasi Promise: o con un .then() o con un await

            console.log("LAST OF ONLOAD")
        }


    </script>
</body>

</html>

*/
