//script de salvamento das informações.

var id_edit_iten = null;

fill_grid();

function save_info() {

    var info_json = {
        "current_date": document.getElementById('currentDate_input').value,
        "initial_km": document.getElementById('initialKm_input').value,
        "final_km": document.getElementById('finalKm_input').value
    };

    if (id_edit_iten == null) {
        localStorage.setItem(localStorage.length, JSON.stringify(info_json));
    } else {
        localStorage.setItem(id_edit_iten, JSON.stringify(info_json));
        id_edit_iten = null;
    }

    clear_form();
    clear_grid();
    fill_grid();
}

function clear_form() {
    document.getElementById('currentDate_input').value = "";
    document.getElementById('initialKm_input').value = "";
    document.getElementById('finalKm_input').value = "";
}


//---------------------------------------------------------------------------------------------//

//script da grid
function fill_grid() {
    var fill_grid_info = localStorage;
    var grid = document.getElementById('grid_info');

    for (var i = 0; i < fill_grid_info.length; i++) {
        var itens_info = Object.values(JSON.parse(fill_grid_info[i])); //transforma o json em um array
        var itens_fragment = document.createDocumentFragment();
        itens_info[0] = remake_date(itens_info[0]);

        itens_info.forEach(itens_info => {
            const new_element = document.createElement('label');
            new_element.innerText = itens_info;
            itens_fragment.appendChild(new_element);
        });

        var calculation_km_label = document.createElement('label');
        calculation_km_label.innerText = calculation_km(itens_info[1], itens_info[2]);
        itens_fragment.appendChild(calculation_km_label);

        var button_grid = document.createElement('button');
        button_grid.id = i;
        button_grid.innerText = 'Editar';
        button_grid.classList.add('button_grid');
        button_grid.addEventListener('click', edit_button);
        itens_fragment.appendChild(button_grid);

        grid.appendChild(itens_fragment);
    }
}

function calculation_km(initial_km, final_km) {
    if (final_km == 0) {
        return '---';
    } else {
        var total_km = final_km - initial_km;
        return total_km;
    }
}

function remake_date(date) {
    var date_array = date.split('-');
    var new_date = date_array[2] + '-' + date_array[1] + '-' + date_array[0];
    return (new_date);
}

function clear_grid() {
    var grid_main = document.getElementById('grid_info');

    if (grid_main.childElementCount <= 5) {
        return;
    }

    while (grid_main.childElementCount > 5) {
        grid_main.removeChild(grid_main.lastChild);
    }

}

function edit_button() {
    var edit_iten = JSON.parse(localStorage.getItem(this.id));
    document.getElementById('currentDate_input').value = edit_iten.current_date;
    document.getElementById('initialKm_input').value = edit_iten.initial_km;
    document.getElementById('finalKm_input').value = edit_iten.final_km;
    id_edit_iten = this.id;
}
