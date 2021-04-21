app.component('display-event', {
    template:
    /*html*/
    `
    <!--
    <div class="container">
        <div class="row">
            <span class="border border-secondary border border-4 text-warning bg-light">
                <div class="col-md-6">
                    <div>Evenement 1</div>
                    <div>Date : </div>
                    <div>Description :</div>
                </div>
                <div class="col-md-6">
                    <img src="./assets/images/exemple.png" height="50">
                </div>
            </span>
        </div>
    </div>

    -->


        <table>
            <tr>
                <td scope="row">
                    <div>Evenement 1</div>
                    <div>Date : </div>
                    <div>Description :</div>
                </td>
                <td id="image_event"><img src="./assets/images/exemple.png"/></td>
            </tr>
        </table>
            
        </div>
    </div>
    `
})