export default new class {
    cutscenes = [
        {
            id: 0,
            name: 'home',
            backgroundMusic: '',
            volume: 1,
            cuts: [
                {
                    imageSource: '',
                    audioSource: '',
                    volume: 0,
                    x: -340,
                    y: -340,
                    scale: 1,
                    messages: [
                        {time: 2000, message: ''}, {time: 2000, message: 'It was during this time of the year...'}, {time: 5000, message: ''}, {time: 2000, message: 'Mr. Volcor would be presenting his yearly discoveries to the world...'}, {time: 7000, message: ''}, {time: 2000, message: 'And you were about to try and find him in Cloverleaf Town...'}, {time: 7000, message: ''}, {time: 2000, message: 'But just before you went outside...'}, {time: 7000, message: ''}
                    ],
                },
                {
                    imageSource: '/assets/img/cutscene1.gif',
                    audioSource: '/assets/mp3/cutscene1.mp3',
                    x: -240,
                    y: -280,
                    scale: 3,
                    messages: [{time: 2000, message: ''}, {time: 5000, message: 'Rain had started pouring down from the skies...'}, {time: 7000, message: ''}, {time: 2000, message: 'While looking out of the window, you saw a person walking through the rain...'}, {time: 7000, message: ''}, {time: 2000, message: 'The stranger turned his head towards you...'}, {time: 7000, message: ''}],
                },
                {
                    imageSource: '',
                    audioSource: '',
                    x: -340,
                    y: -340,
                    messages: [{time: 2000, message: 'Until a dark shadow covered him...'}, {time: 7000, message: ''}, {time: 2000, message: 'The man looked up into the sky...'}, {time: 7000, message: ''}, {time: 2000, message: '...'}, {time: 500, message: ''},  {time: 750, message: 'GET OUT OF HERE!!', sound: true}, {time: 1500, message: ''}],
                },
                {
                    imageSource: '',
                    audioSource: '/assets/mp3/thunder.mp3',
                    x: -340,
                    y: -340,
                    messages: [{time: 2000, message: ''}, {time: 7500, message: ''}],
                },
            ],
            nextScene: 1,

        }
    ]
}