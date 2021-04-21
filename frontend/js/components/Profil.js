app.component('profil', {
    template:
    /*html*/
    `
    <div class="profil">

        <h1>PROFIL</h1>
        <!--<img id="pp" src="./assets/images/exemple.png"/>
        <h2>Mes évènements</h2>-->
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid  recherche">
                <a class="navbar-brand event-title">Mes évènements</a>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Recherche..." aria-label="Recherche...">
                <button class="btn btn-outline-success" type="submit">Valider</button>
                </form>
            </div>
        </nav>
        <!--Autre search box
        <form id= "searchbox" method= "get" action= "/search" autocomplete= "off">
            <input name= "q" type= "text" size= "15" placeholder= "musée, Paris, ..." />
            <input id= "button-submit" type= "submit" value= "" />
        </form>
        -->
    </div>
    `
})