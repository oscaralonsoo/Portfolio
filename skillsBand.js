const contenedor = document.querySelector('.skills__container');
const skills = [
    { img: "public/skills/Unity.svg", name: "Unity" },
    { img: "public/skills/C++.svg", name: "C++" },
    { img: "public/skills/CSS.svg", name: "CSS" },
    { img: "public/skills/Figma.svg", name: "Figma" },
    { img: "public/skills/Git.svg", name: "Git" },
    { img: "public/skills/HTML.svg", name: "HTML" },
    { img: "public/skills/Java.svg", name: "Java" },
    { img: "public/skills/JavaScript.svg", name: "JavaScript" },
    { img: "public/skills/MySQL.svg", name: "MySQL" },
    { img: "public/skills/PHP.svg", name: "PHP" },
    { img: "public/skills/Python.svg", name: "Python" },
    { img: "public/skills/SDL.svg", name: "SDL" },
    { img: "public/skills/XML.svg", name: "XML" }
];

const velocidad = 0.4;
const margen = 200;
const bloques = [];
let index = 0;

function crearBloque(skill, posX) {
    const bloque = document.createElement('div');
    bloque.classList.add('skills__item');
    bloque.innerHTML = `<img src="${skill.img}" alt="${skill.name}"><h4 class="skills__item-title">${skill.name}</h4>`;
    bloque.style.left = `${posX}px`;
    contenedor.appendChild(bloque);
    bloques.push({ element: bloque, posX });
}

skills.forEach((skill, i) => {
    crearBloque(skill, i * margen);
});

function moverBloques() {
    for (let i = bloques.length - 1; i >= 0; i--) {
        const bloqueObj = bloques[i];
        bloqueObj.posX -= velocidad;
        
        if (bloqueObj.posX < -150) {
            bloqueObj.element.remove(); // Elimina el elemento cuando sale de la vista
            bloques.splice(i, 1);
            // Crea un nuevo bloque al final de la fila en el orden original
            let maxX = Math.max(...bloques.map(b => b.posX), 0);
            let newSkill = skills[index % skills.length];
            index++;
            crearBloque(newSkill, maxX + margen);
        } else {
            bloqueObj.element.style.left = bloqueObj.posX + 'px';
        }
    }
    requestAnimationFrame(moverBloques);
}

moverBloques();
