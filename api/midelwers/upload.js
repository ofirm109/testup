const multer =require('multer');


//בודק אם התמונה בפורמט נכון
const filterimage=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

//משנה את השם
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});

//שומר את התמונה
const upload= multer({
    //dest: 'uploads/',
    storage,
    limits:{
        fileSize: 1024*1024*2 //מקסימום 2 מגה בייט
    },
    filterimage
})

module.exports=upload;