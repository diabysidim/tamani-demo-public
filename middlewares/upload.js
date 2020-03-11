
const multer = require('multer');

const storage = multer.diskStorage({
	destination : (req, file, cb)=>{
		cb(null, './image/' )
	}, 

	filename : (req, file, cb)=>{

		cb(null,file.originalname);
	}

})

const fileFilter = (req, file, cb) =>{


		if(file.mimetype==='image/jpeg' || file.mimetype ==='image/png'){

			cb(null, true)
		}
		else{
	
			cb(null, true)
			throw new Error("wrong file type")
			}
	
}

module.exports	= multer({storage: storage, 
						limits: { 
							fileSize: 1024 * 1024 * 5 },
						fileFilter: fileFilter});