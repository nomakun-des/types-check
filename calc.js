var type_abb = [
    "nor", "fir", "wat", "ele", "gra", "ice", "fig", "poi", "gro",
    "fly", "psy", "bug", "roc", "gho", "dra", "dar", "ste", "fai"
];

var my_type_list = [
    -1, -1, -1, -1
];

var conf_type_list = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0
];

var conf_poke_list = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
];

window.onload = function () {
    setTable();

    const loader = document.getElementById('loader');
    loader.classList.add('loaded');
};

function setTable() {
    result = "";

    for (let i = 0; i < type_abb.length; i++) {
        for (let j = 0; j < type_abb.length; j++) {
            if (compatibility[i][j] === 2.0) {
                document.getElementById(type_abb[i] + "_" + type_abb[j]).style.color = "var(--js-twice)";
                result = "O";
            } else if (compatibility[i][j] === 0.5) {
                document.getElementById(type_abb[i] + "_" + type_abb[j]).style.color = "var(--js-half)";
                result = "Δ";
            } else if (compatibility[i][j] === 0.0) {
                document.getElementById(type_abb[i] + "_" + type_abb[j]).style.color = "var(--js-nullity)";
                result = "X";
            } else {
                document.getElementById(type_abb[i] + "_" + type_abb[j]).style.color = null;
                result = "";
            }
            document.getElementById(type_abb[i] + "_" + type_abb[j]).innerHTML = result;
        }
    }


    for (let i = 0; i < type_abb.length; i++) {
        for (let j = 0; j < type_abb.length; j++) {
            if (compatibility[i][j] === 2.0) {
                document.getElementById("conf_" + j + "_" + (i + 1)).style.color = "var(--js-twice)";
                result = "O";
            } else if (compatibility[i][j] === 0.5) {
                document.getElementById("conf_" + j + "_" + (i + 1)).style.color = "var(--js-half)";
                result = "Δ";
            } else if (compatibility[i][j] === 0.0) {
                document.getElementById("conf_" + j + "_" + (i + 1)).style.color = "var(--js-nullity)";
                result = "X";
            } else {
                document.getElementById("conf_" + j + "_" + (i + 1)).style.color = null;
                result = "";
            }
            document.getElementById("conf_" + j + "_" + (i + 1)).innerHTML = result;
        }
    }
}

function typeAdd(num) {
    for (let i = 0; i < my_type_list.length; i++) {
        if (Number(my_type_list[i]) === Number(num)) {
            break;
        }
        if (my_type_list[i] === -1) {
            my_type_list[i] = num;
            break;
        }
    }

    myTypeSet();
}

function typeDel(num) {
    my_type_list[num] = -1;
    store = "";
    for (let i = 1; i < my_type_list.length; i++) {
        if (my_type_list[i] !== -1 && my_type_list[i - 1] === -1) {
            my_type_list[i - 1] = my_type_list[i];
            my_type_list[i] = -1;
        }
    }

    myTypeSet();
}

function myTypeSet() {
    for (let i = 0; i < my_type_list.length; i++) {
        if (my_type_list[i] === -1) {
            document.getElementById("my_img_" + i).src = "img/types-icon/null.png";
            document.getElementById("my_imgbg_" + i).style.background = null;
            for (let j = 0; j < document.getElementsByClassName("my_bg_" + i).length; j++) {
                document.getElementsByClassName("my_bg_" + i)[j].style.background = null;
            }
        } else {
            document.getElementById("my_img_" + i).src
                    = "img/types-icon/" + type_abb[my_type_list[i]] + ".png";
            document.getElementById("my_imgbg_" + i).style.background
                    = "rgba(var(--color-" + type_abb[my_type_list[i]] + "),0.8)";
            for (let j = 0; j < document.getElementsByClassName("my_bg_" + i).length; j++) {
                document.getElementsByClassName("my_bg_" + i)[j].style.background
                        = "rgba(var(--color-" + type_abb[my_type_list[i]] + "),0.15)";
            }
        }
    }

    compatibilitySet();
}

function compatibilitySet() {
    result = "";

    for (let i = 0; i < my_type_list.length; i++) {
        if (my_type_list[i] !== -1) {
            for (let j = 0; j < compatibility[0].length; j++) {
                if (compatibility[my_type_list[i]][j] === 2.0) {
                    document.getElementById("my_" + i + "_" + (j + 1)).style.color = "var(--js-twice)";
                    result = "O";
                } else if (compatibility[my_type_list[i]][j] === 0.5) {
                    document.getElementById("my_" + i + "_" + (j + 1)).style.color = "var(--js-half)";
                    result = "Δ";
                } else if (compatibility[my_type_list[i]][j] === 0.0) {
                    document.getElementById("my_" + i + "_" + (j + 1)).style.color = "var(--js-nullity)";
                    result = "X";
                } else {
                    document.getElementById("my_" + i + "_" + (j + 1)).style.color = null;
                    result = "";
                }
                document.getElementById("my_" + i + "_" + (j + 1)).innerHTML = result;
            }
        } else {
            for (let j = 0; j < compatibility[0].length; j++) {
                document.getElementById("my_" + i + "_" + (j + 1)).innerHTML = "";
            }
        }
    }

    confTypeSet();
}

function confTypeSet() {
    mytype_opp = [
        1, 1, 1, 1
    ];

    nulldata = 0;

    for (let i = 0; i < compatibility[0].length; i++) {
        mytype_opp = [1, 1, 1, 1];
        nulldata = 0;
        for (let j = 0; j < my_type_list.length; j++) {
            if (my_type_list[j] !== -1) {
                mytype_opp[j] = compatibility[my_type_list[j]][i];
            } else {
                nulldata++;
            }
        }

        document.getElementById("mytype_no").innerHTML = (4 - nulldata) + " / 4";

        if (mytype_opp.includes(2)) {
            conf_type_list[i] = 0;
        } else {
            if (nulldata === 4) {
                conf_type_list[i] = 0;
            } else {
                conf_type_list[i] = 1;
            }
        }
    }

    confTableSet();
}

function confTableSet() {
    sum = 0;

    for (let i = 0; i < conf_type_list.length; i++) {
        if (conf_type_list[i] === 1) {
            document.getElementById("conf_row_" + i).style.display = null;
            sum++;
        } else {
            document.getElementById("conf_row_" + i).style.display = "none";
        }
    }

    if (sum === 0) {
        for (let i = 0; i < (type_abb.length + 1); i++) {
            document.getElementById("conf_null_" + i).style.display = null;
        }
    } else {
        for (let i = 0; i < (type_abb.length + 1); i++) {
            document.getElementById("conf_null_" + i).style.display = "none";
        }
    }

    if (sum <= 1) {
        document.getElementById("conf_rowspan").innerHTML = "防";
    } else if (sum === 2) {
        document.getElementById("conf_rowspan").innerHTML = "防御";
    } else {
        document.getElementById("conf_rowspan").innerHTML = "防御側";
    }

    pokesLoad();
}

function info_display() {

    var change = document.getElementById("info");

    if (change.style.display === "block") {
        change.style.display = "none";
        document.getElementById("info_title").innerHTML = "#このサイトについて ▼";
    } else {
        change.style.display = "block";
        document.getElementById("info_title").innerHTML = "#このサイトについて ▲";
    }
}

function pokesLoad() {
    comp = 1;
    comp_list = [1, 1, 1, 1];
    conf_poke_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    acc = 0;

    q = 0;
    for (let i = 0; i < poke_data.length; i++) {
        comp_list = [1, 1, 1, 1];
        acc = 0;
        console.log("poke[" + i + "]:");
        for (let j = 0; j < my_type_list.length; j++) {
            comp = 1;
            if (my_type_list[j] === -1) {
                comp = -1;
            } else {
                if (poke_data[i][2] === 0) {
                    comp *= compatibility[my_type_list[j]][poke_data[i][1] - 1];
                } else {
                    comp *= compatibility[my_type_list[j]][poke_data[i][1] - 1]
                            * compatibility[my_type_list[j]][poke_data[i][2] - 1];
                }
            }
            comp_list[j] = comp;
            console.log("[" + j + "]:" + comp);
        }
        for (let p = 0; p < comp_list.length; p++) {
            if (comp_list[p] > 1) {
                acc = 1;
                break;
            } else {
            }
        }
        if (acc !== 1) {
            conf_poke_list[q] = i;
            q++;
        }
        if (q > 9) {
            break;
        }
    }

    pokesDisplay();
}

function pokesDisplay() {
    nulldata = 0;

    for (let i = 0; i < my_type_list.length; i++) {
        if (my_type_list[i] === -1) {
            nulldata++;
        }
    }

    for (let i = 0; i < conf_poke_list.length; i++) {
        if (nulldata === 4) {
            document.getElementById("pokeicon_" + i).style.display = "none";
            document.getElementById("pokeicon_" + i).src
                    = "img/pokes-icon/poke_589.png";
        } else {
            document.getElementById("pokeicon_" + i).style.display = null;
            document.getElementById("pokeicon_" + i).src
                    = "img/pokes-icon/poke_" + poke_data[conf_poke_list[i]][0] + ".png";
        }
    }
}
