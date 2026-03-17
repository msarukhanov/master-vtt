const elementById = (id) => document.getElementById(id);

function value(id) {
    return elementById(id).value;
}

function createEl(tag, className, text, data = null, id = null) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.innerHTML = text;
    if (data) el.setAttribute("data", JSON.stringify(data));
    if (id) el.setAttribute("id", id);
    return el;
}

let applyNameFilter = (a,b)=>{};


function getDataById(type, id) {
    const c = data[type].find(c => c.id === id);
    return c ? c : null;
}
function getDataNameById(type, id) {
    const c = data[type].find(c => c.id === id);
    return c ? c.name : id;
}