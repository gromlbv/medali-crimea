'use strict';

const main = async () => {
    let map_response = await fetch('/details/map.json')
    const map = await map_response.json()

    "background-image: url('');"
    const viewer = document.querySelector('div.viewer')

    Array('front', 'back').forEach(side => {
        Array('inner', 'outer').forEach(part => {
            viewer.querySelector(`div.${side} div.${part}`).style.backgroundImage = `url('${Object.values(map[side][part])[0]}')`
        })
    });

    let inner = Object.values(map['front']['inner'])
    let outer = Object.values(map['front']['outer'])

    const list_outer_obj = document.querySelector("div.front div.outer div.list")
    const list_inner_obj = document.querySelector("div.front div.inner div.list")
    
    inner.forEach(e => list_inner_obj.innerHTML += `<img src="${e}">`);
    outer.forEach(e => list_outer_obj.innerHTML += `<img src="${e}">`);
}
// map - обьект вида
// {
//     "back": {
//         "inner": {файл: путь},
//         "outer": {файл: путь}
//     },
//     "front": {
//         "inner": {файл: путь},
//         "outer": {файл: путь}
//     },
//     "full": {файл: путь}
// }
// содержит пути до картинок для медалек

main()

const viewer = document.querySelector('div.viewer')
const params = document.querySelector('div.params')
let viewer_state = false

const flip = async () => {
    if (!viewer_state) {
        viewer.classList.add('flip')
    }
    else {
        viewer.classList.remove('flip')
    }
    params.querySelector('div.front').classList.toggle("hidde")
    params.querySelector('div.back').classList.toggle("hidde")
    viewer_state = !viewer_state;
}

const list = document.querySelectorAll("div.part div.list");

list.forEach(e => {
    let offset = 0;
    let last_x = 0;
    let in_scroll = false;
    let direction, target, delta, step, page;
    let width = document.querySelector("div.medal").offsetWidth + 10
    let max_offset;

    e.addEventListener("touchstart", ev => {
        last_x = ev.touches[0].clientX;
        in_scroll = true;
    })
    e.addEventListener("touchmove", ev => {
        offset += last_x - ev.touches[0].clientX;
        max_offset = e.scrollWidth - e.clientWidth - width

        if (offset < 0) offset = 0
        if (offset > max_offset) offset = max_offset
        
        page = Math.round(offset/width)
        page = offset%width < width*0.5 ? page + 1 : page
        // document.querySelector("body > div > div.viewer-wrapper > div > div.back > div.outer").src = e.childNodes[page-1].src

        last_x = ev.touches[0].clientX;

        if (offset <= max_offset) e.scrollTo(offset, 0)
    })
    e.addEventListener("touchend", ev => {
        in_scroll = false
        
        let smooth_scroll = (a) => {
            if (in_scroll) return
            
            target = Math.abs(offset%width);
            direction = -1;

            if (target > width*0.4){
                direction = 1;
                target = width - target;
            }
            
            step = target / 5;
            if (target < 0.3){
                
                e.scrollTo(offset+(target*direction), 0)
                return
            }
            offset = offset + (step*direction);
            e.scrollTo(offset, 0)
            window.requestAnimationFrame(smooth_scroll)
        }
        window.requestAnimationFrame(smooth_scroll)
    })
})