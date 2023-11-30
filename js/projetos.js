var res = window.location.href.split("html");

if (res[1] === undefined) {
  window.location.href = "../404.html";
} else {
  fetch("../db.json")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      switch (res[1]) {
        case "?li":
          addProjetos(jsondata.li, "li");
          break;
        case "?dani":
          addProjetos(jsondata.dani, "dani");
          break;
        case "?fe":
          addProjetos(jsondata.fe, "fe");
          break;
        case "?lu":
          addProjetos(jsondata.lu, "lu");
          break;
        case "":
          addProjetosRandom(jsondata);
          break;
        default:
          window.location.href = "../404.html";
          break;
      }
    });
}

function addProjetosRandom(data) {
  let projetosExibidos = [];
  let objExibido = {};

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const objProjetos = data[key].projetos;
      projetosExibidos.push(objProjetos[Math.floor(Math.random() * objProjetos.length)]);
    }
  }

  objExibido.projetos = projetosExibidos;

  for (let i = 0; i < objExibido.projetos.length; i++) {
    addProjeto(objExibido.projetos[i]);
  }
}

function getProjetoRandom(projetos) {
    const projetoRandom = projetos[Math.floor(Math.random() * projetos.length)];
    return projetoRandom;
  }

function addProjetos(data, pessoa) {
  document.querySelector("#secao_header-projetos").classList.add("hidden");

  let titulo = document.querySelector("#titulo_projetos");
  titulo.innerHTML = `projetos de ${pessoa}`;

  for (let i = 0; i < data.projetos.length; i++) {
    addProjeto(data.projetos[i]);
  }

  //   let eleBreadcrumb = document.querySelector("#breadcrumb-page");
  //   eleBreadcrumb.innerHTML = data.breadcrumb;
  //   eleBreadcrumb.setAttribute("href", window.location.href);

  //   let eleH2 = document.createElement("h2");
  //   eleH2.innerHTML = data.title_page;

  //   let eleParagrafoDescricao = document.createElement("p");
  //   eleParagrafoDescricao.innerHTML = data.description_page;

  //   let parentDiv = document.querySelector(".header_projetos");
  //   parentDiv.append(eleH2);
  //   parentDiv.append(eleParagrafoDescricao);
}

function addProjeto(projeto) {
  let ulProjetos = document.querySelector('#lista_box-projetos');

  let liElement = document.createElement('li');
  liElement.classList.add('py-10', 'px-5', 'my-10', 'relative');

  let iconElement = document.createElement('img');
  iconElement.classList.add('absolute', '-right-5', 'top-0', 'lg:top-2');
  iconElement.src = `${projeto.icon}`;
  iconElement.width = '80';

  let divContainerInfosImg = document.createElement('div');
  divContainerInfosImg.classList.add('w-full', 'grid', 'grid-cols-1', 'items-center', 'gap-x-8', 'gap-y-16', 'lg:grid-cols-2');

  let divInfos = document.createElement('div');
  divInfos.classList.add('self-start');

  let titleProjeto = document.createElement('h3');
  titleProjeto.classList.add('font-heading', 'font-medium', 'text-gray-900');
  titleProjeto.innerHTML = projeto.title;

  let descProjeto = document.createElement('p');
  descProjeto.classList.add('mt-4', 'text-gray-500');
  descProjeto.innerHTML = projeto.description;

  let detalhesProjeto = document.createElement('dl');
  detalhesProjeto.classList.add('mt-16', 'grid','grid-cols-1', 'gap-x-6', 'gap-y-10', 'sm:grid-cols-2', 'sm:gap-y-16', 'lg:gap-x-8')

  for (let i = 0; i < projeto.specs.length; i++) {
    const detalhe = projeto.specs[i];
    let detalheProjeto = document.createElement('div');
    detalheProjeto.classList.add('border-t', 'border-gray-200', 'pt-4');

    let detalheTitulo = document.createElement('dt');
    detalheTitulo.classList.add('font-heading', 'font-medium', 'text-gray-900');
    detalheTitulo.innerHTML = detalhe.title;

    let detalheDesc = document.createElement('dd');
    detalheDesc.classList.add('mt-2', 'text-sm', 'text-gray-500');
    detalheDesc.innerHTML = detalhe.description;
    
    detalheProjeto.append(detalheTitulo);
    detalheProjeto.append(detalheDesc);

    detalhesProjeto.append(detalheProjeto);
  }

  if (projeto.link) {
    let linkDetalhes = document.createElement('a');
    linkDetalhes.classList.add('rounded-md', 'bg-indigo-600', 'px-3.5', 'py-2.5', 'text-sm', 'font-semibold', 'text-white', 'hover:bg-indigo-500', 'focus-visible:outline', 'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-indigo-600', 'text-center');
    linkDetalhes.href = projeto.link;
    linkDetalhes.innerHTML = 'ver mais detalhes';

    detalhesProjeto.append(linkDetalhes);
  }

  let imagensProjeto = document.createElement('div');
  imagensProjeto.classList.add('sm:grid', 'grid-cols-2', 'grid-rows-2', 'gap-6', 'lg:gap-8', 'self-start', 'hidden');

  for (let i = 0; i < projeto.imgs.length; i++) {
    const img = projeto.imgs[i];

    let imgProjeto = document.createElement('img');
    imgProjeto.src = `${img}`;
    
    imagensProjeto.append(imgProjeto);
  }

  divInfos.append(titleProjeto);
  divInfos.append(descProjeto);
  divInfos.append(detalhesProjeto);
  divContainerInfosImg.append(divInfos);
  divContainerInfosImg.append(imagensProjeto);
  liElement.append(iconElement);
  liElement.append(divContainerInfosImg);
  ulProjetos.append(liElement);
}