const projects = {};
const projectPrefix = 'assets/projects';

function showMenu(){
    const menu = document.getElementById('menu');
    menu.classList.add('fixed');
    menu.classList.remove('hidden');
    
    
    const child = document.getElementById('child');
    child.classList.remove('toRight');
    child.classList.add('fromRight');
}

function hideMenu(){
    const menu = document.getElementById('menu');

    const child = document.getElementById('child');
    child.classList.remove('fromRight');
    child.classList.add('toRight');

    setTimeout(() => { 
        menu.classList.remove('fixed');
        menu.classList.add('hidden');
    }, 500); 
}

function showProject(e){
    const id = e.dataset.id;

    const hiddenProject = document.getElementById('hiddenProject');
    hiddenProject.classList.add('fixed');
    hiddenProject.classList.remove('hidden');

    const content = document.getElementById('content');
    content.innerHTML = projects[id];
}

function hideProject(){
    const hiddenProject = document.getElementById('hiddenProject');
    hiddenProject.classList.remove('fixed');
    hiddenProject.classList.add('hidden');
}

function parentHide(e){
    if(e.target.id == 'menu'){
        hideMenu();
    }

    if(e.target.id == 'hiddenProject'){
        hideProject();
    }
}

function changeImage(e){
    const images = document.querySelectorAll('.projectImage');
    const mainImage = document.getElementById('mainImage');
    mainImage.src = e.src;

    images.forEach(element => {
        element.classList.remove('border-[#A3F0F5]');
        element.classList.add('border-transparent');
    });
    e.classList.remove('border-transparent');
    e.classList.add('border-[#A3F0F5]');


}

(function (){
    const url = 'data.json';
    fetch(url).then(response => response.json()).then(data => {
        let allProject = '';     

        data.forEach(element => {
            let projectType = element.type == 'training' ? 
                `<div class="p-1 md:p-2 rounded-full text-xs md:text-xl text-white bg-orange-500 w-fit">Training Website</div>` : 
                `<div class="p-1 md:p-2 rounded-full text-xs md:text-xl text-white bg-green-500 w-fit">Client Website</div>`;

            let github = element.github == undefined ? '' : `<a href="${element.github}" target="_blank" class="bg-black p-1 text-xs rounded-full text-white my-2 inline-block md:text-lg md:p-2 hover:bg-opacity-50">github</a>`

            let web = element.web == undefined ? '' : `<a href="${element.web}" target="_blank" class="bg-cyan-500 p-1 text-xs rounded-full text-white my-2 inline-block md:text-lg md:p-2 hover:bg-opacity-50">website</a>`


            let item = `<div class="flex justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 p-2 rounded-full cursor-pointer hover:bg-gray-100 duration-300 md:size-12" onclick="hideProject(this)">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>    
                        </div>
                        <div class="mt-4" >
                            <img class="rounded-lg border" src="${projectPrefix}/${element.code}/${element.image[0]}" id='mainImage'/>
                            <div class="mt-2 flex space-x-4 overflow-scroll">`

                            element.image.forEach((image, i) => {
                                if(i == 0){
                                    item += `<img class="rounded-lg cursor-pointer size-16 border-4 border-[#A3F0F5] projectImage md:size-24" src="${projectPrefix}/${element.code}/${image}" onclick="changeImage(this)" data-id="${element.code}-${image}"/>`
                                }else{
                                    item += `<img class="rounded-lg cursor-pointer size-16 border-4 border-transparent projectImage md:size-24" src="${projectPrefix}/${element.code}/${image}" onclick="changeImage(this)" data-id="${element.code}-${image}"/>`
                                }
                            });
                        
                        item += `</div>
                        </div>
                        <div class="mt-2 md:my-6">
                            <div class="font-bold text-lg md:text-2xl">
                                ${element.name}
                            </div>
                            <div class="text-xs flex justify-between items-center md:text-xl">
                                ${element.time}
                                ${projectType}
                            </div> 
                            <div class="text-xs italic mt-4 md:text-lg">
                                Skills : ${element.techstack}
                            </div>
                            <div class="text-xs mt-2 text-justify space-y-1 md:text-lg">
                                ${element.description}
                            </div>
                            <div class="flex space-x-2">
                                ${github}
                                ${web}
                            </div>
                        </div>`;
            
            let projectList = `<div class="remove from-bot bg-white border border-gray-200 rounded-lg shadow cursor-pointer project hover:-translate-y-2 duration-300" data-id="${element.code}" onclick="showProject(this)">
                                    <div class="border-b">
                                        <img class="rounded-t-lg" src="${projectPrefix}/${element.code}/${element.image[0]}" alt="" />
                                    </div>
                                    <div class="p-4">
                                        <h5 class="font-bold text-gray-900 text-sm md:text-lg">${element.name}</h5>
                                        <p class="text-xs md:text-lg">${element.time}</p>
                                    </div>
                                </div>`;

            projects[element.code] = item;
            allProject += projectList;
        });

        projectContainer = document.getElementById('projectContainer');
        projectContainer.innerHTML = allProject;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('show');
                }
            });
        });
        
        const hiddenElements = document.querySelectorAll('.remove');
        hiddenElements.forEach(element => {
            observer.observe(element);
        });
    });
})();
