export const simulationVerificationCode = () => {
    let code = ''
    for(let i = 0; i< 6; i++){
        code = code.concat(generateCode())
    }
    return code
}

const generateCode = () => {
    return parseInt(Math.random() * 10)
}
