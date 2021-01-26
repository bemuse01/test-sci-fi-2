TIME.dna = {
    object: {
        start: {
            bone: 500,
            nucleic: 500,
            particle: 500
        },
        transition: {
            body: 100,
            particle: {
                point: 300,
                line: 600
            }
        },
        duration: {
            bone: 1200,
            nucleic: 1200
        },
        delay: 10,
        easing: {
            bone: [0.250, 0.250, 0.750, 0.750],
            nucleic: [0.250, 0.250, 0.750, 0.750]
        }
    },
    element: {
        // openLine: {
        //     start: 500,
        //     transition: {
        //         pos: 1200,
        //         scale: 400
        //     },
        //     easing: {
        //         pos: TWEEN.Easing.Cubic.Out,
        //         scale: TWEEN.Easing.Circular.Out
        //     }
        // },
        // matched: {
        //     timeout: 1200,
        //     start: {
        //         show: 1000,
        //         hide: 300
        //     },
        //     transition: {
        //         show: 200,
        //         hide: 200 
        //     },
        //     easing: {
        //         show: TWEEN.Easing.Cubic.InOut,
        //         hide: TWEEN.Easing.Cubic.InOut
        //     }
        // }
    }
}