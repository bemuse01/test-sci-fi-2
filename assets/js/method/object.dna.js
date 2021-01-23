METHOD.object.dna = {
    createOpacityArray(param){
        const opacity = {
            bone: [],
            nucleic: []
        }
        for(let i = 0; i < param.count; i++) opacity.bone[i] = 0
        for(let i = 0; i < param.count / param.div; i++) for(let j = 0; j < param.point; j++){
            const index = j + i * param.point
            opacity.nucleic[index] = 0
        }
        return {bone: new Float32Array(opacity.bone), nucleic: new Float32Array(opacity.nucleic)}
    },
    createDnaBone(param, direction, attr){
        const position = [], size = []
        let tb = 1, dir = 1, degree = 0

        switch(direction){
            case 'bottom-normal':
                tb = 1
                dir = 1
                break
            case 'bottom-reverse':
                tb = 1
                dir = -1
                degree = 180
                break
            case 'top-normal':
                tb = -1
                dir = 1
                break
            case 'top-reverse':
                tb = -1
                dir = -1
                degree = 180
                break
        }

        for(let i = 0; i < param.count; i++){
            const rand = {
                x: Math.random() * param.rand.bone - param.rand.bone / 2,
                y: Math.random() * param.rand.bone - param.rand.bone / 2,
                z: Math.random() * param.rand.bone - param.rand.bone / 2,
            }
            const x = Math.cos(i * tb * param.deg * radian) * param.dist * dir + rand.x
            const y = Math.sin((i * tb * param.deg + (degree * tb)) * radian) * param.dist + rand.y
            const z = i * param.gap * tb + rand.z
            position[i * 3] = x
            position[i * 3 + 1] = y
            position[i * 3 + 2] = z
            size[i] = param.size
            // opacity[i] = 0
            // geometry.vertices.push(new THREE.Vector3(x, y, z))
        }

        attr.position = new Float32Array(position)
        attr.size = new Float32Array(size)
    },
    createDnaNucleic(param, direction, attr){
        const position = [], size = []
        let tb = 1, idx = 0
        
        if(direction === 'top') {
            tb = -1
            idx = 1
        }

        for(let i = idx; i < param.count / param.div; i++){
            const deg = (i * param.div) * tb * param.deg

            const boneX = {
                norm: Math.cos(deg * radian) * param.dist,
                rev: Math.cos(deg * radian) * param.dist * -1
            }
            const boneY = {
                norm: Math.sin(deg * radian) * param.dist,
                rev: Math.sin((deg + (180 * tb)) * radian) * param.dist
            }
            const boneZ = (i * param.div) * param.gap * tb
            
            const m = (boneY.rev - boneY.norm) / (boneX.rev - boneX.norm)
            const xgap = Math.abs(boneX.rev - boneX.norm)

            for(let j = 0; j < param.point; j++){
                const rand = {
                    x: Math.random() * param.rand.nucleic - param.rand.nucleic / 2,
                    y: Math.random() * param.rand.nucleic - param.rand.nucleic / 2,
                    z: Math.random() * param.rand.nucleic - param.rand.nucleic / 2
                }
                const pos = (xgap / param.point) * j - (xgap / 2)
                const x = pos + rand.x
                const y = m * pos + rand.y
                const z = boneZ + rand.z
                const index = j + (i - idx) * param.point
                position[index * 3] = x
                position[index * 3 + 1] = y
                position[index * 3 + 2] = z
                size[index] = param.size
                // geometry.vertices.push(new THREE.Vector3(x, y, z))
            }
            attr.position = new Float32Array(position)
            attr.size = new Float32Array(size)
        }
    }
}