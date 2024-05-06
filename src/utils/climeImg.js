

function climeImg(clime){
    let changeImg 
    if (clime < 10) {
        changeImg = 1
    } else if (clime < 20) {
        changeImg = 2
    } else {
        changeImg = 3
    }

    
    return changeImg
}

export default climeImg