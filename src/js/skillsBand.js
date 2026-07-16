const skills = [
    { img: "../../public/skills/Unity.svg", name: "Unity" },
    { img: "../../public/skills/C++.svg", name: "C++" },
    { img: "../../public/skills/CSS.svg", name: "CSS" },
    { img: "../../public/skills/Figma.svg", name: "Figma" },
    { img: "../../public/skills/Git.svg", name: "Git" },
    { img: "../../public/skills/HTML.svg", name: "HTML" },
    { img: "../../public/skills/Java.svg", name: "Java" },
    { img: "../../public/skills/JavaScript.svg", name: "JavaScript" },
    { img: "../../public/skills/MySQL.svg", name: "MySQL" },
    { img: "../../public/skills/PHP.svg", name: "PHP" },
    { img: "../../public/skills/Python.svg", name: "Python" },
    { img: "../../public/skills/SDL.svg", name: "SDL" },
    { img: "../../public/skills/XML.svg", name: "XML" }
];

const velocidad = 0.45;
const margen = 200;

function crearBanda(contenedor, skillsList, direction) {
    if (!contenedor) return;

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

    skillsList.forEach((skill, i) => {
        crearBloque(skill, i * margen);
    });

    function moverBloques() {
        const anchoContenedor = contenedor.clientWidth;

        for (let i = bloques.length - 1; i >= 0; i--) {
            const bloqueObj = bloques[i];
            bloqueObj.posX += velocidad * direction;

            const fueraPorIzquierda = direction < 0 && bloqueObj.posX < -150;
            const fueraPorDerecha = direction > 0 && bloqueObj.posX > anchoContenedor + 150;

            if (fueraPorIzquierda || fueraPorDerecha) {
                bloqueObj.element.remove();
                bloques.splice(i, 1);

                const newSkill = skillsList[index % skillsList.length];
                index++;

                if (direction < 0) {
                    const maxX = Math.max(...bloques.map(b => b.posX), 0);
                    crearBloque(newSkill, maxX + margen);
                } else {
                    const minX = Math.min(...bloques.map(b => b.posX), anchoContenedor);
                    crearBloque(newSkill, minX - margen);
                }
            } else {
                bloqueObj.element.style.left = bloqueObj.posX + 'px';
            }
        }
        requestAnimationFrame(moverBloques);
    }

    moverBloques();
}

const contenedorPrincipal = document.querySelector('.skills__container');
const contenedorReverso = document.querySelector('.skills__container--reverse');

const skillsReverso = [...skills].reverse();

crearBanda(contenedorPrincipal, skills, -1);
crearBanda(contenedorReverso, skillsReverso, 1);