


const seedDb= async  () =>{
    
    try{
        // const seedCategory  = await require('./categories')();
        const seedDeal = await require('./deals')();

    }
    catch(e){
         console.log(e)
    }
    


}




module.exports = seedDb;