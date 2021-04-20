app.component('profil', {
    template:
    /*html*/
    `
    <div class="profil">

        <h1>PROFIL</h1>
        <!--<img id="pp" src="./assets/images/exemple.png"/>-->
        <h2>Mes évènements</h2>
        <form id= "searchbox" method= "get" action= "/search" autocomplete= "off">
            <input name= "q" type= "text" size= "15" placeholder= "musée, Paris, ..." />
            <input id= "button-submit" type= "submit" value= "" />
        </form>
    </div>
    `
})