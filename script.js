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
    viewer_state = !viewer_state
}
