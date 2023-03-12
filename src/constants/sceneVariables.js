export default new class {
    sceneVariables = [
        {
            id: 0,
            name: 'home',
            x: -340,
            y: -340,
            movement: 48,
            scale: 1.5,
            imageSource: '/assets/img/scene1.jpg',
            musicSource: '/assets/mp3/home.mp3',
            musicVolume: 0.05,
            night: false,
            facing: 1,
            npcs: [],
        },
        {
            id: 1,
            name: 'Cloverleaf Town',
            x: -402,
            y: -692,
            movement: 16,
            scale: 4.2,
            imageSource: '/assets/img/town5night.jpg',
            musicSource: '/assets/mp3/hospital.mp3',
            musicVolume: 0.2,
            night: true,
            facing: 0,
            npcs: [],
        },
        {
            id: 2,
            name: 'Cloverleaf Town house 1',
            x: -494,
            y: -570,
            movement: 32,
            scale: 1.5,
            imageSource: '/assets/img/house2night.jpg',
            musicSource: '/assets/mp3/hospital.mp3',
            musicVolume: 0.2,
            night: true,
            facing: 0,
            npcs: [
                {
                    id: 0,
                    name: 'Raton',
                    sprites: ['/assets/img/spriteman1night.png', '/assets/img/spriteman2night.png', '/assets/img/spriteman3night.png', '/assets/img/spriteman4night.png'],
                    path: [{direction: 0, x: 0, y: 0}, {direction: 1, x: 0, y: 0}],
                    x: -478,
                    y: -450,
                    size: 60,
                    direction: 0,
                    interactions: [0, 1],
                    pathIndex: 0,
                }
            ]
        },
        {
            id: 3,
            name: 'Forest 1',
            x: -483,
            y: -292,
            movement: 16,
            scale: 4,
            imageSource: '/assets/img/forest1.jpg',
            musicSource: '/assets/mp3/forest1.mp3',
            musicVolume: 0,
            night: false,
            facing: 1,
            npcs: [
                {
                    id: 0,
                    name: 'Raton',
                    sprites: ['/assets/img/spriteman1.png', '/assets/img/spriteman2.png', '/assets/img/spriteman3.png', '/assets/img/spriteman4.png'],
                    path: [{direction: 0, x: 0, y: 0}, {direction: 1, x: 0, y: 0}, {direction: 2, x: 0, y: 0}, {direction: 3, x: 0, y: 0}],
                    x: -237,
                    y: -228,
                    size: 30,
                    direction: 0,
                    interactions: [0, 1],
                    pathIndex: 0,
                }
            ]
        }
    ]
}