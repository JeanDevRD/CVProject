const inputName = document.getElementById("name");
const inputTitle = document.getElementById("title");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputDate = document.getElementById("time");
const inputLinkedin = document.getElementById("link");
const textareaSummary = document.querySelector('textarea');

const skillsContainer = document.querySelector('.added-skills');
const softwareContainer = document.querySelector('.added-software');
const languagesContainer = document.querySelector('.added-languages');
const experienceContainer = document.querySelector('.added-experience');
const educationContainer = document.querySelector('.added-education');
const certificationsContainer = document.querySelector('.added-certifications');

const addSkillBtn = document.querySelector('.add-skill');
const addSoftwareBtn = document.querySelector('.add-software');
const addLanguageBtn = document.querySelector('.add-language');
const addExperienceBtn = document.querySelector('.add-experience');
const addEducationBtn = document.querySelector('.add-education');
const addCertificationBtn = document.querySelector('.add-certification');

let skills = [];
let software = [];
let languages = [];
let experiences = [];
let education = [];
let certifications = [];

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function validateInput(input) {
    if (!input.value.trim()) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        return false;
    }
    input.classList.add('input-success');
    input.classList.remove('input-error');
    return true;
}

function addItemWithLevel(type) {
    const config = {
        skills: { container: skillsContainer, array: skills },
        software: { container: softwareContainer, array: software },
        languages: { container: languagesContainer, array: languages }
    };

    const c = config[type];
    const row = c.container.previousElementSibling;
    const name = row.querySelector('input[type="text"]').value.trim();
    const level = row.querySelector('select').value;

    if (!name || !level) {
        alert('Complete both fields');
        return;
    }

    c.array.push({ name, level });

    const item = createElement('div', 'row align-items-center mb-2 p-2 border rounded');
    const text = createElement('div', 'col-10', `${name} - Level ${level}`);
    const buttonCol = createElement('div', 'col-2 text-end');
    const deleteBtn = createElement('button', 'btn btn-sm btn-outline-danger', '×');
    deleteBtn.type = 'button';

    deleteBtn.addEventListener('click', () => {
        const index = c.array.findIndex(x => x.name === name && x.level === level);
        c.array.splice(index, 1);
        c.container.removeChild(item);
    });

    buttonCol.appendChild(deleteBtn);
    item.appendChild(text);
    item.appendChild(buttonCol);
    c.container.appendChild(item);

    row.querySelector('input[type="text"]').value = '';
    row.querySelector('select').value = '';
}

function addItemWithDates(type) {
    const config = {
        experience: { container: experienceContainer, array: experiences },
        education: { container: educationContainer, array: education },
        certifications: { container: certificationsContainer, array: certifications }
    };

    const c = config[type];
    const row = c.container.previousElementSibling;
    const name = row.querySelector('input[type="text"]').value.trim();
    const startDate = row.querySelectorAll('input[type="date"]')[0].value;
    const endDate = row.querySelectorAll('input[type="date"]')[1].value;

    if (!name || !startDate || !endDate) {
        alert('Complete all fields');
        return;
    }

    c.array.push({ name, startDate, endDate });

    const item = createElement('div', 'row align-items-center mb-2 p-2 border rounded');
    const text = createElement('div', 'col-10', `${name} (${startDate} - ${endDate})`);
    const buttonCol = createElement('div', 'col-2 text-end');
    const deleteBtn = createElement('button', 'btn btn-sm btn-outline-danger', '×');
    deleteBtn.type = 'button';

    deleteBtn.addEventListener('click', () => {
        const index = c.array.findIndex(x => x.name === name && x.startDate === startDate);
        c.array.splice(index, 1);
        c.container.removeChild(item);
    });

    buttonCol.appendChild(deleteBtn);
    item.appendChild(text);
    item.appendChild(buttonCol);
    c.container.appendChild(item);

    row.querySelector('input[type="text"]').value = '';
    row.querySelectorAll('input[type="date"]')[0].value = '';
    row.querySelectorAll('input[type="date"]')[1].value = '';
}

function validateForm() {
    let isValid = true;

    isValid = validateInput(inputName) && isValid;
    isValid = validateInput(inputTitle) && isValid;
    isValid = validateInput(inputEmail) && isValid;
    isValid = validateInput(inputPhone) && isValid;
    isValid = validateInput(inputDate) && isValid;
    isValid = validateInput(inputLinkedin) && isValid;
    isValid = validateInput(textareaSummary) && isValid;

    if (skills.length === 0 || software.length === 0 || languages.length === 0 ||
        experiences.length === 0 || education.length === 0 || certifications.length === 0) {
        alert('You must add at least one item in each section');
        return false;
    }

    return isValid;
}

function generateCV() {
    if (!validateForm()) return;

    const name = inputName.value.trim();
    const title = inputTitle.value.trim();
    const email = inputEmail.value.trim();
    const phone = inputPhone.value.trim();
    const birthDate = inputDate.value;
    const linkedin = inputLinkedin.value.trim();
    const summary = textareaSummary.value.trim();

    const cvLeft = document.querySelector('.cv-left');
    const cvRight = cvLeft.nextElementSibling;

    clearElement(cvLeft);
    clearElement(cvRight);

    const header = createElement('div', 'text-center mb-3');
    header.appendChild(createElement('h3', 'fs-5 mb-1', name));
    header.appendChild(createElement('p', 'mb-2', title));

    const photo = createElement('img', 'rounded-circle mb-3');
    photo.src = 'https://via.placeholder.com/120';
    photo.alt = 'Profile photo';
    header.appendChild(photo);

    cvLeft.appendChild(header);
    cvLeft.appendChild(createElement('hr', 'border-light'));

    const info = createElement('div', 'mb-3');
    info.appendChild(createElement('h5', 'border-bottom pb-1 mb-2', 'Personal Information'));
    info.appendChild(createElement('p', 'mb-1', `Email: ${email}`));
    info.appendChild(createElement('p', 'mb-1', `Phone: ${phone}`));
    info.appendChild(createElement('p', 'mb-1', `Birth Date: ${birthDate}`));

    const linkedinP = createElement('p', 'mb-1');
    linkedinP.textContent = 'LinkedIn: ';
    const link = createElement('a', 'text-white', linkedin);
    link.href = linkedin;
    link.target = '_blank';
    linkedinP.appendChild(link);
    info.appendChild(linkedinP);

    cvLeft.appendChild(info);
    cvLeft.appendChild(createElement('hr', 'border-light'));

    const skillsDiv = createElement('div', 'mb-3');
    skillsDiv.appendChild(createElement('h5', 'border-bottom pb-1 mb-2', 'Skills'));
    skills.forEach(s => {
        const card = createElement('div', 'card mb-2');
        card.appendChild(createElement('div', 'card-body p-2', `${s.name} - Level ${s.level}`));
        skillsDiv.appendChild(card);
    });
    cvLeft.appendChild(skillsDiv);
    cvLeft.appendChild(createElement('hr', 'border-light'));

    const softwareDiv = createElement('div', 'mb-3');
    softwareDiv.appendChild(createElement('h5', 'border-bottom pb-1 mb-2', 'Software'));
    software.forEach(s => {
        const card = createElement('div', 'card mb-2');
        card.appendChild(createElement('div', 'card-body p-2', `${s.name} - Level ${s.level}`));
        softwareDiv.appendChild(card);
    });
    cvLeft.appendChild(softwareDiv);
    cvLeft.appendChild(createElement('hr', 'border-light'));

    const languagesDiv = createElement('div', 'mb-3');
    languagesDiv.appendChild(createElement('h5', 'border-bottom pb-1 mb-2', 'Languages'));
    languages.forEach(l => {
        const card = createElement('div', 'card mb-2');
        card.appendChild(createElement('div', 'card-body p-2', `${l.name} - Level ${l.level}`));
        languagesDiv.appendChild(card);
    });
    cvLeft.appendChild(languagesDiv);

    const summaryDiv = createElement('div', 'mb-3');
    summaryDiv.appendChild(createElement('h5', 'border-bottom pb-1 mb-2', 'Professional Summary'));
    summaryDiv.appendChild(createElement('p', '', summary));
    cvRight.appendChild(summaryDiv);
    cvRight.appendChild(createElement('hr'));

    const experienceDiv = createElement('div', 'mb-3');
    experienceDiv.appendChild(createElement('h5', 'border-bottom pb-1 mb-2', 'Work Experience'));
    experiences.forEach(e => {
        const item = createElement('div', 'mb-2');
        const p = createElement('p', 'mb-0');
        p.appendChild(createElement('strong', '', e.name));
        item.appendChild(p);
        item.appendChild(createElement('small', '', `${e.startDate} - ${e.endDate}`));
        experienceDiv.appendChild(item);
    });
    cvRight.appendChild(experienceDiv);
    cvRight.appendChild(createElement('hr'));

    const educationDiv = createElement('div', 'mb-3');
    educationDiv.appendChild(createElement('h5', 'border-bottom pb-1 mb-2', 'Education'));
    education.forEach(e => {
        const item = createElement('div', 'mb-2');
        const p = createElement('p', 'mb-0');
        p.appendChild(createElement('strong', '', e.name));
        item.appendChild(p);
        item.appendChild(createElement('small', '', `${e.startDate} - ${e.endDate}`));
        educationDiv.appendChild(item);
    });
    cvRight.appendChild(educationDiv);
    cvRight.appendChild(createElement('hr'));

    const certificationsDiv = createElement('div', 'mb-3');
    certificationsDiv.appendChild(createElement('h5', 'border-bottom pb-1 mb-2', 'Certifications'));
    certifications.forEach(c => {
        const item = createElement('div', 'mb-2');
        const p = createElement('p', 'mb-0');
        p.appendChild(createElement('strong', '', c.name));
        item.appendChild(p);
        item.appendChild(createElement('small', '', `${c.startDate} - ${c.endDate}`));
        certificationsDiv.appendChild(item);
    });
    cvRight.appendChild(certificationsDiv);

    cvLeft.scrollIntoView({ behavior: 'smooth' });
}

function clearForm() {
    inputName.value = '';
    inputTitle.value = '';
    inputEmail.value = '';
    inputPhone.value = '';
    inputDate.value = '';
    inputLinkedin.value = '';
    textareaSummary.value = '';

    inputName.classList.remove('input-success', 'input-error');
    inputTitle.classList.remove('input-success', 'input-error');
    inputEmail.classList.remove('input-success', 'input-error');
    inputPhone.classList.remove('input-success', 'input-error');
    inputDate.classList.remove('input-success', 'input-error');
    inputLinkedin.classList.remove('input-success', 'input-error');
    textareaSummary.classList.remove('input-success', 'input-error');

    skills = [];
    software = [];
    languages = [];
    experiences = [];
    education = [];
    certifications = [];

    clearElement(skillsContainer);
    clearElement(softwareContainer);
    clearElement(languagesContainer);
    clearElement(experienceContainer);
    clearElement(educationContainer);
    clearElement(certificationsContainer);

    document.querySelectorAll('.row input[type="text"]').forEach(input => {
        if (!input.id) input.value = '';
    });
    document.querySelectorAll('.row select').forEach(select => select.value = '');
    document.querySelectorAll('.row input[type="date"]').forEach(input => input.value = '');

    inputName.focus();
}

addSkillBtn.addEventListener('click', () => addItemWithLevel('skills'));
addSoftwareBtn.addEventListener('click', () => addItemWithLevel('software'));
addLanguageBtn.addEventListener('click', () => addItemWithLevel('languages'));
addExperienceBtn.addEventListener('click', () => addItemWithDates('experience'));
addEducationBtn.addEventListener('click', () => addItemWithDates('education'));
addCertificationBtn.addEventListener('click', () => addItemWithDates('certifications'));

window.generateCV = generateCV;
window.clearForm = clearForm;

  